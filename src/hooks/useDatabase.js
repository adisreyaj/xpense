import { useState, useEffect } from 'react';
import { expenseService } from '../services/expenses.service';

export const useDatabase = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const loadExpenseDatabase = async () => {
      try {
        await expenseService.setupExpensesTable();
        setIsLoaded(true);
        setIsError(false);
      } catch (error) {
        setIsLoaded(false);
        setIsError(true);
      }
    };
    loadExpenseDatabase();
  }, []);

  return [isLoaded, isError];
};
