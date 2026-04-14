import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private expenseService = inject(ExpenseService);

  totalExpense = this.expenseService.totalExpense;
  transactionCount = this.expenseService.transactionCount;
  highestExpense = this.expenseService.highestExpense;
  averageExpense = this.expenseService.averageExpense;
}
