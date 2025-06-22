import express ,{Application, Request, Response} from 'express';
import { bookRoutes } from './app/controllers/book.controller';
import { borrowRoutes } from './app/controllers/borrow.controller';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());


app.use("/api", bookRoutes);
app.use("/api", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Library Management System!");
});

export default app;