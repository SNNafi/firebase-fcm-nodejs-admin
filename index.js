//
//  index.js
//  Send Push Notification to Android and iOS
//
//  Created by Shahriar Nasim Nafi on 19/11/21.
//  Copyright © 2021 Shahriar Nasim Nafi. All rights reserved.
//

const express = require("express");
const admin = require("firebase-admin");
require("dotenv").config();

const cors = require("cors");

const app = express();
const port = process.env.PORT || 4321;

// middleware
app.use(cors());
app.use(express.json());

var serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

const topic = "antenna_android";

const message = {
  data: {
    title: "Title for android from FAdmin",
    message: "Body for android from FAdmin",
    image_url: "",
    action: "",
    action_destination: "",
  },
  apns: {
    payload: {
      aps: {
        alert: {
          title: "Title for iOS from FAdmin",
          body: "Body for iOS from FAdmin",
        },
        category: "nils",
        "mutable-content": 0,
      },
    },
  },
  topic: topic,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.get("/", (req, res) => {
  res.send("Firebase Admin is running");
});

app.get("/send-upush", (req, res) => {
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      res.send(`Successfully sent message: ${response}`);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      res.send(`Error sending message: ${error}`);
    });
});

app.listen(port, () => {
  console.log("Firebase Admin Server running at port", port);
});
