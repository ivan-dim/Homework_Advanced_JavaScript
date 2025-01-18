let reminders = [];

function addReminder() {
  let title = document.getElementById("title").value;
  let priority = document.getElementById("priority").value;
  let color = document.getElementById("color").value;
  let description = document.getElementById("description").value;

  let reminder = {
    title,
    priority,
    color,
    description,
  };

  reminders.push(reminder);
  clearForm();
}

function showReminders() {
  let tableBody = document.getElementById("reminderTableBody");
  tableBody.innerHTML = "";

  reminders.forEach((reminder) => {
    let row = tableBody.insertRow();
    row.style.backgroundColor = reminder.color;

    let titleCell = row.insertCell(0);
    titleCell.textContent = reminder.title;

    let priorityCell = row.insertCell(1);
    priorityCell.textContent = reminder.priority;

    let descriptionCell = row.insertCell(2);
    descriptionCell.textContent = reminder.description;
  });
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("priority").value = "low";
  document.getElementById("color").value = "#ffffff";
  document.getElementById("description").value = "";
}
