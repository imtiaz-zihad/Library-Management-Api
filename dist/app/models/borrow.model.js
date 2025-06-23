"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Borrow = void 0;
const mongoose_1 = require("mongoose");
const borrowSchema = new mongoose_1.Schema({
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book ID is required for borrowing"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required for borrowing"],
        min: [1, "Quantity must be at least 1"],
        validate: {
            validator: Number.isInteger,
            message: "Quantity must be an integer",
        }
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required for borrowing"],
        validate: {
            validator: function (value) {
                return value > new Date();
            },
            message: "Due date must be in the future",
        }
    }
}, {
    timestamps: true,
    versionKey: false,
});
exports.Borrow = (0, mongoose_1.model)("Borrow", borrowSchema);
