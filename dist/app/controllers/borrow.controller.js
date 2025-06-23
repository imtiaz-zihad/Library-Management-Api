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
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRoutes = express_1.default.Router();
// Borrow a Book
exports.borrowRoutes.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        console.log("Borrow request received:", req.body);
        const data = yield book_model_1.Book.findOne({ _id: book });
        if (!data) {
            res.status(404).json({
                success: false,
                message: "Book not found",
            });
        }
        else if (!data.available) {
            res.status(400).json({
                success: false,
                message: "Book is not available for borrowing",
            });
        }
        else {
            data.borrowQuantity(quantity);
            yield data.save();
            const borrow = yield borrow_model_1.Borrow.create({
                book: data._id,
                quantity,
                dueDate,
            });
            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: borrow,
            });
        }
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
                message: error.message || "Something went wrong",
                error,
            });
        }
    }
}));
// Return a Book
exports.borrowRoutes.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            books,
        });
    }
    catch (error) {
        console.error("Error returning book:", error);
        res.status(500).json({
            success: false,
            message: "Failed to return book",
            error: error.message || "Something went wrong",
        });
    }
}));
