// src/app/app-routing.module.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent)
  },
  { 
    path: 'inventory',
    loadComponent: () => import('./components/inventory/inventory-list/inventory-list.component')
      .then(m => m.InventoryListComponent)
  },
  { 
    path: 'inventory/:id',
    loadComponent: () => import('./components/inventory/inventory-detail/inventory-detail.component')
      .then(m => m.InventoryDetailComponent)
  }
];