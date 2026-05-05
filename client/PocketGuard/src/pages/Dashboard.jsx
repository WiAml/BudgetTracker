import React, { useState } from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
const Dashboard = () => {
  const [transactions, setTransactions] = useState([])
  const handleUpdate = () => {
    console.log("Data update requested");
  };
  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t._id !== id));
  };
  return (
    <div className="container">
      <BalanceDisplay transactions={transactions} />
      <TransactionForm onUpdate={handleUpdate} />
      <TransactionList 
        transactions={transactions} 
        onDelete={handleDelete} 
      />
    </div>
  );
};
export default Dashboard;