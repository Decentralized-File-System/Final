import { Sequelize, sequelize } from "../models";
// @ts-ignore
import { Quote } from "../models";

export const getRandomQuote = async (quoteId: number) => {
  const quote = await Quote.findOne({
    where: { id: quoteId },
  });
  return quote.dataValues;
};
