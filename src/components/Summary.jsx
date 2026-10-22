
function Summary({ income, expenses, balance }) {
  const formatMoney = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <section className="summary-grid">
      <div className="summary-card income-card">
        <span className="summary-label">Total Income</span>
        <h2>{formatMoney(income)}</h2>
        <span className="summary-icon">↗</span>
      </div>

      <div className="summary-card expense-card">
        <span className="summary-label">Total Expenses</span>
        <h2>{formatMoney(expenses)}</h2>
        <span className="summary-icon">↘</span>
      </div>

      <div className="summary-card balance-card">
        <span className="summary-label">Available Balance</span>
        <h2>{formatMoney(balance)}</h2>
        <span className="summary-icon">₹</span>
      </div>
    </section>
  );
}

export default Summary;
