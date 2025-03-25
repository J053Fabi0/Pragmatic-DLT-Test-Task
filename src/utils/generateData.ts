import _ from "lodash";
import moment from "moment";
import { faker } from "@faker-js/faker";
import Transaction, { type TransactionBase } from "../types/transaction.type";

export default function generateTransactions(howMany: number): Transaction[] {
  const transactions: Transaction[] = [];

  const startingDate = moment(faker.date.recent());

  for (let i = 0; i < howMany; i++) {
    const payment = faker.datatype.boolean();
    const anotherPerson = faker.person.fullName();

    const transactionBase: TransactionBase = {
      description: faker.lorem.sentence(),
      amount: faker.number.int({ min: 1, max: 1000 }),
      date: startingDate.toDate(),
      pending: faker.datatype.boolean(),
      image: faker.image.avatar(),
      anotherPerson: faker.datatype.boolean() ? anotherPerson : null,
    };

    if (payment)
      transactions.push({
        ...transactionBase,
        type: "payment",
        name: null,
      });
    else
      transactions.push({
        ...transactionBase,
        type: "credit",
        name: faker.company.name(),
      });

    startingDate.subtract(_.random(1, 10, true), "days");
  }

  return transactions;
}
