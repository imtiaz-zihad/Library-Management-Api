"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true
    },
    genre: {
        type: String,
        enum: {
            values: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
            message: '{VALUE} is not supported'
        },
        required: [true, "Genre is required"],
        trim: true,
        uppercase: true
    },
    isbn: {
        type: String,
        unique: true,
        required: [true, "ISBN is required"]
    },
    description: String,
    copies: {
        type: Number,
        required: [true, 'Total number of copies is required, got {VALUE}'],
        min: [0, 'Copies cannot be negative']
    },
    available: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});
bookSchema.method("borrowQuantity", function (quantity) {
    if (this.copies < quantity) {
        throw new Error("Not enough copies available");
    }
    this.copies -= quantity;
    if (this.copies === 0) {
        this.available = false;
    }
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
