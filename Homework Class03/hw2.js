document.getElementById("fetchUserButton").addEventListener("click", fetchUserData);

function fetchUserData() {
  fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      let tbody = document.getElementById("userData");
      tbody.innerHTML = `
        <tr><td>ID</td><td>${data.id}</td></tr>
        <tr><td>Name</td><td>${data.name}</td></tr>
        <tr><td>Username</td><td>${data.username}</td></tr>
        <tr><td>Email</td><td>${data.email}</td></tr>
        <tr><td>Phone</td><td>${data.phone}</td></tr>
        <tr><td>Website</td><td>${data.website}</td></tr>
        <tr><td>Address</td><td>${data.address.street}, ${data.address.suite}, ${data.address.city}, ${data.address.zipcode}</td></tr>
        <tr><td>Company</td><td>${data.company.name} - ${data.company.catchPhrase}, ${data.company.bs}</td></tr>
      `;

      document.getElementById("userTable").style.display = "table";
    })
    .catch(function (error) {
      console.log(error);
    });
}