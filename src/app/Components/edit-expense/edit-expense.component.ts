import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ExpenseService } from '../../Services/expense.service';
import { Expense, ExpenseCategory } from '../../Models/expense.model';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss',
})
export class EditExpenseComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private expenseService = inject(ExpenseService);

  // Signal holding the original expense (null until loaded, false if not found)
  expense = signal<Expense | null>(null);
  notFound = false;

  // Two-way bound form fields — populated in ngOnInit from the loaded expense
  title = '';
  amount = 0;
  category: ExpenseCategory = 'Food';

  // Categories from the service signal — used to build the <select> options
  readonly categories = this.expenseService.categories;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const found = id ? this.expenseService.getExpenseById(id) : undefined;

    if (found) {
      this.expense.set(found);
      // Pre-populate form fields via two-way binding
      this.title = found.title;
      this.amount = found.amount;
      this.category = found.category;
    } else {
      this.notFound = true;
    }
  }

  onSave(): void {
    const original = this.expense();
    if (!original || !this.title.trim() || this.amount <= 0) return;

    this.expenseService.editExpense({
      id: original.id,
      title: this.title.trim(),
      amount: this.amount,
      category: this.category,
    });

    this.router.navigate(['/expenses']);
  }

  onCancel(): void {
    this.router.navigate(['/expenses']);
  }
}
