import React, { useState, useEffect } from 'react';

const TransactionForm = ({ onUpdate, editingTransaction, onSaveEdit, onCancel }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('income');
  // FIX: This line was likely missing!
  const [description, setDescription] = useState(''); 

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setCategory(editingTransaction.category);
      setDescription(editingTransaction.description || ''); // Handle empty descriptions
    } else {
      setAmount('');
      setCategory('income');
      setDescription('');
    }
  }, [editingTransaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { amount, category, description };

    if (editingTransaction) {
      onSaveEdit(editingTransaction._id, data);
    } else {
      // Your existing logic to add a new transaction
      // e.g., addTransaction(data).then(() => onUpdate());
      console.log("Adding new:", data);
      onUpdate(); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{editingTransaction ? "Edit Transaction" : "Add New Transaction"}</h3>
      
      <input 
        type="number" 
        placeholder="Amount" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        required 
      />
      
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="income">Income</option>
        <option value="food">Food</option>
        <option value="pleasure">Pleasure</option>
        <option value="bills">Bills</option>
        <option value="misc">Misc</option>
      </select>

      {/* This input was crashing because 'description' wasn't defined above */}
      <input 
        type="text" 
        placeholder="Description (Optional)" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />

      <button type="submit">
        {editingTransaction ? "Save Changes" : "Add Transaction"}
      </button>
      
      {editingTransaction && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TransactionForm;