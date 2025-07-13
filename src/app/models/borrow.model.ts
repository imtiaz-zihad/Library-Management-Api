import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Borrowed book ID is required"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1, got{VALUE}"],
        validate: {
            validator: Number.isInteger
        }
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: function (value: Date) {
                return value > new Date();
            },
            message: "Due date must be a future date",
        },
    }
}, {
    timestamps: true,
    versionKey: false
});

export const Borrow = model<IBorrow>("Borrow", borrowSchema);