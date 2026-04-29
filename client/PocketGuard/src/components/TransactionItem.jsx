import React from 'react';
import { deleteTransaction } from '../services/api';
const TransactionItem = ({ transaction, onUpdate }) => {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to remove this transaction?")) {
      try {
        await deleteTransaction(transaction._id);
        onUpdate(); 
      } catch (err) {
        console.error("Failed to delete the transaction:", err);
        alert("Error deleting transaction. Please try again.");
      }
    }
  };
return (
    <div className="list-item">
      <div className="item-info">
        <strong>{transaction.description || transaction.category}</strong>
        <small>{transaction.category}</small>
      </div>
      
      <div className="item-right">
        <span className={transaction.type === 'income' ? 'pos' : 'neg'}>
          {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
        </span>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};
export default TransactionItem;