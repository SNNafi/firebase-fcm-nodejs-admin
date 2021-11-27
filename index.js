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

var serviceAccount = JSON.parse(process.env.RUQYAH_FIREBASE_SERVICE_ACCOUNT)


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

app.get("/", (req, res) => {
  res.send("Firebase Admin is running");
});

app.get("/send-dev", (req, res) => {
  console.log(req.query.t)
  console.log(req.query.m)
  console.log(req.query.action)
  console.log(req.query.ad)

  const topic = "masnun_amol_dev";

  const message = {
    data: {
      title: req.query.t,
      message: req.query.m,
      image_url: "",
      action: req.query.action ?? "",
      action_destination: req.query.ad ?? "",
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: req.query.t,
            body: req.query.m,
          },
          category: "nils",
          "mutable-content": 0  
        },
      },
    },
    topic: topic,
  };



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

app.get("/send", (req, res) => {
  console.log(req.query.t)
  console.log(req.query.m)
  console.log(req.query.action)
  console.log(req.query.ad)

  const topic = "masnun_amol";

  const message = {
    data: {
      title: req.query.t,
      message: req.query.m,
      image_url: "",
      action: req.query.action ?? "",
      action_destination: req.query.ad ?? "",
    },
    apns: {
      payload: {
        aps: {
          alert: {
            title: req.query.t,
            body: req.query.m,
          },
          category: "nils",
          "mutable-content": 0  
        },
      },
    },
    topic: topic,
  };



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
