import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onUpdate, editingTransaction, onSaveEdit, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('food');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type || 'expense');
      setCategory(editingTransaction.category || 'misc');
      setDescription(editingTransaction.description || '');
    } else {
      setAmount('');
      setType('expense');
      setCategory('food');
      setDescription('');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { 
      amount: parseFloat(amount), 
      type, 
      category, 
      description 
    };

    if (editingTransaction) {
      onSaveEdit(editingTransaction._id, data);
    } else {
      onUpdate(data); 
      setAmount('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{editingTransaction ? "Edit Transaction" : "Add New Transaction"}</h3>
      
      <div className="form-group">
        <label>Amount</label>
        <input 
          type="number" 
          placeholder="0.00" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Transaction Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="food">Food</option>
          <option value="bills">Bills</option>
          <option value="fun">Fun/Pleasure</option>
          <option value="misc">Misc</option>
          <option value="check">Check</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description (Optional)</label>
        <input 
          type="text" 
          placeholder="e.g. Weekly Groceries" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>

      <div className="button-group">
        <button type="submit" className="btn-primary">
          {editingTransaction ? "Save Changes" : "Add Transaction"}
        </button>
        
        {editingTransaction && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;