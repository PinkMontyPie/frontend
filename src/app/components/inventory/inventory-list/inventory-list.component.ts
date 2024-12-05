import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { InventoryService } from '../../../services/inventory.service';
import { Inventory } from '../../../models/inventory.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class InventoryListComponent implements OnInit {
  inventoryData: Inventory[] = [];
  displayedColumns: string[] = ['name', 'type', 'quantity', 'availableQuantity', 'status', 'location', 'actions'];
  
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  loadInventory(): void {
    this.inventoryService.getAllInventory().subscribe(data => {
      this.inventoryData = data;
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'AVAILABLE': return 'status-available';
      case 'LOW_STOCK': return 'status-low';
      case 'OUT_OF_STOCK': return 'status-out';
      default: return '';
    }
  }
}