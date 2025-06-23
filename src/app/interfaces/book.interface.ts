import { Model } from "mongoose";

export interface  IBook {
    title: string;
    author: string;
    genre: string;
    description: string;
    isbn: string;
    copies: number;
    available: boolean;
}

export interface bookMethod extends Model<IBook> {
    borrowQuantity(quantity: number): void;
}


export type BookModel = Model<IBook, {}, bookMethod>;