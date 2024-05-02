(function(window) {
    let speakHello = {};
    speakHello.speakWord = "Hello";

    speakHello.speak = function (name) {
        console.log(speakHello.speakWord + " " + name);
    }

    window.speakHello = speakHello;

  })(window);