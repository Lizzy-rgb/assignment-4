import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../Services/expense.service';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [ExpenseItemComponent, RouterLink, CurrencyPipe],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent {
  private expenseService = inject(ExpenseService);

  // Signal: reactive list — updates automatically when expenses change
  expenses = this.expenseService.expenses;

  // Computed signals exposed for the summary row
  totalExpense = this.expenseService.totalExpense;
  transactionCount = this.expenseService.transactionCount;
}
