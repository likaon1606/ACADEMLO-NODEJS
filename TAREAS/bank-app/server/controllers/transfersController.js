//models
const { User } = require("../models/usersModel");
const { Transfer } = require("../models/transfersModel");

const transfer = async (req, res) => {
  try {
    const { senderUserId, receiverUserId, amount } = req.body;
    const receiverAccount = await User.findOne({
      where: { accountNumber: receiverUserId },
    });
    const senderAccount = await User.findOne({
      where: { accountNumber: senderUserId },
    });
    if (!receiverAccount) {
      return res.status(404).json({
        status: "error",
        message: "Account not found",
      });
    }
    if (senderAccount.amount < amount) {
      return res.status(404).json({
        status: "error",
        message: "Amount is not valid",
      });
    }
    receiverAccount.amount += Number(amount);
    senderAccount.amount -= Number(amount);
    await User.update(
      { amount: receiverAccount.amount },
      { where: { accountNumber: receiverUserId } }
    );
    await User.update(
      { amount: senderAccount.amount },
      { where: { accountNumber: senderUserId } }
    );
    await Transfer.create({
      receiverUserId,
      senderUserId,
      amount,
    });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { transfer };
