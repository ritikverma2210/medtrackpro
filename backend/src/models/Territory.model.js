import mongoose from "mongoose";

const territorySchema = new mongoose.Schema(
{
name:{
type:String,
required:true,
trim:true
},

region:{
type:String,
required:true,
trim:true
},

assignedMR:{
type:mongoose.Schema.Types.ObjectId,
ref:"MR"
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

/* Unique per admin */

territorySchema.index(
{ name:1 , createdBy:1 },
{ unique:true }
)

const Territory = mongoose.model("Territory",territorySchema);

export default Territory;