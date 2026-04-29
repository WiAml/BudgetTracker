import React from 'react';
import { deleteTransaction } from '../services/api';
const TransactionList = ({ transactions, onUpdate }) => (
  <div className="card">
    <h3>History</h3>
    {transactions.map(t => (
      <div key={t._id} className="list-item">
        <span>{t.category}: <b className={t.type}>${t.amount}</b></span>
        <button onClick={async () => { await deleteTransaction(t._id); onUpdate(); }}>Delete</button>
      </div>
    ))}
  </div>
);
export default TransactionList;