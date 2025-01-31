function Product(name, type, hasDiscount, price) {
  this.name = name;
  this.type = type;
  this.hasDiscount = hasDiscount;
  this.price = price;
}

let products = [
  new Product("Burger", "Food", true, 7),
  new Product("Pizza", "Food", true, 12),
  new Product("Chair", "Furniture", true, 50),
  new Product("Table", "Furniture", true, 120),
  new Product("Sofa", "Furniture", true, 200),
  new Product("Desk", "Furniture", true, 150),
  new Product("Headphones", "Electronics", true, 99),
  new Product("Keyboard", "Electronics", false, 125),
  new Product("Mouse", "Electronics", false, 80),
  new Product("Monitor", "Electronics", false, 300),
  new Product("PC", "Electronics", false, 1500),
  new Product("Notebook", "School Item", false, 5),
  new Product("Pen", "School Item", false, 2),
  new Product("Eraser", "School Item", false, 1),
  new Product("Apple", "Food", false, 1),
];

let over20 = products.filter((product) => product.price > 20);
console.log("Products over $20", over20);

let discountPrices = products
  .filter((product) => product.hasDiscount)
  .map((product) => ({
    name: product.name,
    price: product.price,
  }));

console.log("Price of all discounts:", discountPrices);

let foodDiscount = products
  .filter((product) => product.type == "Food" && product.hasDiscount)
  .map((product) => product.name);
console.log("Food on discount:", foodDiscount);

let vowelNoDiscount = products
  .filter((product) => {
    let firstLetter = product.name[0];

    if (
      firstLetter == "A" ||
      firstLetter == "E" ||
      firstLetter == "I" ||
      firstLetter == "O" ||
      firstLetter == "U"
    ) {
      return !product.hasDiscount;
    }
    return false;
  })
  .map((product) => ({
    name: product.name,
    price: product.price,
  }));

console.log("Vowel not on discount:", vowelNoDiscount);
