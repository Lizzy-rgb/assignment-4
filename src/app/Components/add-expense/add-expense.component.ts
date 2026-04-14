import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../Services/expense.service';
import { ExpenseCategory } from '../../Models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  private expenseService = inject(ExpenseService);

  title = '';
  amount = 0;
  category: ExpenseCategory = 'Food';

  readonly categories: ExpenseCategory[] = [
    'Work',
    'Personal',
    'Grocery',
    'Utilities',
    'Shopping',
    'Travel',
    'Food',
  ];

  onSubmit(): void {
    if (!this.title.trim() || this.amount <= 0) return;
    this.expenseService.addExpense({
      title: this.title.trim(),
      amount: this.amount,
      category: this.category,
    });
    this.title = '';
    this.amount = 0;
    this.category = 'Food';
  }
}
