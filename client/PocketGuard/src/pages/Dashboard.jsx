import React from 'react';
import BalanceDisplay from '../components/BalanceDisplay';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
const Dashboard = ({ transactions, onUpdate }) => (
  <div className="container">
    <BalanceDisplay transactions={transactions} />
    <TransactionForm onUpdate={onUpdate} />
    <TransactionList transactions={transactions} onUpdate={onUpdate} />
  </div>
);
export default Dashboard;