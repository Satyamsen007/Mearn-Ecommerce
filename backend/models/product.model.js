import mongoose, { Schema } from "mongoose";

// Create a Product Model

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    maxLength: 8,
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      productId: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    maxLength: 4,
    default: 1
  },
  reviews: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: String,
        required: true
      },
      comment: {
        type: String
      }
    }
  ],
  numOfReviews: {
    type: Number,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

export const Product = mongoose.model('Product', productSchema)