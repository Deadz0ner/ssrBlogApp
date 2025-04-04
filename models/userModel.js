import mongoose from "mongoose";
import {createHmac, randomBytes} from "crypto";
import {createTokenforUsers} from "../services/authentication.js"

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String, default: "../public/images/default.img" },
  salt: { type: String },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

UserSchema.pre("save", function (next) {
  const user = this;

  // Check if the password field is modified
  if (!user.isDirectModified("password")) {
    return next(); // Call next to proceed if password is not modified
  }

  // Hash the password
  const salt = randomBytes(16).toString();
  const hashPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashPassword;

  next(); // Call next after completing the hashing process
});

UserSchema.static("matchPassword", async function (email, password) {
  // Find the user by email
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");


  const hashPassword = user.password;
  const salt = user.salt;

  const providedPassword = createHmac("sha256", salt).update(password).digest("hex");


  if (hashPassword !== providedPassword) throw new Error("Wrong Password");

  const token = createTokenforUsers(user);
  return token;
});

const User = mongoose.model("User", UserSchema);

export default User;
