import { Component, inject } from '@angular/core';
import { ExpenseService } from '../../Services/expense.service';
import { ExpenseItemComponent } from '../expense-item/expense-item.component';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [ExpenseItemComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss',
})
export class ExpenseListComponent {
  private expenseService = inject(ExpenseService);
  expenses = this.expenseService.expenses;
}
