import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AddExpenseComponent } from './Components/add-expense/add-expense.component';
import { ExpenseListComponent } from './Components/expense-list/expense-list.component';
import { EditExpenseComponent } from './Components/edit-expense/edit-expense.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'add', component: AddExpenseComponent },
  { path: 'expenses', component: ExpenseListComponent },
  { path: 'edit/:id', component: EditExpenseComponent },
  { path: '**', redirectTo: '' },
];
