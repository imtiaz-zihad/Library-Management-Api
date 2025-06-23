import { Types } from "mongoose";

export interface IBorrow {
  book: string | Types.ObjectId; // Book ID can be a string or ObjectId
  quantity: number;
  dueDate: Date;
}
