import mongoose from "mongoose";

const mrSchema = new mongoose.Schema(
{
user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
},

employeeCode:{
type:String,
required:true,
unique:true,
trim:true
},

territory:{
type:mongoose.Schema.Types.ObjectId,
ref:"Territory"
},

/* Assigned Doctors */

doctors:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"Doctor"
}
],

/* Admin Isolation */

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true,
index:true
}

},
{
timestamps:true
}
);

const MR = mongoose.model("MR",mrSchema);

export default MR;