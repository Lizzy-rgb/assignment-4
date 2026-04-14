import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../Services/expense.service';
import { ExpenseCategory } from '../../Models/expense.model';

@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent {
  private expenseService = inject(ExpenseService);
  private router = inject(Router);

  // Two-way bound form fields
  title = '';
  amount = 0;
  category: ExpenseCategory = 'Food';

  // Categories from the service signal
  readonly categories = this.expenseService.categories;

  onSubmit(): void {
    if (!this.title.trim() || this.amount <= 0) return;
    this.expenseService.addExpense({
      title: this.title.trim(),
      amount: this.amount,
      category: this.category,
    });
    this.router.navigate(['/expenses']);
  }
}
