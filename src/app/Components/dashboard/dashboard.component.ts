import { Component, computed, inject } from '@angular/core';
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

  expenses = this.expenseService.expenses;

  totalAmount = computed(() =>
    this.expenses().reduce((sum, e) => sum + e.amount, 0)
  );

  count = computed(() => this.expenses().length);

  highestExpense = computed(() => {
    const list = this.expenses();
    if (!list.length) return null;
    return list.reduce((max, e) => (e.amount > max.amount ? e : max), list[0]);
  });

  averageExpense = computed(() =>
    this.count() > 0 ? this.totalAmount() / this.count() : 0
  );
}
