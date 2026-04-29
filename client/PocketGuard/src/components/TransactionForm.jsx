import React, { useState } from 'react';
import { createTransaction } from '../services/api';
const TransactionForm = ({ onUpdate }) => {
const [form, setForm] = useState({ amount: '', type: 'income', category: 'food', description: '' });
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.amount) return alert("Enter an amount");
    await createTransaction(form);
    onUpdate();
    setForm({ amount: '', type: 'income', category: 'food', description: '' });
};
return (
    <div className="card">
      <h3>New Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={form.amount} 
          onChange={(e) => setForm({...form, amount: parseFloat(e.target.value)})} />
        <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
export default TransactionForm;