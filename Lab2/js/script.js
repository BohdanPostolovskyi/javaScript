(function() {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      speakGoodBye.speak(names[i]);
    } else {
      speakHello.speak(names[i]);
    }
  }

  console.log("\n");

  for (var i = 0; i < names.length; i++) {
    var currentName = names[i];
    var message = "";

    if (currentName.length <= 5) {
      message = speakHello.speak + " " + currentName;
      speakHello.speak(currentName);
    } else {
      message = speakGoodBye.speak + " " + currentName;
      speakGoodBye.speak(currentName);
    }
  }
})();