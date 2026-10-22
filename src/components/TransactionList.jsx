
function TransactionList({
  transactions,
  filter,
  onFilterChange,
  onDeleteTransaction,
}) {
  const filteredTransactions = transactions.filter((transaction) => {
    if (filter === "all") return true;
    return transaction.type === filter;
  });

  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <section className="panel transactions-panel">
      <div className="transactions-heading">
        <div>
          <h2>Transaction History</h2>
          <p className="panel-description">
            Review your income and spending.
          </p>
        </div>

        <select
          className="filter-select"
          aria-label="Filter transactions"
          value={filter}
          onChange={(event) => onFilterChange(event.target.value)}
        >
          <option value="all">All Transactions</option>
          <option value="income">Income Only</option>
          <option value="expense">Expenses Only</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">₹</div>
          <h3>No transactions found</h3>
          <p>Add a transaction to see it listed here.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {filteredTransactions.map((transaction) => (
            <div className="transaction-item" key={transaction.id}>
              <div className="transaction-symbol">
                {transaction.type === "income" ? "↗" : "↘"}
              </div>

              <div className="transaction-info">
                <h3>{transaction.title}</h3>
                <p>
                  {transaction.category} · {transaction.date}
                </p>
              </div>

              <div className="transaction-right">
                <span
                  className={
                    transaction.type === "income"
                      ? "transaction-amount income-text"
                      : "transaction-amount expense-text"
                  }
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatMoney(transaction.amount)}
                </span>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() =>
                    onDeleteTransaction(transaction.id)
                  }
                  aria-label={`Delete ${transaction.title}`}
                  title="Delete transaction"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default TransactionList;
