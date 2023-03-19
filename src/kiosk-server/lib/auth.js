const firebase = require("firebase/app");
const getAuth = require("firebase/auth");


// Sign in with email and pass.
function register(email, password) {
    getAuth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
        });
}

// Login with email and pass.
function login(email, password) {
    getAuth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

// export functions
module.exports = {
    register,
    login
}