function tabul() {
  console.log("==========================================");
}

// 1.2.1 ==========================================
// 1.2.2 ==========================================
// 1.2.3 ==========================================
var car1 = new Object();

car1.color = "red";
car1.maxSpeed = 200;
car1.driver = {
    name: "Postolovskyi Bohdan",
    category: "C",
    "personal limitations": "No driving at night"
};
car1.tuning = true;
car1["number of accidents"] = 0;

console.log(car1);

// 1.2.4 ==========================================
var car2 = {
  color: "blue",
  maxSpeed: 180,
  driver: {
      name: "Postolovskyi Bohdan",
      category: "B",
      "personal limitations": null
  },
  tuning: false,
  "number of accidents": 2
};

console.log(car2);

// 1.2.5 ==========================================
car1.drive = function() {
  console.log("I am not driving at night");
};
car1.drive();

// 1.2.6 ==========================================
car2.drive = function() {
  console.log("I can drive anytime");
};
car2.drive();

// 1.2.7 ==========================================
function Truck(color, weight, avgSpeed, brand, model) {
  this.color = color;
  this.weight = weight;
  this.avgSpeed = avgSpeed;
  this.brand = brand;
  this.model = model;
}

var truck1 = new Truck("red", 5000, 60.5, "Volvo", "VNL");
console.log(truck1);

// 1.2.8 ==========================================
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
  this.driver = {
      name: name,
      nightDriving: nightDriving,
      experience: experience
  };
};

truck1.AssignDriver("Postolovskyi Bohdan", true, 5);
console.log(truck1);

// 1.2.9 ==========================================
Truck.prototype.trip = function() {
  if (!this.driver) {
      console.log("No driver assigned");
  } else {
      var message = "Driver " + this.driver.name;
      if (this.driver.nightDriving) {
          message += " drives at night";
      } else {
          message += " does not drive at night";
      }
      message += " and has " + this.driver.experience + " years of experience";

      console.log(message);
  }
};

var truck3 = new Truck("green", 7000, 50.5, "Chevrolet", "Silverado");
truck3.AssignDriver("Postolovskyi Bohdan", false, 8);
truck3.trip();

// 1.2.10 ==========================================
Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
  this.driver = {
      name: name,
      nightDriving: nightDriving,
      experience: experience
  };
};

var truck1 = new Truck("blue", 6000, 55.5, "Ford", "F-150");
truck1.AssignDriver("Postolovskyi Bohdan", true, 7);
truck1.trip();

var truck2 = new Truck("red", 7000, 60.0, "Chevrolet", "Silverado");
truck2.AssignDriver("Postolovskyi Bohdan", false, 5);
truck2.trip();


// 1.2.11 У завданнях 1.2.12 – 1.2.24 роботи слід використовувати механізм  класів, уведений у ES6.
// 1.2.12 ==========================================
let angle = 90;

class Square {
  constructor(a) { 
      this.a = a;
  }

  // 1.2.14 ==========================================
  static help() {
      console.log("Квадрат це чотирикутник, у якому всі сторони рівні.");
      console.log("Властивості квадрата:");
      console.log("Всі сторони квадрата рівні");
      console.log("Кожен із кутів квадрата дорівнює 90°");
      console.log("Діагоналі квадрата взаємно перпендикулярні");
  }

  // 1.2.15 ==========================================
  length() {
      console.log("Периметр квадрата: " + 4 * this.a);
  }
  
  square() {
      console.log("Площа квадрата: " + Math.pow(this.a, 2)); 
  }

  info() {
      console.log("Довжини сторін: " + this.a); 
      console.log("Величини кутів: 90°"); 
      this.length();
      this.square();
  }
}

// 1.2.13 ==========================================
//const square = new Square(9);

// 1.2.16 ==========================================
class Rectangle1488 extends Square {
  // 1.2.17 ==========================================
  constructor(a, b) { 
      super(a);
      this.b = b;
  }

  static help() {
      console.log("Прямокутник це чотирикутник, у якому всі кути прямі.");
      console.log("Властивості прямокутника:");
      console.log("Протилежні сторони прямокутника рівні");
      console.log("Діагоналі прямокутника рівні");
  }

  length() {
      console.log("Периметр прямокутника: " + 2 * (this.a + this.b));
  }
  
  square() {
      console.log("Площа прямокутника: " + this.a * this.b); 
  }

  info() {
      console.log("Довжини сторін: Перші дві протилежні сторони " + this.a); 
      console.log("Довжини сторін: Другі дві протилежні сторони " + this.b); 
      console.log("Величини кутів: 90°"); 
      this.length();
      this.square();
  }

  // 1.2.22 ==========================================
  get a(){
      return this._a;
  }

  set a(value){
      if (value > 0)
          this._a = value;
      else
          console.log("Сторони прямокутника не можуть дорівнювати 0, або бути від'ємним числом!")
  }

  get b(){
      return this._b;
  }

  set b(value){
      if (value > 0)
          this._b = value;
      else
          console.log("ССторони прямокутника не можуть дорівнювати 0, або бути від'ємним числом!")
  }
}

// 1.2.18 ==========================================
class Rhombus extends Square {
  // 1.2.19 ==========================================
  constructor(a, alpha, beta) { 
      super(a);
      this.alpha = alpha;
      this.beta = beta;
  }

  static help() {
      console.log("Ромб це паралелограм, в якого всі сторони є рівними.");
      console.log("Властивості ромба:");
      console.log("Протилежні кути рівні");
      console.log("Сторони, попарно паралельні");
  }

  length() {
      console.log("Периметр ромба: " + 4 * this.a);
  }
  
  square() {
      console.log("Площа ромба: " + Math.pow(this.a, 2) * Math.sin(this.alpha * Math.PI / 180)); 
  }

  info() {
      console.log("Довжини сторін: " + this.a); 
      console.log("Довжини сторін: " + this.alpha + "°"); 
      console.log("Довжини сторін: " + this.beta + "°"); 
      this.length();
      this.square();
  }
}

// 1.2.20 ==========================================
class Parallelogram extends Rhombus {
  // 1.2.21 ==========================================
  constructor(a, b, alpha, beta) { 
      super(a, alpha, beta);
      this.b = b;
  }

  static help() {
      console.log("Паралелограм це чотирикутник, протилежні сторони якого попарно паралельні.");
      console.log("Властивості паралелограма:");
      console.log("Загальна сума кутів паралелограма дорівнює 360°");
      console.log("Протилежні сторони паралелограма рівні");
      console.log("Одна пара протилежних сторін є паралельними і мають однакову довжину");
      
  }
  
  length() {
      console.log("Периметр паралелограма: " + 2 * (this.a + this.b));
  }
  
  square() {
      console.log("Площа паралелограма: " + this.a * Math.sin(this.alpha * Math.PI / 180) * this.b); 
  }

  info() {
      console.log("Довжини сторін: " + this.a);
      console.log("Довжини сторін: " + this.b);
      console.log("Довжини сторін: " + this.alpha + "°"); 
      console.log("Довжини сторін: " + this.beta + "°"); 
      this.length();
      this.square();
  }
}

// 1.2.23 ==========================================
tabul()
Square.help();
tabul()
Rectangle1488.help();
tabul()
Rhombus.help();
tabul()
Parallelogram.help();
tabul()

// 1.2.24 ==========================================
const Square2 = new Square(9);
Square2.info();
tabul()
const rectangle = new Rectangle1488(8, 4);
rectangle.info();
tabul()
const rhombus = new Rhombus(2, 30, 60);
rhombus.info();
tabul()
const parallelogram = new Parallelogram(6, 8, 30, 10);
parallelogram.info();
tabul()

// Створити функцію Triangular
// 1.2.25 ==========================================
function Triangular(a = 3, b = 4, c = 5) {
  return { a, b, c }; 
}

// 1.2.26 ==========================================
let OriginalTriangle = Triangular();
let triangle1 = Triangular(8, 20);
let triangle2 = Triangular(6, 12, 24);

console.log("Original Triangle:", OriginalTriangle);
console.log("Triangle 1:", triangle1);
console.log("Triangle 2:", triangle2);
tabul()

// 1.2.27 ==========================================
function PiMultiplier(multiplier) {
  let resultFunction = function (){
      return Math.PI * multiplier;
  }; 
  return resultFunction;
}

// 1.2.28 ==========================================
let multiplyByTwo = PiMultiplier(2);
let multiplyBy2shot3 = PiMultiplier(2/3);
let divideByTwo = PiMultiplier(1/2);

console.log("(pi * 2) =", multiplyByTwo());
console.log("(pi * 2/3) =", multiplyBy2shot3());
console.log("(pi / 2) =", divideByTwo());
tabul()

// Створити функцію Painter
// 1.2.29 ==========================================
function Painter(color) {
  let paintFunction = function(object) {
      if (object.hasOwnProperty('type'))
          console.log(`Painting object with type (${object.type}) to color (${color})`);
      else 
          console.log(`No 'type' property occurred!`);
  };
  return paintFunction;
}

// 1.2.30 ==========================================
let PaintBlue = Painter('blue');
let PaintRed = Painter('red');
let PaintYellow = Painter('yellow');

// 1.2.31 ==========================================
let object1 = { 
  maxSpeed: 280, 
  type: 'Sportcar',
  color: 'magenta', 
};
let object2 = { 
  type: 'Truck', 
  avgSpeed: 90, 
  loadCapacity: 2400,
};
let object3 = { 
  maxSpeed: 180,
  color: 'purple',
  isCar: true,
};

console.log("Painting object car 1: ");
PaintBlue(object1);
console.log("Painting object car 2: ");
PaintRed(object2);
console.log("Painting object car 3: ");
PaintYellow(object3);
// 0.0.00 ==========================================