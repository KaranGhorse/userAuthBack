require("dotenv").config();
var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')


function verifyToken(token) {
  // const token = req.cookies['authAdToken'];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  const userId = decoded.userId;
  return userId;
}

router
  .route("/register")
  .get((req, res, next) => {
    res.render("register");
  })
  .post(async function (req, res, next) {
    try {
      const {
        fullname,
        username,
        email,
        password
      } = req.body;
      const newuser = new userModel({
        fullname,
        username,
        email,
        password
      })

      const user = await newuser.save();
      res.render('home', {user})
    } catch (err) {
      console.log(err);
      res.redirect('/')
    }
  });

router
  .route("/")
  .get(function (req, res, next) {
    res.render("login");
  })
  .post(async function (req, res) {
    try {
      console.log(req.body);
    const {username, password} = req.body
  
    const user = await userModel.findOne({username});
    if (user) {
      if (user.password == password) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: "5h",
        });
    
        // Send token in response
        res.cookie("UserToken", token, {
          maxAge: 5 * 60 * 60 * 1000,
          httpOnly: true,
        });

        console.log("cookies sending on front");
      res.redirect("/home");
      }
      else res.redirect('/')

    }
    else res.redirect('/')
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }

  });

router
  .route("/home")
  .get(isUserLoggedIn, async (req, res, next) => {
    try {
      const token = req.cookies['UserToken']
      const user = await userModel.findById(verifyToken(token));

      res.render("home", { user });
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  })

  router.get("/logout", (req, res) => {
    res.clearCookie('UserToken'); // Cookie ka naam jo aapne set kiya hai use yahaan specify karein
    res.redirect('/'); // Logout ke baad user ko kisi specific page par redirect kar sakte hain
  });

function isUserLoggedIn(req, res, next) {
  console.log("so i am in isAdminLoggedIn middilware");

  const token = req.cookies['UserToken'];
  // console.log(token);

  if (!token) {
    res.redirect("/");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.redirect("/");
    }
    req.user = decoded;
    next();
  });
}

module.exports = router;
