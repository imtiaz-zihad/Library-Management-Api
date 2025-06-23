"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRoutes = express_1.default.Router();
// Get All Books
exports.bookRoutes.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        // Apply filter if present
        const query = {};
        if (filter) {
            query.genre = { $regex: new RegExp(filter, "i") };
        }
        let bookQuery = book_model_1.Book.find(query);
        // Sorting
        if (sortBy && sort) {
            bookQuery = bookQuery.sort({
                [sortBy]: sort === "asc" ? 1 : -1,
            });
        }
        // Limit
        if (limit) {
            bookQuery = bookQuery.limit(parseInt(limit));
        }
        const books = yield bookQuery;
        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            books,
        });
    }
    catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch books",
        });
    }
}));
// Get a Book by ID
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully!",
            data: book,
        });
    }
    catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error: error instanceof Error ? error.message : error,
        });
    }
}));
// Post A Book
exports.bookRoutes.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookDeatails = req.body;
    try {
        const book = yield book_model_1.Book.create(bookDeatails);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            book,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}));
exports.bookRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updatedBookDeatils = req.body;
        const book = yield book_model_1.Book.findByIdAndUpdate({ _id: id }, updatedBookDeatils, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Books Updated successfully!",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update books",
            error,
        });
    }
}));
exports.bookRoutes.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findByIdAndDelete({ _id: id });
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Books Deleted successfully!",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete books",
            error,
        });
    }
}));
