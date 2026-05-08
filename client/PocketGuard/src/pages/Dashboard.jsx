import React, { useEffect, useState } from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getTransactions, createTransaction, updateTransaction } from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
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
  const handleAddTransaction = async (data) => {
    try {
      await createTransaction(data);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to create transaction:", error);
    }
  };
  const handleSaveEdit = async (id, updatedData) => {
    try {
      await updateTransaction(id, updatedData);
      setEditingTransaction(null);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to update transaction:", error);
    }
  };
  const handleDelete = () => {
    fetchTransactions();
  };
  return (
    <div className="container">
      <BalanceDisplay transactions={transactions} />
      <TransactionForm 
        onUpdate={handleAddTransaction}
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