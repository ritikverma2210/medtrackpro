import mongoose from "mongoose";
import Product from "./Product.model.js";

const visitSchema = new mongoose.Schema(
  {
    mr: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MR",
      required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    territory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Territory"
    },

    visitDate: {
      type: Date,
      default: Date.now
    },

    /* ⭐ Pharma Industry Standard Structure */
    productsDiscussed: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        sampleQty: {
          type: Number,
          default: 0
        }
      }
    ],

    notes: {
      type: String
    },

   gpsTrack: [
  {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }
],

  },
  { timestamps: true }
);

const Visit = mongoose.model("Visit", visitSchema);

export default Visit;
