import Territory from "../models/Territory.model.js"

/* ================= CREATE ================= */

export const createTerritory = async (req,res)=>{
try{

const { name , region } = req.body

if(!name || !region){
return res.status(400).json({
success:false,
message:"Name and region required"
})
}

/* Check per admin */

const exists = await Territory.findOne({
name,
createdBy:req.user._id
})

if(exists){
return res.status(400).json({
success:false,
message:"Territory already exists"
})
}

const territory = await Territory.create({
name,
region,
createdBy:req.user._id
})

res.status(201).json({
success:true,
territory
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= GET ALL ================= */

export const getTerritories = async (req,res)=>{
try{

const territories = await Territory.find({
createdBy:req.user._id
})
.populate("assignedMR")

res.json({
success:true,
territories
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= DELETE ================= */

export const deleteTerritory = async (req,res)=>{
try{

const territory = await Territory.findOne({
_id:req.params.id,
createdBy:req.user._id
})

if(!territory){
return res.status(404).json({
success:false,
message:"Territory not found"
})
}

await territory.deleteOne()

res.json({
success:true,
message:"Territory deleted"
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}