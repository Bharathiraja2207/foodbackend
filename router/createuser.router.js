import { client } from '../index.js';

export async function hashpass(email,firstname,lastname,username, hashpassword) {
  return await client
    .db("buyfast")
    .collection("buyfastpass")
    .insertOne({
      firstname:firstname,
      lastname:lastname,
      username: username,
      password: hashpassword ,
      email:email
    });
}

export async function getuserbyname(email) {
    return await client
      .db("buyfast")
      .collection("buyfastpass")
      .findOne({
        email: email
      });
  }
