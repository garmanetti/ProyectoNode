const express = require("express");

const { json } = require("body-parser");
const { sign, decode } = require("jsonwebtoken");
const { compare, hash } = require("bcrypt");
const checkJwt = require("express-jwt");

const Tweet = require("../../models/tweet.model");

const { JWT_SECRET } = require("../../constants");

module.exports = app => {
  //LIST TWEETS
  app.get("/", (req, res) => {
    Tweet.find()
      .then(docs => {
        res.json(
          docs.map(doc =>
            doc.toObject({
              transform(doc, ret, options) {
                delete ret.hash;
                return ret;
              }
            })
          )
        );
      })
      .catch(error => {
        res.send(error);
      });
  });

  //ADD TWEET
  app.post("/", json(), checkJwt({ secret: JWT_SECRET }), (req, res) => {
    const tweetBody = req.body;
    const userId = req.user.id;

    Tweet.create(tweetBody)
      .then(doc => {
        res.json(doc);
      })
      .catch(({ message }) => {
        res.status(401).json({
          error: message
        });
      });
  });

  return app;
};
