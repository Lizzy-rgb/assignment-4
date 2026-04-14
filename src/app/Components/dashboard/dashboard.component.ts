import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private expenseService = inject(ExpenseService);

  // Expose the service's computed signals directly to the template
  totalAmount = this.expenseService.totalExpense;
  count = this.expenseService.transactionCount;
  highestExpense = this.expenseService.highestExpense;
  averageExpense = this.expenseService.averageExpense;
}
