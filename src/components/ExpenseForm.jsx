
import { useState } from "react";

function ExpenseForm({ onAddTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a transaction title.");
      return;
    }

    if (amount.trim() === "" || !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0) {
      alert("Please enter an amount greater than zero.");
      return;
    }

    onAddTransaction({
      id: crypto.randomUUID(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().slice(0, 10),
    });

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  }

  return (
    <section className="panel">
      <h2>Add Transaction</h2>
      <p className="panel-description">
        Enter your income or expense details below.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Transaction Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g. Monthly salary"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={80}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="amount">Amount (₹)</label>
            <input
              id="amount"
              type="number"
              placeholder="e.g. 30000"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Transaction Type</label>
            <select
              id="type"
              value={type}
              onChange={(event) => {
                const nextType = event.target.value;
                setType(nextType);
                setCategory(nextType === "income" ? "Salary" : "Food");
              }}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {type === "income" ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>
        </div>

        <button className="primary-button" type="submit">
          + Add Transaction
        </button>
      </form>
    </section>
  );
}

export default ExpenseForm;
