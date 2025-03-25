import moment from "moment";
import type Transaction from "../types/transaction.type";

export default function getTransactionDescription(
  transaction: Transaction,
): [string, string] {
  const description: [string, string] = ["", ""];

  const date = moment(transaction.date).isSame(moment(), "week")
    ? moment(transaction.date).format("dddd")
    : moment(transaction.date).format("DD/MM/YYYY");

  if (transaction.pending) description[0] += `Pending - `;

  description[0] += transaction.description;

  if (transaction.anotherPerson)
    description[1] += `${transaction.anotherPerson} - `;
  description[1] += date;

  return description;
}
