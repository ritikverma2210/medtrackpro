import Doctor from "../models/Doctor.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import Visit from "../models/Visit.model.js"

/* ================= CREATE DOCTOR ================= */

export const createDoctor = async (req, res) => {
try {

const {
name,
email,
password,
specialization,
hospital
} = req.body;

if (!name || !email || !password || !specialization || !hospital) {
return res.status(400).json({
success:false,
message:"All fields required"
});
}

const existingUser = await User.findOne({ email });

if(existingUser){
return res.status(400).json({
success:false,
message:"User already exists"
});
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
name,
email,
password:hashedPassword,
role:"doctor"
});

const doctor = await Doctor.create({
name,
specialization,
hospital,
user:user._id,
createdBy:req.user._id
});

res.status(201).json({
success:true,
message:"Doctor created successfully",
doctor,
login:{
email,
password
}
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};


/* ================= DOCTOR DASHBOARD ================= */

export const doctorDashboard = async (req,res)=>{
try{

const doctor = await Doctor.findOne({
user:req.user._id
})

if(!doctor){
return res.status(404).json({
success:false,
message:"Doctor not found"
})
}

const today = new Date()
today.setHours(0,0,0,0)

const todayVisits = await Visit.countDocuments({
doctor:doctor._id,
createdAt:{ $gte: today }
})

const totalVisits = await Visit.countDocuments({
doctor:doctor._id
})

const recentVisits = await Visit.find({
doctor: doctor._id
})
.populate({
path:"mr",
select:"employeeCode"
})
.populate({
path:"productsDiscussed.product",
select:"name"
})
.sort({visitDate:-1})
.limit(5)

res.json({
success:true,
dashboard:{
doctorName:doctor.name,
specialization:doctor.specialization,
hospital:doctor.hospital,
todayVisits,
totalVisits,
recentVisits
}
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= DOCTOR PROFILE ================= */

export const getDoctorProfile = async(req,res)=>{
try{

let doctor = await Doctor.findOne({
user:req.user._id
})
.populate("user","name email")
.populate("mr","employeeCode")

/* fallback */
if(!doctor){
doctor = await Doctor.findOne({
createdBy:req.user._id
})
.populate("user","name email")
.populate("mr","employeeCode")
}

if(!doctor){
return res.status(404).json({
success:false,
message:"Doctor not found"
})
}

res.json({
success:true,
doctor
})

}catch(error){

console.error("Doctor Profile Error:",error)

res.status(500).json({
success:false,
message:error.message
})
}
}

/* ================= DOCTOR VISITS ================= */

export const getDoctorVisits = async(req,res)=>{
try{

let doctor = await Doctor.findOne({
user:req.user._id
})

/* fallback */
if(!doctor){
doctor = await Doctor.findOne({
createdBy:req.user._id
})
}

if(!doctor){
return res.status(404).json({
success:false,
message:"Doctor not found"
})
}

const visits = await Visit.find({
doctor:doctor._id
})
.populate({
path:"mr",
select:"employeeCode"
})
.populate({
path:"productsDiscussed.product",
select:"name"
})
.sort({visitDate:-1})

res.json({
success:true,
visits
})

}catch(error){

console.error("Doctor Visits Error:",error)

res.status(500).json({
success:false,
message:error.message
})
}
}

/* ================= GET ALL DOCTORS ================= */

export const getDoctors = async (req, res) => {
try{

const doctors = await Doctor.find({
createdBy:req.user._id
})
.populate("createdBy","name email")

res.json({
success:true,
doctors
})

}catch(error){
res.status(500).json({
success:false,
message:error.message
})
}
}


/* ================= GET SINGLE DOCTOR ================= */

export const getDoctorById = async (req, res) => {
try{

const doctor = await Doctor.findById(req.params.id)

if(!doctor){
return res.status(404).json({
success:false,
message:"Doctor not found"
})
}

res.json({
success:true,
doctor
})

}catch(error){
res.status(500).json({
success:false,
message:error.message
})
}
}


/* ================= UPDATE DOCTOR ================= */

export const updateDoctor = async (req,res)=>{
try{

const doctor = await Doctor.findByIdAndUpdate(
req.params.id,
req.body,
{ new:true }
)

res.json({
success:true,
doctor
})

}catch(error){
res.status(500).json({
success:false,
message:error.message
})
}
}


/* ================= DELETE DOCTOR ================= */

export const deleteDoctor = async(req,res)=>{
try{

await Doctor.findByIdAndDelete(req.params.id)

res.json({
success:true,
message:"Doctor deleted"
})

}catch(error){
res.status(500).json({
success:false,
message:error.message
})
}
}