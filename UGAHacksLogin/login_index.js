// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDVU6k61CZTanULYYPBv8s2e518V5y56AY",
    authDomain: "ugahackathon.firebaseapp.com",
    projectId: "ugahackathon",
    storageBucket: "ugahackathon.appspot.com",
    messagingSenderId: "265000046547",
    appId: "1:265000046547:web:ef63fb9d4bfe7c6958e926",
    measurementId: "G-2L6VQNBRVT"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

var isLoginPage = false

// Set up our register function
function register () {
  // changing title
  document.getElementById("form_header").innerHTML = "Register"
  if (!isLoginPage) {

  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  region = document.getElementById('region').value
  age = document.getElementById('age').value
  gender = document.getElementById('gender').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid')
    return
    // Don't continue running the code
  }

  if(validate_field(region) == false || validate_field(age) == false || validate_field(gender) == false){
    alert('No input')
    return false
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      region: region,
      age: age,
      gender: gender,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
  } else {
    // adding inputs
    document.getElementById("age").style.visibility = 'visible'
    document.getElementById("gender").style.visibility = 'visible'
    document.getElementById("region").style.visibility = 'visible'
    isLoginPage = false
  }
}

// Set up our login function
function login () {
  // title
  document.getElementById("form_header").innerHTML = "Login"
  if (isLoginPage) {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is invalid')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
  } else {
      // buttons
  document.getElementById("age").style.visibility = 'hidden'
  document.getElementById("gender").style.visibility = 'hidden'
  document.getElementById("region").style.visibility = 'hidden'
    isLoginPage = true
  } 
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}


function validate_field(field){
  if(field==null){
    return false
  }
  if(field.length <= 0){
    return false
  }else{
    return true
  }
}
