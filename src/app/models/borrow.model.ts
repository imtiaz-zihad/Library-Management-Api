import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";


const borrowSchema =new Schema<IBorrow>({
    book: {
        type:  Schema.Types.ObjectId, 
        ref: "Book",
        required: [true, "Book ID is required for borrowing"],
    },
    quantity:{
        type: Number,
        required: [true, "Quantity is required for borrowing"],
        min: [1, "Quantity must be at least 1"],
        validate:{
            validator:Number.isInteger,
            message: "Quantity must be an integer",
        }
    },
    dueDate:{
        type: Date,
        required: [true, "Due date is required for borrowing"],
        validate: {
            validator: function(value: Date) {
                return value > new Date(); 
            },
            message: "Due date must be in the future",
        }
    }
},{
    timestamps: true,
    versionKey: false,
})

export const Borrow = model<IBorrow>("Borrow", borrowSchema);