import mongoose from "mongoose";

const dcrSchema = new mongoose.Schema(
{
mr:{
type:mongoose.Schema.Types.ObjectId,
ref:"MR",
required:true
},

date:{
type:Date,
required:true
},

visits:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"Visit"
}
],

totalVisits:{
type:Number,
default:0
},

summaryNotes:{
type:String
},

status:{
type:String,
enum:["draft","submitted","approved","rejected"],
default:"draft"
},

submittedAt:Date,

approvedAt:Date,

approvedBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

rejectionReason:String,

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


/* Unique DCR per MR per day per company */

dcrSchema.index(
{
mr:1,
date:1,
createdBy:1
},
{
unique:true
}
)

export default mongoose.model("DCR",dcrSchema);