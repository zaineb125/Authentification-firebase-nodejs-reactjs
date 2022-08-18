const db = require("./../configuration/dbConfig");
/*class User {
  
  constructor(name,age,email){
    this._name=name;
    this._age=age;
    this._email=email;
  }

  set name(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set age(age) {
    this._age = age;
  }

  get age() {
    return this._age;
  }

  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get email() {
    return this._email;
  }
}*/
const Users = db.collection("Users");
module.exports = Users;
