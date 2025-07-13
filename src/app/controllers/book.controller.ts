import express, { Request, Response } from 'express';
import { Book } from '../models/book.model';
export const bookRouter = express.Router();

// GET All Books
bookRouter.get("/books", async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = "createdAt", limit = "10" } = req.query;
        const sortDirection = req.query.sort as any === "asc" ? 1 : -1;
        let query: any = {}
        if (filter) {
            query.genre = filter
        }
        const books = await Book.find(query).sort({ [sortBy as string]: sortDirection }).limit(limit as any)
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully!",
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
});

// Get Book by ID
bookRouter.get("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;
        const book = await Book.findById(id)
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully!",
            data: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error,
        });
    }
});

// Create Book
bookRouter.post("/books", async (req: Request, res: Response) => {
    try {
        const bookInfo = req.body;
        const book = await Book.create(bookInfo);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error,
            });
        }
    }
});

// Update Book
bookRouter.put("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;
        const updatedBookInfo = req.body;
        const book = await Book.findOneAndUpdate(
            { _id: id },
            updatedBookInfo,
            { new: true, runValidators: true }
        );
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
    } catch (error: any) {
        if (error.name === "ValidationError") {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                error,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error,
            });
        }
    }
});

// Delete Book
bookRouter.delete("/books/:bookId", async (req: Request, res: Response) => {
    try {
        const id = req.params.bookId;
        const book = await Book.findOneAndDelete({ _id: id });

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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
});