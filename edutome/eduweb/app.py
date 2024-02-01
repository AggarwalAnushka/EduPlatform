from flask import Flask, render_template, request, redirect, session, url_for
import pyrebase
import firebase_admin
from firebase_admin import credentials, firestore

# app = Flask(__name__, static_folder='static', template_folder='templates')
app = Flask(__name__, static_url_path='/static')
app.static_folder='eduweb/static'

config={
    "apiKey": "AIzaSyDXpANyvXTwiWykjOn-p8cYTQPCbYRmqQE",
    "authDomain": "eduplatform-66083.firebaseapp.com",
    "projectId": "eduplatform-66083",
    "storageBucket": "eduplatform-66083.appspot.com",
    "messagingSenderId": "228720842596",
    "appId": "1:228720842596:web:ac1177a92dea687b990c71",
    "measurementId": "G-TDSQ0MXBCS",
    "databaseURL":""
}

firebase= pyrebase.initialize_app(config)
firebase_db = firebase.database()
auth=firebase.auth()

cred = credentials.Certificate(r"C:\college\Projects\BitnBuild\serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db=firestore.client()

app.secret_key = 'your_secret_key'  # Replace with a secure secret key

# users = {
#     'john_doe': {'fullname': 'John Doe', 'password': 'hashed_password'},
#     'jane_smith': {'fullname': 'Jane Smith', 'password': 'hashed_password'}
# }

@app.route('/')
def landing():
    return render_template('landing.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    # if('user' in session):
    #     return redirect(url_for('dashboard'))
    if request.method == 'POST':
        # username = request.form['username']
        # password = request.form['password']

        # if username in users and password == users[username]['password']:
        #     session['username'] = username
        #     return redirect(url_for('dashboard'))
        email=request.form.get('email')
        password= request.form.get('password')

        try:
            user = auth.sign_in_with_email_and_password(email, password)
            session['user'] = email
            return redirect(url_for('dashboard'))
        except Exception as e:
            error_message = str(e)
            return error_message

    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        fullname= request.form.get('fullname')
        college= request.form.get('college')
        semester= request.form.get('semester')


        try:
            # creating user in firebase
            user = auth.create_user_with_email_and_password(email, password)
            
            # Store additional information in Firestore
            user_data={
                'fullname': fullname,
                'college': college,
                'semester': semester
            }

            user_ref = db.collection('users').document(email)
            user_ref.set(user_data,merge=True)

            session['user'] = user
            return redirect(url_for('login'))
        except Exception as e:
            error_message = str(e)
            return error_message
        

    return render_template('signup.html')

@app.route('/dashboard')
def dashboard():

    if ("user" in session):
        user_email = session['user']
        # print("email ",user_email)
        user_info=get_user_info(user_email)
        return render_template('dashboard.html', user_info=user_info, user_email=user_email)


    return redirect(url_for('login'))

def get_user_info(user_email):
    try:
       user_ref= db.collection('users').document(user_email)
       user_data = user_ref.get().to_dict()
    #    print("userData: ", str(user_data))

       if user_data:
           return user_data
       else:
           return None
    
    except Exception as e:
        print(f"Error getting user info: {str(e)}")
        
        return None
    

@app.route('/mentor/<mentor_id>') #for now mentor_id i user_email
def mentor_dashboard(mentor_id):
    # Retrieve mentor details and classes from Firestore
    mentor_ref = db.collection('users').document(mentor_id)
    mentor_data = mentor_ref.get().to_dict()

    if mentor_data:
        classes_ref = mentor_ref.collection('classes')
        classes = classes_ref.stream()
        return render_template('mentor_dashboard.html', mentor=mentor_data, classes=classes)
    else:
        return "Mentor not found", 404

@app.route('/add_class', methods=['POST'])
def add_class():
    if "user" in session:
        # check for error in session[user]
        mentor_id = session['user']
        topic = request.form.get('topic')
        date = request.form.get('date')
        time_slot = request.form.get('time_slot')
        semester = request.form.get('semester')
        rating = float(request.form.get('rating'))
        duration = request.form.get('duration')
        joining_link = request.form.get('joining_link')

        mentor_info=get_user_info(mentor_id)
        mentor_name=mentor_info['fullname']
        mentor_sem= mentor_info['semester']

        # Add class to Firestore
        classes_ref = db.collection('users').document(mentor_id).collection('classes')
        new_class_ref = classes_ref.add({
            'mentor_name': mentor_name,
            'mentor_sem': mentor_sem,
            'topic': topic,
            'date': date,
            'time_slot': time_slot,
            'semester': semester,
            'rating': rating,
            'duration': duration,
            'joining_link': joining_link
        })

        return redirect(url_for('mentor_dashboard', mentor_id=mentor_id))
    else:
        return redirect(url_for('login'))
    
@app.route('/mentee_dashboard')
def mentee_dashboard():
    if "user" in session:
        user_email = session['user']
        # Fetch all classes from Firestore
        all_classes = get_all_classes()
        return render_template('mentee_dashboard.html', user_email=user_email, all_classes=all_classes)
    return redirect(url_for('login'))

def get_all_classes():
    try:
        # Query all classes from the 'classes' subcollection in Firestore
        classes_ref = db.collection_group('classes')
        all_classes = [cls.to_dict() for cls in classes_ref.stream()]
        return all_classes
    except Exception as e:
        print(f"Error getting all classes: {str(e)}")
        return []


@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('landing'))

if __name__ == '__main__':
    app.run(debug=True)