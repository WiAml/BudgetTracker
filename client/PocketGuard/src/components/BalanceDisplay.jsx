import React from 'react';

const BalanceDisplay = ({ transactions }) => {
  const total = transactions.reduce((acc, curr) =>{
    return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
  }, 0);
  return (
    <div className="balance-card">
      <h2>Total Balance</h2>
      <h1 className={total >= 0 ? 'pos' : 'neg'}>
        {total < 0 ? '-' : ''}${Math.abs(total).toFixed(2)}
      </h1>
    </div>
  );
};
export default BalanceDisplay;