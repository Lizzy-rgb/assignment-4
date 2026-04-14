import { Component, Input, signal, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Expense, ExpenseCategory } from '../../Models/expense.model';
import { ExpenseService } from '../../Services/expense.service';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Work: '#4a90e2',
  Personal: '#9b59b6',
  Grocery: '#27ae60',
  Utilities: '#e67e22',
  Shopping: '#e91e8c',
  Travel: '#16a085',
  Food: '#e74c3c',
};

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [CurrencyPipe, EditExpenseComponent],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss',
})
export class ExpenseItemComponent {
  @Input({ required: true }) expense!: Expense;

  private expenseService = inject(ExpenseService);

  isEditing = signal(false);

  get categoryColor(): string {
    return CATEGORY_COLORS[this.expense.category];
  }

  get isHighExpense(): boolean {
    return this.expense.amount > 200;
  }

  onDelete(): void {
    this.expenseService.deleteExpense(this.expense.id);
  }

  onEdit(): void {
    this.isEditing.set(true);
  }

  onSaved(updated: Expense): void {
    this.expenseService.updateExpense(updated);
    this.isEditing.set(false);
  }

  onCancelled(): void {
    this.isEditing.set(false);
  }
}
