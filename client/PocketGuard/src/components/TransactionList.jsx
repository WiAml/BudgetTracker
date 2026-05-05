import React from 'react';
import TransactionItem from './TransactionItem';
const TransactionList = ({ transactions, onUpdate }) => { 
  return (
    <div className="card">
      <h2>History</h2>
      <ul className="list">
        {transactions.map((transaction) => (
          <TransactionItem 
            key={transaction._id} 
            transaction={transaction} 
            onUpdate={onUpdate} 
          />
        ))}
      </ul>
    </div>
  );
};
export default TransactionList;