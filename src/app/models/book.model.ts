import { bookMethod, BookModel } from './../interfaces/book.interface';
import { Model, model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookModel, bookMethod>({
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
},{
    timestamps: true,
    versionKey: false,
});

bookSchema.method("borrowQuantity", function (quantity: number) {
    if (this.copies < quantity) {
        throw new Error("Copies Not Available");
    }
    this.copies -= quantity;
    if (this.copies === 0) {
        this.available = false;
    }
})

export const Book = model<IBook, BookModel, bookMethod>("Book", bookSchema);
