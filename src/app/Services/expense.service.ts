import { Injectable, signal } from '@angular/core';
import { Expense } from '../Models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private _expenses = signal<Expense[]>([
    { id: '1', title: 'Office Supplies', amount: 45.99, category: 'Work' },
    { id: '2', title: 'Weekly Groceries', amount: 132.5, category: 'Grocery' },
    { id: '3', title: 'Flight to NYC', amount: 580.0, category: 'Travel' },
    { id: '4', title: 'Netflix Subscription', amount: 15.99, category: 'Utilities' },
    { id: '5', title: 'Dinner Out', amount: 67.25, category: 'Food' },
    { id: '6', title: 'New Shoes', amount: 89.99, category: 'Shopping' },
  ]);

  readonly expenses = this._expenses.asReadonly();

  addExpense(data: Omit<Expense, 'id'>): void {
    const newExpense: Expense = { ...data, id: crypto.randomUUID() };
    this._expenses.update((list) => [...list, newExpense]);
  }

  deleteExpense(id: string): void {
    this._expenses.update((list) => list.filter((e) => e.id !== id));
  }

  updateExpense(updated: Expense): void {
    this._expenses.update((list) =>
      list.map((e) => (e.id === updated.id ? updated : e))
    );
  }
}
