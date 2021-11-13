var app_fireBase = {};

(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyB_gF97uMr2Kk24w0Qdzrp8CzHfz2gNTYQ",
        authDomain: "to-do-auth-8411e.firebaseapp.com",
        projectId: "to-do-auth-8411e",
        storageBucket: "to-do-auth-8411e.appspot.com",
        messagingSenderId: "847198881707",
        appId: "1:847198881707:web:2ecd5fdf1bea140247b4ee",
        measurementId: "G-61E5CS3S6M"
      };

      firebase.initializeApp(firebaseConfig);
      app_fireBase = firebase;

})()