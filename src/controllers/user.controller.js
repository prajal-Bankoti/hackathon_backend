const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const customer = require("../models/customer.model");
const diverbid = require("../models/customer.bid.model");
const customerbid = require("../models/diver.bid.model");
const city = require("../models/city.model");
const diver = require("../models/diver.model");
const upload = require("../midlleware/file-upload");

var fs = require("fs");
require("dotenv").config();
var bcryptjs = require("bcryptjs");
const User = require("../models/user.model");

/////////////////////////////////////////////////////////////////////////////////////////////////////////

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_KEY);
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/register", async (req, res) => {
  let user;
  try {
    user = await User.findOne({ phone: req.body.phone });

    if (user) {
      return res.status(400).send({ mes: "user alredy in database" });
    }
    user = await User.create(req.body);
    const token = newToken(user);
    console.log(token.name)
    return res.send({ user, token });
  } catch (err) {
    return res.status(500).send({ mess: "some thing went wrong" });
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/city", async (req, res) => {
  try {
    let find = req.query.page;
   // if (find) {
      let diver1 = await city.find({ city: { $regex: find } });
      return res.send(diver1);
   // }
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

router.post("/city", async (req, res) => {
  try {
    let book = await city.create(req.body);
    return res.send(book);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.put("/register/:ID", upload.single("img"), async (req, res) => {
  const product1 = await User.findById(req.params.ID);
  console.log(req.file.path);

  try {
    const product = await User.findByIdAndUpdate(req.params.ID, {
      img: req.file.path,
      name: req.body.name,
      email: req.body.email,
      roles: req.body.roles,
      phone: req.body.phone,
      addarCard: req.body.addarCard,
    });
    fs.unlinkSync(product1.img);
    return res.send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/register/:id", async (req, res) => {
  try {
    let book = await User.findById(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send(book);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post("/business_diver", async (req, res) => {
  try {
    let user = await User.findById({ _id: req.body.user });
    if (user.roles === "diver") {
      let book = await diver.create(req.body);
      return res.status(200).send(book);
    } else {
      return res.status(500).send({ mes: "you are not allowed to add book" });
    }
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////

router.post("/business_customer", async (req, res) => {
  try {
    //let user = await User.findById({ _id: req.body.user });

    let customer1 = await customer.create(req.body);
    return res.status(200).send(customer1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get("/business_diver", async (req, res) => {
  try {
    let diver1 = await diver.find().lean().exec();
    return res.send(diver1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/business_customer", async (req, res) => {
  try {
    let customer1 = await customer.find().lean().exec();
    return res.send(customer1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////

router.post("/customer_bid", async (req, res) => {
  try {
    //let user = await User.findById({ _id: req.body.user });

    let customer1 = await diverbid.create(req.body);
    return res.status(200).send(customer1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/customer_bid", async (req, res) => {
  try {
    let customer1 = await diverbid.find().lean().exec();
    return res.send(customer1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

//////////////////////////////////////////////////////////////////////////

router.post("/diver_bid", async (req, res) => {
  try {
    let customer1 = await customerbid.create(req.body);
    return res.status(200).send(customer1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/diver_bid", async (req, res) => {
  try {
    let customer1 = await customerbid.find().lean().exec();
    return res.send(customer1);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

//////////////////////////////////////////////////////////////////////////

router.patch("/lectures/:id", async (req, res) => {
  try {
    let book = await lecture.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).send(book);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/lectures/:id", async (req, res) => {
  try {
    let book = await lecture.findById(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).send(book);
  } catch (err) {
    return res.status(200).send(err.message);
  }
});

module.exports = router;
