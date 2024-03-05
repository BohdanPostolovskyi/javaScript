(function(window) {
    let speakGoodBye = {};
    speakGoodBye.speakWord = "Good Bye";

    speakGoodBye.speak = function (name) {
        console.log(speakGoodBye.speakWord + " " + name);
    }

    window.speakGoodBye = speakGoodBye;

  })(window);