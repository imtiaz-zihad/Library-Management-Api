import { Model, model, Schema } from "mongoose";
import { BookModel, booksMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookModel, booksMethods>({
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

bookSchema.method("borrowQuantity", function (quantity: number) {
    if (this.copies < quantity) {
        throw new Error("Not enough copies available");
    }
    this.copies -= quantity;
    if (this.copies === 0) {
        this.available = false;
    }
})

export const Book = model<IBook, BookModel, booksMethods>("Book", bookSchema);