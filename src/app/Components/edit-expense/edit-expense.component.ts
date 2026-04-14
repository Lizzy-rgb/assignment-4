import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Expense, ExpenseCategory } from '../../Models/expense.model';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss',
})
export class EditExpenseComponent implements OnInit {
  @Input({ required: true }) expense!: Expense;
  @Output() saved = new EventEmitter<Expense>();
  @Output() cancelled = new EventEmitter<void>();

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

  ngOnInit(): void {
    this.title = this.expense.title;
    this.amount = this.expense.amount;
    this.category = this.expense.category;
  }

  onSave(): void {
    if (!this.title.trim() || this.amount <= 0) return;
    this.saved.emit({
      id: this.expense.id,
      title: this.title.trim(),
      amount: this.amount,
      category: this.category,
    });
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
