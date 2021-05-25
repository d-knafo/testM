const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  transactionId: {
    type: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Card = mongoose.model("Card", cardSchema);
exports.Card = Card;
