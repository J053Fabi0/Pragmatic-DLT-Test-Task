import {
  List,
  Avatar,
  ListItem,
  Breadcrumb,
  BreadcrumbItem,
} from "flowbite-react";
import moment from "moment";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import numberWithCommas from "../utils/numberWithCommas";
import { TransactionsContext } from "../context/contexts";

export default function TransactionDetail() {
  const { id } = useParams();
  const transactions = useContext(TransactionsContext);
  const transaction = transactions.find((transaction) => transaction.id === id);

  if (transaction === undefined) {
    return (
      <>
        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
          Transaction not found
        </div>
        <Link to="/transactions" className="text-blue-500">
          Go back
        </Link>
      </>
    );
  }

  const date = moment(transaction.date).isSame(moment(), "week")
    ? moment(transaction.date).format("dddd, HH:mm")
    : moment(transaction.date).format("DD/MM/YYYY, HH:mm");

  const name = transaction.name === null ? "Payment" : transaction.name;

  return (
    <div className="flex flex-col items-center gap-4">
      <Breadcrumb className="mb-4 w-full">
        <BreadcrumbItem>
          <Link to="/">Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to="/transactions">Transactions</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>{name}</BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col items-center gap-4">
        <p className="text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          {transaction.type === "payment" ? "+" : ""}
          {numberWithCommas(transaction.amount)}
        </p>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-400">
          {transaction.name === null ? "Payment" : transaction.name}
        </p>
      </div>

      <List
        unstyled
        className="w-full divide-y divide-gray-200 rounded-lg bg-white px-5 dark:divide-gray-700 dark:bg-gray-800"
      >
        <ListItem className="pt-3 pb-3">
          <div className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
            <Avatar size="md" img={transaction.image} alt={name} />
            {
              <div className="min-w-0 flex-1">
                <div className="flex justify-between">
                  <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
                    {transaction.anotherPerson ?? "By you"}
                  </p>
                </div>
              </div>
            }
          </div>
        </ListItem>
        <ListItem className="pt-3 pb-3">
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            {date}
          </p>
        </ListItem>
        <ListItem className="pt-3 pb-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {transaction.description}
          </p>
        </ListItem>
      </List>
    </div>
  );
}
