import {
  registerService,
  loginService
} from "../services/auth.service.js";

import MR from "../models/MR.model.js";
import Doctor from "../models/Doctor.model.js";


/* ================= REGISTER ================= */

export const registerUser = async (req, res) => {

try {

const user = await registerService(req.body);

res.status(201).json({
success: true,
message: "User registered successfully",
user
});

} catch (error) {

res.status(400).json({
success: false,
message: error.message
});

}

};



/* ================= LOGIN ================= */

export const loginUser = async (req, res) => {

try {

const data = await loginService(req.body);

let mrId = null;
let doctorId = null;

const userId = data.user._id || data.user.id;


/* ================= MR LOGIN ================= */

if (data.user.role?.toLowerCase() === "mr") {

const mrDoc = await MR.findOne({
user: userId
});

if (mrDoc) {
mrId = mrDoc._id.toString();
}

}


/* ================= DOCTOR LOGIN ================= */

if (data.user.role?.toLowerCase() === "doctor") {

const doctorDoc = await Doctor.findOne({
user: userId
});

if (doctorDoc) {
doctorId = doctorDoc._id.toString();
}

}


res.status(200).json({
success: true,
message: "Login successful",
token: data.token,
user: data.user,
mrId,
doctorId
});

} catch (error) {

res.status(401).json({
success: false,
message: error.message
});

}

};



/* ================= LOGOUT ================= */

export const logoutUser = async (req, res) => {

res.status(200).json({
success: true,
message: "Logout successful"
});

};