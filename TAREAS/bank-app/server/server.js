const { app } = require("./app");

//Models
const { User } = require("./models/usersModel");
const { Transfer } = require("./models/transfersModel");

// Utils
const { db } = require("./utils/database");

// Authenticate database credentials
db.authenticate()
  .then(() => console.log("Database authenticated"))
  .catch((err) => console.log(err));

// Establish relations
User.hasMany(Transfer, { foreignKey: "id" });
Transfer.belongsTo(User);

// Sync sequelize models
db.sync()
  .then(() => console.log("Database synced"))
  .catch((err) => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
