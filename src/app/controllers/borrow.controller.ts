import express, { Request, Response } from "express";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";
import { title } from "process";

export const borrowRoutes = express.Router();

// Borrow a Book
borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    console.log("Borrow request received:", req.body);

    const data = await Book.findOne({ _id: book });
    if (!data) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    } else if (!data.available) {
      res.status(400).json({
        success: false,
        message: "Book is not available for borrowing",
      });
    } else {
      data.borrowQuantity(quantity);
      await data.save();
      const borrow = await Borrow.create({
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
        message: error.message || "Something went wrong",
        error,
      });
    }
  }
});

// Return a Book
borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const books = await Borrow.aggregate([
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
  } catch (error: any) {
    console.error("Error returning book:", error);
    res.status(500).json({
      success: false,
      message: "Failed to return book",
      error: error.message || "Something went wrong",
    });
  }
});
