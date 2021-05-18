var firebaseConfig = {
    apiKey: "AIzaSyBpyYKfbIcgpb27pOogX8pGUHUkFvkpMDs",
    authDomain: "boxwood-ray-764.firebaseapp.com",
    databaseURL: "https://boxwood-ray-764-default-rtdb.firebaseio.com",
    projectId: "boxwood-ray-764",
    storageBucket: "boxwood-ray-764.appspot.com",
    messagingSenderId: "978483429939",
    appId: "1:978483429939:web:2ca707fb21f57121659946"
  };
  
  firebase.initializeApp(firebaseConfig);
 
  var database = firebase.database();
  
  function writeNewResult(game_r, name_r, date_r, result_r) {
    var postData = {
      game: game_r,
      name: name_r,
      date: date_r,
      result: result_r
    };
  
    var newPostKey = database.ref().child('games').push().key;
    var updates = {};
    updates['/games/' + newPostKey] = postData;
  
    return database.ref().update(updates);
  }
