"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./app/controllers/book.controller");
const borrow_controller_1 = require("./app/controllers/borrow.controller");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://frontend-liberary.vercel.app"],
    credentials: true,
}));
app.use("/api", book_controller_1.bookRouter);
app.use("/api", borrow_controller_1.borrowRoute);
app.get("/", (req, res) => {
    res.send("Library Management System API is running successfully!");
});
exports.default = app;
