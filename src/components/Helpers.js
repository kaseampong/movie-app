import {Auth, dataBase} from '../config';


export function signUpUser(email, password, displayName) {
  return Auth().createUserWithEmailAndPassword(email, password)
  .then((user) => {
    Auth().currentUser.updateProfile({
      displayName,
      photoURL: "https://cdn.vectoricons.net/wp-content/themes/checkout-child/images/me-as-icon-with-glass-transparent.png"
    })
    .then(() => {
      dataBase.ref('/users').child(user.user.uid).set({
        email: user.user.email,
        displayName: user.user.displayName,
        photoURL: user.user.photoURL
      })
    })
  })
}

export function signInUser(email, password) {
  return  Auth().signInWithEmailAndPassword(email, password)
}
