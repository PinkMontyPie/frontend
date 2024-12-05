import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class InventoryFormComponent implements OnInit {
  inventoryForm: FormGroup;
  isEditMode = false;
  itemId: string | null = null;

  typeOptions = ['VEHICLE', 'EQUIPMENT', 'ACCOMMODATION'];
  statusOptions = ['AVAILABLE', 'LOW_STOCK', 'OUT_OF_STOCK'];

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      availableQuantity: [0, [Validators.required, Validators.min(0)]],
      status: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: [''],
      minimumQuantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
    if (this.itemId) {
      this.isEditMode = true;
      this.loadInventoryItem(this.itemId);
    }
  }

  loadInventoryItem(id: string): void {
    this.inventoryService.getInventoryById(id).subscribe(item => {
      this.inventoryForm.patchValue(item);
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const formData = this.inventoryForm.value;
      if (this.isEditMode && this.itemId) {
        // Update existing item
        this.inventoryService.updateInventory(this.itemId, formData).subscribe(() => {
          this.router.navigate(['/inventory']);
        });
      } else {
        // Create new item
        this.inventoryService.createInventory(formData).subscribe(() => {
          this.router.navigate(['/inventory']);
        });
      }
    }
  }

  onCancel(): void {
    this.router.navigate(['/inventory']);
  }
}