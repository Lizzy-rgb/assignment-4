import { Injectable, signal, computed } from '@angular/core';
import { Expense, ExpenseCategory } from '../Models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  // ── State ────────────────────────────────────────────────────────────────

  private _expenses = signal<Expense[]>([
    { id: '1', title: 'Office Supplies', amount: 45.99, category: 'Work' },
    { id: '2', title: 'Weekly Groceries', amount: 132.5, category: 'Grocery' },
    { id: '3', title: 'Flight to NYC', amount: 580.0, category: 'Travel' },
    { id: '4', title: 'Netflix Subscription', amount: 15.99, category: 'Utilities' },
    { id: '5', title: 'Dinner Out', amount: 67.25, category: 'Food' },
    { id: '6', title: 'New Shoes', amount: 89.99, category: 'Shopping' },
  ]);

  readonly expenses = this._expenses.asReadonly();

  readonly categories = signal<ExpenseCategory[]>([
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food',
  ]);

  // ── Computed signals ─────────────────────────────────────────────────────

  readonly transactionCount = computed(() => this._expenses().length);

  readonly totalExpense = computed(() =>
    this._expenses().reduce((sum, e) => sum + e.amount, 0)
  );

  readonly highestExpense = computed(() => {
    const list = this._expenses();
    if (!list.length) return null;
    return list.reduce((max, e) => (e.amount > max.amount ? e : max), list[0]);
  });

  readonly averageExpense = computed(() =>
    this.transactionCount() > 0 ? this.totalExpense() / this.transactionCount() : 0
  );

  // ── Methods ───────────────────────────────────────────────────────────────

  addExpense(data: Omit<Expense, 'id'>): void {
    const newExpense: Expense = { ...data, id: crypto.randomUUID() };
    this._expenses.update((list) => [...list, newExpense]);
  }

  deleteExpense(id: string): void {
    this._expenses.update((list) => list.filter((e) => e.id !== id));
  }

  editExpense(updated: Expense): void {
    this._expenses.update((list) =>
      list.map((e) => (e.id === updated.id ? updated : e))
    );
  }

  getExpenseById(id: string): Expense | undefined {
    return this._expenses().find((e) => e.id === id);
  }
}
