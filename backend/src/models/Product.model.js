import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
name:{
type:String,
required:true,
trim:true
},

brand:{
type:String,
required:true,
trim:true
},

category:{
type:String,
trim:true
},

composition:{
type:String,
trim:true
},

description:{
type:String,
trim:true
},

price:{
type:Number
},

isActive:{
type:Boolean,
default:true
},

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

/* Unique per Admin */

productSchema.index(
{ name:1 , createdBy:1 },
{ unique:true }
)

export default mongoose.model("Product",productSchema);