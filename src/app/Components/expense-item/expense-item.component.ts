import { Component, Input, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Expense, ExpenseCategory } from '../../Models/expense.model';
import { ExpenseService } from '../../Services/expense.service';
import { CATEGORY_COLORS } from '../../utils/category-colors';

@Component({
  selector: 'app-expense-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './expense-item.component.html',
  styleUrl: './expense-item.component.scss',
})
export class ExpenseItemComponent {
  // Input binding: parent (ExpenseList) passes each expense down
  @Input({ required: true }) expense!: Expense;

  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  get categoryColor(): string {
    return CATEGORY_COLORS[this.expense.category];
  }

  /** True when the expense amount exceeds $200 — drives class/style bindings */
  get isHighExpense(): boolean {
    return this.expense.amount > 200;
  }

  onDelete(): void {
    this.expenseService.deleteExpense(this.expense.id);
  }

  onEdit(): void {
    this.router.navigate(['/edit', this.expense.id]);
  }
}
