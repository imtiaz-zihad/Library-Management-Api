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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouter = express_1.default.Router();
// GET All Books
exports.bookRouter.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", limit = "10" } = req.query;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;
        let query = {};
        if (filter) {
            query.genre = filter;
        }
        const books = yield book_model_1.Book.find(query).sort({ [sortBy]: sortDirection }).limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully!",
            data: books,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
}));
// Get Book by ID
exports.bookRouter.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findById(id);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully!",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
}));
// Create Book
exports.bookRouter.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookInfo = req.body;
        const book = yield book_model_1.Book.create(bookInfo);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error,
            });
        }
    }
}));
// Update Book
exports.bookRouter.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const updatedBookInfo = req.body;
        const book = yield book_model_1.Book.findOneAndUpdate({ _id: id }, updatedBookInfo, { new: true, runValidators: true });
        if (!book) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book,
        });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error,
            });
        }
    }
}));
// Delete Book
exports.bookRouter.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.bookId;
        const book = yield book_model_1.Book.findOneAndDelete({ _id: id });
        // if (!book) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Book not found",
        //         data: null,
        //     });
        // }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
}));
