import {Auth, dataBase} from '../config';


function saveUserData (user) {
  dataBase.ref('/users').child(user.user.uid).set({
    email: user.user.email,
  })
}
export function signUpUser(email, password) {
  return Auth().createUserWithEmailAndPassword(email, password).then(saveUserData)
  }

export function signInUser(email, password) {
  return  Auth().signInWithEmailAndPassword(email, password)
}
