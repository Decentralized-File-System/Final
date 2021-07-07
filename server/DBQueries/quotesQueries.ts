import { Sequelize, sequelize } from "../models";
// @ts-ignore
import { Quote } from "../models";

export const getRandomQuote = async (quoteId: number) => {
  try {
    const quote = await Quote.findOne({
      where: { id: quoteId },
    });
    return quote.dataValues;
  } catch (error) {
    throw new Error(error);
  }
};
