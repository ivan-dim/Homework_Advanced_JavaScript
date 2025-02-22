async function getData() {
  try {
    let response = await fetch(
      "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json"
    ); //we use await because we want the rest of the code to wait for the fetch to end
    let students = await response.json();
    let fullNames = await getStudentFullName(students);
    //TODO: get documents & sort them
    let docResponse = await fetch(
      "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/documents.json"
    );
    let documents = await docResponse.json();
    let sortedDocuments = await getSortedDocuments(documents);
  } catch {
    console.log("An error occured");
  }
}
function sayHello() {
  console.log("The call is finished");
}

function getStudentFullName(students) {
  return new Promise(function (resolve, reject) {
    if (!students || students.length == 0) {
      //validation, the negative scenario
      reject("No students!"); //we reject it, we do not have students whose names we can map
      return;
    }
    setTimeout(() => {
      resolve(students.map((s) => `${s.firstName} ${s.lastName}`));
    }, 5000);
  });
}

function getSortedDocuments(sortedDocs) {
    return new Promise(function (resolve, reject) {
      if (!sortedDocs || sortedDocs.length == 0) {
        reject("No documents");
        return;
      }
      setTimeout(() => {
        resolve(
          sortedDocs.sort(function (d1, d2) {
            return d1.size - d2.size;
          })
        );
      }, 5000);
    });
  }
getData();
sayHello();
