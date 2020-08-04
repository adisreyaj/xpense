import React from 'react';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('expenses');

const setupExpensesTable = () => {
  return new Promise((resolve, reject) => {
    const successCb = (_, success) => {
      resolve(success);
    };
    const errorCb = ({ _, err }) => {
      reject(err);
    };
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS expenses (
         id TEXT PRIMARY KEY NOT NULL,
         title TEXT NOT NULL, description TEXT,
         amount REAL NOT NULL,
         date INTEGER NOT NULL,
         type TEXT NOT NULL 
         )`,
        [],
        successCb,
        errorCb
      );
    });
  });
};

const getExpenses = () => {
  return new Promise((resolve, reject) => {
    const successCb = (_, { rows: { _array } }) => {
      resolve(_array);
    };
    const errorCb = ({ _, err }) => {
      reject(err);
    };
    const txnErrorCb = (error) => {
      reject(error);
    };
    db.transaction((tx) => {
      tx.executeSql(`SELECT * FROM expenses`, [], successCb, errorCb);
    }, txnErrorCb);
  });
};

const addExpense = ({ id, title, amount, description, date, type }) => {
  return new Promise((resolve, reject) => {
    const successCb = (_, { rows: { _array } }) => {
      resolve(_array);
    };
    const errorCb = ({ _, err }) => {
      reject(err);
    };
    const txnErrorCb = (error) => {
      reject(error);
    };
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO expenses (id, title, amount, description, date, type) VALUES (?,?,?,?,?,?)`,
        [id, title, amount, description, date, type],
        successCb,
        errorCb
      );
    }, txnErrorCb);
  });
};

export const expenseService = {
  setupExpensesTable,
  getExpenses,
  addExpense,
};
