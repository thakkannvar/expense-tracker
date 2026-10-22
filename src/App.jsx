
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Summary from "./components/Summary";
import ExpenseForm from "./components/ExpenseForm";
import TransactionList from "./components/TransactionList";

import "./App.css";

const STORAGE_KEY = "expense-tracker-transactions";

function loadTransactions() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      if (
        Array.isArray(parsedData) &&
        parsedData.every(
          (item) =>
            item &&
            typeof item.id === "string" &&
            typeof item.title === "string" &&
            Number.isFinite(item.amount) &&
            item.amount > 0 &&
            ["income", "expense"].includes(item.type) &&
            typeof item.category === "string" &&
            typeof item.date === "string"
        )
      ) {
        return parsedData;
      }
    }
  } catch (error) {
    console.error("Error loading transactions:", error);
  }

  return [];
}

function App() {
  // Store all transactions
  const [transactions, setTransactions] =
    useState(loadTransactions);

  // Store the selected filter
  const [filter, setFilter] = useState("all");

  // Save transactions whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
      );
    } catch (error) {
      console.error("Error saving transactions:", error);
    }
  }, [transactions]);

  // Calculate total income
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  // Calculate total expenses
  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  // Calculate remaining balance
  const balance = income - expenses;

  // Add a new transaction
  function addTransaction(transaction) {
    setTransactions((previousTransactions) => [
      transaction,
      ...previousTransactions,
    ]);
  }

  // Delete a transaction by ID
  function deleteTransaction(id) {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  }

  return (
    <div className="app-container">
      <Header />

      <main>
        <section className="welcome-section">
          <div>
            <p className="eyebrow">
              YOUR FINANCIAL OVERVIEW
            </p>

            <h2>Welcome back!</h2>

            <p>
              Track your money and stay in control.
            </p>
          </div>

          <div className="date-badge">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </section>

        <Summary
          income={income}
          expenses={expenses}
          balance={balance}
        />

        <div className="content-grid">
          <ExpenseForm
            onAddTransaction={addTransaction}
          />

          <TransactionList
            transactions={transactions}
            filter={filter}
            onFilterChange={setFilter}
            onDeleteTransaction={deleteTransaction}
          />
        </div>
      </main>

      <footer className="app-footer">
        Built with React.js | Expense Tracker
      </footer>
    </div>
  );
}

export default App;
