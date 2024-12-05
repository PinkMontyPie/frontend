// src/app/components/inventory/inventory-detail/inventory-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { InventoryService } from '../../../services/inventory.service';
import { Inventory } from '../../../models/inventory.model';

@Component({
  selector: 'app-inventory-detail',
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    RouterModule
  ]
})
export class InventoryDetailComponent implements OnInit {
  inventory: Inventory | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInventoryDetails(id);
    }
  }

  loadInventoryDetails(id: string): void {
    this.inventoryService.getInventoryById(id).subscribe(item => {
      this.inventory = item;
    });
  }

  onEdit(): void {
    if (this.inventory) {
      this.router.navigate(['/inventory', this.inventory.id, 'edit']);
    }
  }

  goBack(): void {
    this.router.navigate(['/inventory']);
  }
}