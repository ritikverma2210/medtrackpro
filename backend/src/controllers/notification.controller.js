import Notification from "../models/Notification.model.js"


/* ================= GET NOTIFICATIONS ================= */

export const getNotifications = async(req,res)=>{
try{

const notifications = await Notification.find({
user:req.user._id
})
.sort({ createdAt:-1 })

res.json({
success:true,
notifications
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}


/* ================= MARK AS READ ================= */

export const markAsRead = async(req,res)=>{
try{

await Notification.findByIdAndUpdate(
req.params.id,
{ read:true }
)

res.json({
success:true
})

}catch(error){

console.error(error)

res.status(500).json({
success:false,
message:error.message
})

}
}