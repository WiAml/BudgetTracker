const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error getting transactions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    const transaction = new Transaction({
      amount,
      type,
      category,
      description,
      date,
    });
    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: "Error creating transaction" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting transaction", error: error.message});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id,req.body,{new: true});
    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({
      message: "Error updating transaction",
      error: error.message
    });
  }
});

module.exports = router;

