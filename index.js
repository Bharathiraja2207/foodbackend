// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
import signinRouter from './router/signin.js'
dotenv.config()
const app = express();


// console.log(process.env.mongo_url)

const PORT = process.env.PORT;
// const mongo_url = 'mongodb://127.0.0.1';
const mongo_url =(process.env.mongo_url)
export const client = new MongoClient(mongo_url);
await client.connect();
  console.log('mongo is connected!!');

 app.use(cors ())
 app.use(bodyParser.json());
 app.use(express.json())
// const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨bharathi🤩");


// food item
  app.post("/postall",async function (request, response) {
    const data=request.body;
    console.log(data);
// db.moviesid.insertmany(data)
     const result= await client
        .db("buyfast")
       .collection("allfood")
        .insertMany(data)
    response.send(result);
  });

  app.get("/findallfood",async function (request, response) {
    const fooditm= await client
    .db("buyfast")
    .collection("allfood")
    .find({})
    .toArray();
        response.send(fooditm);
      });


//   food catagary
app.post("/foodcategory",async function (request, response) {
    const data=request.body;
    console.log(data);
     const result= await client
        .db("buyfast")
       .collection("foodcategory")
        .insertMany(data)
    response.send(result);
  });

  app.get("/foodcategory",async function (request, response) {
    const room_booking= await client
    .db("buyfast")
 .collection("foodcategory")
    .find({})
    .toArray();
      response.send(room_booking);
      });
});

// order
app.post("/order",async function (request, response) {
let data =request.body.order_data;
// data.splice((0,0,{order_date:request.body.order_date})) 
// let date=request.body.date
let eid=await client
.db("buyfast")
 .collection("orderdata")
 .findOne({"email":request.body.email})
console.log(eid)
if(eid===null){
    try{
        await client 
        .db("buyfast")
        .collection("orderdata")
        .insertOne({
            email:request.body.email,
            order_data:[data]
            // order_date:date
        }).then(()=>{
            response.json({success:true,message:"email"})
        })
    }catch(error){
        console.log(error.message);
        response.send("server error",error.message);
    }
}
else{
    try{
        await client
        .db("buyfast")
        .collection("orderdata")
        .findOneAndUpdate({email:request.body.email},
            {$push:{order_data:data}}).then(()=>{
                response.json({success:true,message:"email find and update"})
            })
    }catch(error){
        console.log(error.message);
        response.send("server error",error.message);
    }
}
})

app.post("/orderdata",async function (request, response) {
    try{
        let mydata= await client
        .db("buyfast")
        .collection("orderdata")
        .findOne({'email':request.body.email})
        // .toArray();
        response.json({orderdata:mydata})
    }catch(error){
        response.send('servar error',error.message)

    }

})

app.use("/user",signinRouter);

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));

