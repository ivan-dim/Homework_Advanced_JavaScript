function Person(id, firstName, lastName, age) {
  this.id = id;
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.getFullName = function () {
    return `${this.firstName} ${this.lastName}`;
  };
}

function Animal(name, age) {
  this.name = name;
  this.age = age;
  this.eat = function () {
    console.log(`${this.name} is eating`);
  };
  this.sleep = function () {
    console.log(`${this.name} is sleeping`);
  };
}

function Cat(name, age, color, ownerId) {
  Animal.call(this, name, age);
  this.color = color;
  this.ownerId = ownerId;
  this.meow = function () {
    console.log(`The cat ${this.name} says meow`);
  };
}

Cat.prototype = Object.create(Animal.prototype);
PersianCat.prototype = Object.create(Cat.prototype);
RagdollCat.prototype = Object.create(Cat.prototype);

function PersianCat(name, age, color, eyeColor, ownerId) {
  Cat.call(this, name, age, color, ownerId);
  this.eyeColor = eyeColor;
  this.furDescription = function () {
    console.log(`${this.name} has full fur`);
  };
}

function RagdollCat(name, age, color, weight, ownerId) {
  Cat.call(this, name, age, color, ownerId);
  this.weight = weight;
  this.isFriendly = true;
  this.printPersonality = function (type) {
    this.isFriendly = type;
    if (type) {
      console.log(`${this.name} is friendly`);
    } else {
      console.log(`${this.name} is not friendly`);
    }
  };
}

let people = [
  new Person(1, "Ime1", "Prezime1", 19),
  new Person(2, "Ime2", "Prezime2", 22),
  new Person(3, "Ime3", "Prezime3", 25),
  new Person(4, "Ime4", "Prezime4", 27),
  new Person(5, "Ime5", "Prezime5", 30),
];

Cat.prototype.getOwnerDetails = function () {
  let owner = null;
  for (let i = 0; i < people.length; i++) {
    if (people[i].id == this.ownerId) {
      owner = people[i];
      break;
    }
  }

  if (owner) {
    console.log(`${this.name} owner is ${owner.getFullName()}`);
  } else {
    console.log(`${this.name} doesn't have an owner.`);
  }
};

let persianCat = new PersianCat("Persian", 4, "orange", "blue", 3);
let ragdollCat = new RagdollCat("Ragdoll", 5, "white", 12, 1);

console.log("=--=-=-=-=-=-=-=-=");

console.log(persianCat);
persianCat.getOwnerDetails();
persianCat.furDescription();

console.log("=--=-=-=-=-=-=-=-=");

console.log(ragdollCat);
ragdollCat.getOwnerDetails();
ragdollCat.printPersonality(true);
