import { getRandomQuote } from "../DBQueries/quotesQueries";
import { query, Request, Response } from "express";

export const get_random_quote = async (req: Request, res: Response) => {
  try {
    const quoteId = Number(req.query.id);
    const quote = await getRandomQuote(quoteId);
    return res.status(201).json({ text: quote.text, author: quote.author });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Failed to get quotes" });
  }
};
