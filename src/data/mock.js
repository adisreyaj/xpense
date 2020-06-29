import { SCREENS } from '../config/screens';

export const transactionsItems = [
  {
    title: 'Paid for trip to office',
    category: 'Transport',
    icon: 'car',
    color: 'blue',
    amount: '200',
    type: 'debit',
  },
  {
    title: 'Birthday party',
    category: 'Food',
    icon: 'food',
    color: 'green',
    amount: '350',
    type: 'debit',
  },
  {
    title: 'Salary for Month June',
    category: 'salary',
    icon: 'cash',
    color: 'orange',
    amount: '35,000',
    type: 'credit',
  },
  {
    title: 'Groceries for Month June',
    category: 'shopping',
    icon: 'shopping',
    color: 'pink',
    amount: '120',
    type: 'debit',
  },
  {
    title: 'Purchase iPhone X Max Pro',
    category: 'shopping',
    icon: 'cart',
    color: 'red',
    amount: '1999',
    type: 'debit',
  },
];

export const quickAccess = [
  {
    title: 'Transactions',
    color: '#19D093',
    route: SCREENS.transactions,
  },
  {
    title: 'Budget',
    color: '#FF594B',
    route: SCREENS.transactions,
  },
  {
    title: 'Accounts',
    color: '#EBAC48',
    route: SCREENS.transactions,
  },
  {
    title: 'Payments',
    color: '#2F26DB',
    route: SCREENS.transactions,
  },
];

export const categories = [
  {
    title: 'Transport',
    subtitle: '26 Jun $50',
    icon: 'car',
  },
  {
    title: 'Food',
    subtitle: '26 Jun $50',
    icon: 'food',
  },
  {
    title: 'Shopping',
    subtitle: '26 Jun $50',
    icon: 'cart',
  },
];

export const profileSettings = [
  {
    title: 'Income',
    subtitle: 'Manage your budgets',
    icon: 'account-balance-wallet',
  },
  {
    title: 'Notifications',
    subtitle: 'Manage your alerts',
    icon: 'notifications',
  },
  {
    title: 'General',
    subtitle: 'Configure app',
    icon: 'settings',
  },
  {
    title: 'About',
    subtitle: 'About Xpense',
    icon: 'info',
  },
];
