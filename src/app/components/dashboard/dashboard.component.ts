import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InventoryService } from '../../services/inventory.service';
import { Inventory, InventoryAlert } from '../../models/inventory.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTableModule
  ]
})
export class DashboardComponent implements OnInit {
  totalItems: number = 0;
  lowStockItems: number = 0;
  outOfStockItems: number = 0;
  recentAlerts: InventoryAlert[] = [];
  inventoryData: Inventory[] = [];
  
  displayedColumns: string[] = ['name', 'type', 'quantity', 'status'];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Load inventory data
    this.inventoryService.getAllInventory().subscribe(data => {
      this.inventoryData = data;
      this.calculateSummary(data);
    });

    // Load alerts
    this.inventoryService.getAlerts().subscribe(alerts => {
      this.recentAlerts = alerts.slice(0, 5); // Show only 5 recent alerts
    });
  }

  calculateSummary(data: Inventory[]): void {
    this.totalItems = data.length;
    this.lowStockItems = data.filter(item => item.status === 'LOW_STOCK').length;
    this.outOfStockItems = data.filter(item => item.status === 'OUT_OF_STOCK').length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'AVAILABLE': return 'available';
      case 'LOW_STOCK': return 'low-stock';
      case 'OUT_OF_STOCK': return 'out-of-stock';
      default: return '';
    }
  }

  getAlertIcon(type: string): string {
    switch (type) {
      case 'LOW_STOCK': return 'warning';
      case 'OUT_OF_STOCK': return 'error';
      case 'MAINTENANCE_NEEDED': return 'build';
      default: return 'info';
    }
  }

  getAlertColor(type: string): string {
    switch (type) {
      case 'LOW_STOCK': return '#ff8c00';
      case 'OUT_OF_STOCK': return '#ff0000';
      case 'MAINTENANCE_NEEDED': return '#0000ff';
      default: return '#000000';
    }
  }
}