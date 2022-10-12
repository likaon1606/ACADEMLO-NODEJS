//Models
const { User } = require("../models/userModel");

//catch errors
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const userExists = catchAsync (async (req, res, next) => {
    const { id } = req.params;

    // search one element, recovery id  = ?, all value
    const user = await User.findOne({ where: { id } }); // search id with id params id:id

    if (!user) {
      return next(new AppError('User does not exist with given Id', 404));
    }

    //Add property user
    req.user = user;
    next();
});

module.exports = { userExists };
