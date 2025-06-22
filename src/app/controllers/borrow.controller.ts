import express, { Request, Response } from 'express';

export const borrowRoutes = express.Router();

borrowRoutes.post("/borrow", (req: Request, res: Response) => {
  // Handle borrowing a book
  res.send("Book borrowed successfully");
});
