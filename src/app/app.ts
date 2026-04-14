import { Component } from '@angular/core';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddExpenseComponent } from './Components/add-expense/add-expense.component';
import { ExpenseListComponent } from './Components/expense-list/expense-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DashboardComponent, AddExpenseComponent, ExpenseListComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
