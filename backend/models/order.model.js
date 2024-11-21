import mongoose, { Schema } from 'mongoose';


const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
      require: true
    },
    city: {
      type: String,
      require: true
    },
    state: {
      type: String,
      require: true
    },
    country: {
      type: String,
      require: true
    },
    pinCode: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true
    }
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentInfo: {
    id: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    }
  },
  paidAt: {
    type: Date,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  taxPrice: {
    type: Number,
    required: true
  },
  shippingPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    required: true,
    enum: ['processing', 'delivered', 'cancelled'],
    lowercase: true,
    trim: true,
    default: 'processing'
  },
  deliveredAt: {
    type: Date,
    default: null,
    require: true
  }
}, { timestamps: true });


export const Order = mongoose.model('Order', orderSchema)