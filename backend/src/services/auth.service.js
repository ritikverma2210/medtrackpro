import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/* ================= REGISTER SERVICE ================= */

export const registerService = async ({ name, email, password, role }) => {

try{

// Check existing user
const existingUser = await User.findOne({ email });

if (existingUser) {
throw new Error("User already exists");
}


// Hash password
const hashedPassword = await bcrypt.hash(password, 12);


// Default role admin (for register page)
const userRole = role || "admin";


// Create user
const user = await User.create({
name,
email,
password: hashedPassword,
role: userRole
});


return {
_id: user._id,
name: user.name,
email: user.email,
role: user.role
};

}catch(error){

throw new Error(error.message);

}

};



/* ================= LOGIN SERVICE ================= */

export const loginService = async ({ email, password }) => {

try{

const user = await User.findOne({ email });

if (!user) {
throw new Error("Invalid email or password");
}


// Compare password
const match = await bcrypt.compare(password, user.password);

if (!match) {
throw new Error("Invalid email or password");
}


// Generate JWT
const token = jwt.sign(
{
id: user._id,
role: user.role
},
process.env.JWT_SECRET,
{
expiresIn: "1d"
}
);


return {
token,
user: {
_id: user._id,
name: user.name,
email: user.email,
role: user.role
}
};

}catch(error){

throw new Error(error.message);

}

};