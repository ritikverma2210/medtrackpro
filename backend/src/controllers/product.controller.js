import Product from "../models/Product.model.js"
import MR from "../models/MR.model.js";

/* ================= CREATE PRODUCT ================= */

export const createProduct = async (req,res)=>{
try{

const product = await Product.create({
  ...req.body,
  createdBy:req.user._id
})

res.status(201).json({
  success:true,
  product
})

}catch(error){

console.error("CREATE PRODUCT ERROR:",error)

res.status(500).json({
  success:false,
  message:error.message
})

}
}


/* ================= GET PRODUCTS ================= */

export const getProducts = async (req, res) => {
  try {

    let filter = {}

    if (req.user.role === "mr") {

      const mr = await MR.findOne({ user: req.user._id })

      if (!mr) {
        return res.status(404).json({
          success: false,
          message: "MR not found"
        })
      }

      filter.createdBy = mr.createdBy

    } else {
      filter.createdBy = req.user._id
    }

    const products = await Product.find(filter)

    res.json({
      success: true,
      count: products.length,
      products
    })

  } catch (error) {

    console.error("GET PRODUCTS ERROR:", error)

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}


/* ================= UPDATE PRODUCT ================= */

export const updateProduct = async (req,res)=>{
try{

const product = await Product.findOneAndUpdate(
{
  _id:req.params.id,
  createdBy:req.user._id
},
req.body,
{ new:true }
)

if(!product){
return res.status(404).json({
  success:false,
  message:"Product not found"
})
}

res.json({
  success:true,
  product
})

}catch(error){

console.error("UPDATE PRODUCT ERROR:",error)

res.status(500).json({
  success:false,
  message:error.message
})

}
}


/* ================= DELETE PRODUCT ================= */

export const deleteProduct = async (req,res)=>{
try{

const product = await Product.findOneAndDelete({
  _id:req.params.id,
  createdBy:req.user._id
})

if(!product){
return res.status(404).json({
  success:false,
  message:"Product not found"
})
}

res.json({
  success:true,
  message:"Product deleted"
})

}catch(error){

console.error("DELETE PRODUCT ERROR:",error)

res.status(500).json({
  success:false,
  message:error.message
})

}
}