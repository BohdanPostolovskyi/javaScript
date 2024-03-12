//================================================================|
//================================================================|
//================================================================|
// Завдання ще допрацьовується через виникнення проблем у програмі|
//================================================================|
//================================================================|
//================================================================|

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

truck2.AssignDriver("Postolovskyi Bohdan", true, 5);
console.log(truck2);

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

// 1.2.11 ==========================================
// 1.2.12 ==========================================
// 1.2.13 ==========================================
// 1.2.14 ==========================================
// 1.2.15 ==========================================
// 1.2.16 ==========================================
// 1.2.17 ==========================================
// 1.2.18 ==========================================
// 1.2.19 ==========================================
// 1.2.21 ==========================================
// 1.2.22 ==========================================
// 1.2.23 ==========================================
// 1.2.24 ==========================================
// 1.2.25 ==========================================
// 1.2.26 ==========================================
// 1.2.27 ==========================================
// 1.2.28 ==========================================
// 1.2.29 ==========================================
// 1.2.30 ==========================================
// 1.2.31 ==========================================
