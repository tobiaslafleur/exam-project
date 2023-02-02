import express, { Request, Response } from "express";

const server = express();
const port: number = 3001;

server.get("/hello", (req: Request, res: Response) => {
  res.json({ message: "hello" });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
