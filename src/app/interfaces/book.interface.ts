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