"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
app.use("/api", book_controller_1.bookRoutes);
app.use("/api", borrow_controller_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to the Library Management System!");
});
exports.default = app;
