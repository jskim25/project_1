// Initialize Firebase
var config = {
    apiKey: "AIzaSyD1M7vn5mlncIUT5WxX973pMcArUMZG2_0",
    authDomain: "project-1-5c6e9.firebaseapp.com",
    databaseURL: "https://project-1-5c6e9.firebaseio.com",
    projectId: "project-1-5c6e9",
    storageBucket: "project-1-5c6e9.appspot.com",
    messagingSenderId: "75312830432"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Initial Values
  var name = "";
  var email = "";
  var age = 0;
  var comment = "";

  // Capture Button Click
  $("#add-user").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    email = $("#email-input").val().trim();
    age = $("#age-input").val().trim();
    comment = $("#comment-input").val().trim();

    database.ref().set({
      name: name,
      email: email,
      age: age,
      comment: comment
    });

  });

  // Firebase watcher + initial loader HINT: .on("value")
  database.ref().on("value", function(snapshot) {

    // Log everything that's coming out of snapshot
    console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().email);
    console.log(snapshot.val().age);
    console.log(snapshot.val().comment);

    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);
    $("#email-display").text(snapshot.val().email);
    $("#age-display").text(snapshot.val().age);
    $("#comment-display").text(snapshot.val().comment);

    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });