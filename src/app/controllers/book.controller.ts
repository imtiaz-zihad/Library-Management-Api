import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();
// Get All Books
bookRoutes.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    // Apply filter if present
    const query: any = {};
    if (filter) {
      query.genre = { $regex: new RegExp(filter as string, "i") };
    }

    let bookQuery = Book.find(query);

    // Sorting
    if (sortBy && sort) {
      bookQuery = bookQuery.sort({
        [sortBy as string]: sort === "asc" ? 1 : -1,
      });
    }

    // Limit
    if (limit) {
      bookQuery = bookQuery.limit(parseInt(limit as string));
    }

    const books = await bookQuery;

    res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch books",
    });
  }
});

// Get a Book by ID

bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findById(id);

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully!",
      data: book,
    });
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Post A Book
bookRoutes.post("/books", async (req: Request, res: Response) => {
  const bookDeatails = req.body;
  try {
    const book = await Book.create(bookDeatails);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

bookRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const updatedBookDeatils = req.body;
    const book = await Book.findByIdAndUpdate({ _id: id }, updatedBookDeatils, {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update books",
      error,
    });
  }
});

bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const id = req.params.bookId;
    const book = await Book.findByIdAndDelete({ _id: id });
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete books",
      error,
    });
  }
});
