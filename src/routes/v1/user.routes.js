const express = require('express');

const { json } = require('body-parser');
const { sign, decode } = require('jsonwebtoken');
const { compare, hash } = require('bcrypt');
const checkJwt = require('express-jwt');

const User = require("../../models/user.model");

const { JWT_SECRET } = require("../../constants");

module.exports = (app) => {

    // ALTA
    app.post('/', json(), (req, res) => {
      const userBody = req.body;

      hash(userBody.password, 10)
          .then((hash) => {
              return User.create({
                  username:   userBody.username,
                  email:      userBody.email,
                  password:   hash
              })
          })
          .then((created_user) => {
              const token = sign({}, JWT_SECRET);

              res.json({
                  user: created_user,
                  token
              });
          })
          .catch((error) => {
              if(error.code === 11000){
                  res
                  .status(401)
                  .json({
                      message: ('El usuario con el mail "' + error.keyValue.email + '" ya existe en el sistema')
                  })
              }
              
              res
              .status(400)
              .json({
                  error: error.message
              });
          });
  });

  //BAJA
  app.delete('/', json(),checkJwt({ secret: JWT_SECRET }), (req, res) => {
    const userBody = req.body;

    User.findByIdAndDelete(userBody.username)
            .then((doc) => {
                res
                    .status(200)
                    .json({
                        user: doc
                    })
            })
            .catch((err) => {
                res
                    .status(400)
                    .json({
                        error: err.json
                    })
            })
});

  return app;
};
