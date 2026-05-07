import React, { useEffect, useState } from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getTransactions, updateTransaction } from '../services/api'; // Added updateTransaction import
const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null); // New: Tracks what we are editing
  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);
  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateTransaction(id, updatedData);
      setEditingTransaction(null); 
      fetchTransactions(); 
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };
  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t._id !== id));
  };
  return (
    <div className="container">
      <BalanceDisplay transactions={transactions} />
      <TransactionForm 
        onUpdate={fetchTransactions} 
        editingTransaction={editingTransaction}
        onSaveEdit={handleSaveEdit}
        onCancel={() => setEditingTransaction(null)}
      />
      <TransactionList 
        transactions={transactions} 
        onUpdate={fetchTransactions} 
        onEditClick={(transaction) => setEditingTransaction(transaction)}
        onDelete={handleDelete}
      />
    </div>
  );
};
export default Dashboard;