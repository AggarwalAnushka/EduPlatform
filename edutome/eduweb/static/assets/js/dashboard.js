document.addEventListener("DOMContentLoaded", (ev) => {
  // Your existing code...

  // Function to add a new row to the table
  const addRowToTable = (classData) => {
    const tableBody = document.querySelector("#recent-orders--table tbody");

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${classData.topic}</td>
      <td>${classData.date}</td>
      <td>${classData.time_slot}</td>
      <td>${classData.semester}</td>
      <td>${classData.rating}</td>
      <td>${classData.duration}</td>
      <td>
        <a href="#">Update</a>
      </td>
    `;

    tableBody.appendChild(newRow);
  };

  // Example: Assuming a button triggers the addition of a new class
  const addButton = document.getElementById("add-class-button");

  addButton.addEventListener("click", () => {
    // Replace the following data with actual form data or retrieve it using AJAX
    const newClassData = {
      topic: "New Topic",
      date: "New Date",
      time_slot: "New Time Slot",
      semester: "New Semester",
      rating: "New Rating",
      duration: "New Duration",
    };

    // Add the new row to the table
    addRowToTable(newClassData);
  });
});





// Executes when document is loaded
// document.addEventListener("DOMContentLoaded", (ev) => {
//   // Fetch Mentor Dashboard Data


//   fetch('/mentor/' + mentor_id)  // Assuming mentor_id is defined somewhere in your template
//     .then(response => response.json())
//     .then(data => {
//       // Recent Orders Data
//       document.getElementById("recent-orders--table").appendChild(buildTableBody(data.classes));

//       // Updates Data
//       document
//         .getElementsByClassName("recent-updates")
//         .item(0)
//         .appendChild(buildUpdatesList(data.updates));

//       // Sales Analytics
//       const salesAnalytics = document.getElementById("analytics");
//       buildSalesAnalytics(salesAnalytics, data.salesAnalytics);
//     })
//     .catch(error => console.error('Error fetching mentor dashboard data:', error));
// });

// // Document Builder
// const buildTableBody = (classes) => {
//   const tbody = document.createElement("tbody");

//   let bodyContent = "";
//   for (const mentorClass of classes) {
//     bodyContent += `
//       <tr>
//         <td>${mentorClass.topic}</td>
//         <td>${mentorClass.date}</td>
//         <td>${mentorClass.time_slot}</td>
//         <td>${mentorClass.semester}</td>
//         <td class="primary">${mentorClass.rating}</td>
//         <td>${mentorClass.duration}</td>
//         <td><a href="${mentorClass.joining_link}" target="_blank">Join</a></td>
//       </tr>
//     `;
//   }

//   tbody.innerHTML = bodyContent;

//   return tbody;
// };

// const buildUpdatesList = (updates) => {
//   const ul = document.createElement("ul");

//   let updatesContent = "";
//   for (const update of updates) {
//     updatesContent += `<li>${update}</li>`;
//   }

//   ul.innerHTML = updatesContent;

//   return ul;
// };

//////////////////////////////////////////////////////////////////


// // Executes when document is loaded
// document.addEventListener("DOMContentLoaded", (ev) => {
//   // Recent Orders Data
//   document.getElementById("recent-orders--table").appendChild(buildTableBody());

//   // Updates Data
//   document
//     .getElementsByClassName("recent-updates")
//     .item(0)
//     .appendChild(buildUpdatesList());

//   // Sales Analytics
//   const salesAnalytics = document.getElementById("analytics");
//   buildSalesAnalytics(salesAnalytics);
// });

// // Document Builder
// const buildTableBody = () => {
//   const recentOrderData = RECENT_ORDER_DATA;

//   const tbody = document.createElement("tbody");

//   let bodyContent = "";
//   for (const row of recentOrderData) {
//     bodyContent += `
//       <tr>
//         <td>${row.productName}</td>
//         <td>${row.productNumber}</td>
//         <td>${row.payment}</td>
//         <td class="${row.statusColor}">${row.status}</td>
//         <td class="primary">Details</td>
//       </tr>
//     `;
//   }

//   tbody.innerHTML = bodyContent;

//   return tbody;
// };

// const buildUpdatesList = () => {
//   const updateData = UPDATE_DATA;

//   const div = document.createElement("div");
//   div.classList.add("updates");

//   let updateContent = "";
//   for (const update of updateData) {
//     updateContent += `
//       <div class="update">
//         <div class="profile-photo">
//           <img src="${update.imgSrc}" />
//         </div>
//         <div class="message">
//           <p><b>${update.profileName}</b> ${update.message}</p>
//           <small class="text-muted">${update.updatedTime}</small>
//         </div>
//       </div>
//     `;
//   }

//   div.innerHTML = updateContent;

//   return div;
// };

const buildSalesAnalytics = (element) => {
  const salesAnalyticsData = SALES_ANALYTICS_DATA;

  for (const analytic of salesAnalyticsData) {
    const item = document.createElement("div");
    item.classList.add("item");
    item.classList.add(analytic.itemClass);

    const itemHtml = `
      <div class="icon">
        <span class="material-icons-sharp"> ${analytic.icon} </span>
      </div>
      <div class="right">
        <div class="info">
          <h3>${analytic.title}</h3>
          <small class="text-muted"> Last 24 Hours </small>
        </div>
        <h5 class="${analytic.colorClass}">${analytic.percentage}%</h5>
        <h3>${analytic.sales}</h3>
      </div>
    `;

    item.innerHTML = itemHtml;

    element.appendChild(item);
  }
};

// Document operation functions
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

// Show Sidebar
menuBtn.addEventListener("click", () => {
  sideMenu.style.display = "block";
});

// Hide Sidebar
closeBtn.addEventListener("click", () => {
  sideMenu.style.display = "none";
});

// Change Theme
themeToggler.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme-variables");

  themeToggler.querySelector("span:nth-child(1)").classList.toggle("active");
  themeToggler.querySelector("span:nth-child(2)").classList.toggle("active");
});
