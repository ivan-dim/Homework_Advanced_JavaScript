class Person {
  constructor(firstName, lastName, age, address) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      this.address = address;
      this.fullName = function() {
          console.log(`${this.firstName} ${this.lastName}`);
      };
  }
}

class Student extends Person {
  constructor(firstName, lastName, age, address, subjects, academy) {
      super(firstName, lastName, age, address);
      this.subjects = subjects;
      this.academy = academy;
  }

  static studiesSubject(student, subject) {
    for (let subs of student.subjects) {
        if (subs == subject) {
            return true;
        }
    }
    return false;
}
}

let student1 = new Student("Bob","Bobsky",25,"adresa123", ["Music","Math",],"AcademyX");
let student2 = new Student("Stefan","Stefanovski",23,"adresa321",["Physics","Chemistry"],"AcademyY");


student1.fullName();
student2.fullName();

console.log("=-=-=-=-=-=-=-=-=-=-=--=");


console.log(Student.studiesSubject(student1, "Math")); 
console.log(Student.studiesSubject(student2, "Music"));
