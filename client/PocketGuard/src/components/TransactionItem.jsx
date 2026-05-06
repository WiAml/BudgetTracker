import React from 'react';
import { deleteTransaction } from '../services/api';
const TransactionItem = ({ transaction, onUpdate }) => {
  const handleDelete = async () => {
    console.log("Deleting ID:", transaction._id);
    if (window.confirm("Are you sure you want to remove this transaction?")) {
      try {
        await deleteTransaction(transaction._id);
        onUpdate(); 
      } catch (err) {
        console.error("Failed to delete the transaction:", err);
        alert("Note: Backend not connected. Item will remain until database is live.");
      }
    }
  };
  const isIncome = transaction.type === 'income';
  return (
    <div className="list-item">
      <div className="item-info">
        <strong>{transaction.text || transaction.description || "Transaction"}</strong>
        <br />
        <small>{transaction.category || "General"}</small>
      </div>
      <div className="item-right">
        <span className={isIncome ? 'pos' : 'neg'}>
          {isIncome ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </span>
        <button onClick={handleDelete} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};
export default TransactionItem;