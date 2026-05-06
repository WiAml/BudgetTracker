import React, { useEffect, useState } from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import { getTransactions } from '../services/api';

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

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

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t._id !== id));
  };

  return (
    <div className="container">
      <BalanceDisplay transactions={transactions} />
      <TransactionForm onUpdate={fetchTransactions} />
      <TransactionList 
        transactions={transactions} 
        onUpdate={fetchTransactions} 
      />
    </div>
  );
};
export default Dashboard;