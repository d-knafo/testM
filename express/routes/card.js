const express = require("express");
const { Card } = require("../models/card");
const router = express.Router();
const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

router.post("/", async (req, res) => {
  if (!req.body || req.body.ids.length == 0) {
    res.header(401).send({
      success: false,
      message: "Bad request",
    });
  }
  let transactionId = uuidv4();
  req.body.ids.forEach((id) => {
    let card = new Card({
      product: id,
      transactionId,
      createdAt: moment().subtract(2, "days"),
    });
    card.save();
  });
  res.send({
    success: true,
  });
});

router.get("/", async (req, res) => {
  let allCards = await Card.find({}).populate("product");
  var top5 = {};
  let byDays = {};
  let uniqueSold = {};
  let productsTranction = [];

  allCards.forEach(async (c) => {
    let productId = c.product._id;

    if (top5[productId] != undefined) {
      top5[productId].count++;
    } else {
      top5[productId] = {
        title: c.product.title,
        count: 1,
      };
    }

    let date = moment(c.createdAt).format("L");
    if (byDays[date] != undefined) {
      byDays[date].total = byDays[date].total + c.product.price;
    } else {
      byDays[date] = {
        total: c.product.price,
      };
    }

    let transactionId = c.transactionId;

    if (productsTranction[transactionId] == undefined) {
      productsTranction[transactionId] = [];
    }
    if (!productsTranction[transactionId].includes(productId)) {
      if (uniqueSold[productId] != undefined) {
        uniqueSold[productId].count++;
      } else {
        uniqueSold[productId] = {
          productId,
          title: c.product.title,
          count: 1,
        };
      }
    }
    productsTranction[transactionId].push(productId);
  });

  top5 = _.sortBy(top5, (obj) => parseInt(obj.count, 10))
    .reverse()
    .slice(0, 5);

  uniqueSold = _.sortBy(uniqueSold, (obj) => parseInt(obj.count, 10))
    .reverse()
    .slice(0, 5);

  res.send({
    success: true,
    data: {
      top5,
      byDays,
      uniqueSold,
    },
  });
});

module.exports = router;
