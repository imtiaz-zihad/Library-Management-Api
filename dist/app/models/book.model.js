"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Give a title for the book"],
        trim: true,
        //unique: [true, "Title must be unique"],
    },
    author: {
        type: String,
        required: [true, "Give an author for the book"],
        trim: true,
    },
    genre: {
        type: String,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "FANTASY",
            "BIOGRAPHY",
        ],
        required: [true, "Give a genre for the book"],
        trim: true,
        upperCase: true,
    },
    isbn: {
        type: String,
        required: [true, "Give an ISBN for the book"],
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Give the number of copies for the book"],
        min: [1, "Number of copies must be at least 1"],
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.method("borrowQuantity", function (quantity) {
    if (this.copies < quantity) {
        throw new Error("Copies Not Available");
    }
    this.copies -= quantity;
    if (this.copies === 0) {
        this.available = false;
    }
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
