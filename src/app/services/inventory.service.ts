import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Inventory, InventoryAlert } from '../models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'http://localhost:3000/api';

  // Mock data
  private mockInventory: Inventory[] = [
    {
      id: '1',
      name: 'Toyota Fortuner',
      type: 'VEHICLE',
      quantity: 5,
      availableQuantity: 3,
      status: 'AVAILABLE',
      location: 'Bangkok',
      minimumQuantity: 2,
      lastRestocked: new Date(),
      lastChecked: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor(private http: HttpClient) {}

  getAllInventory(): Observable<Inventory[]> {
    return of(this.mockInventory);
  }

  getInventoryById(id: string): Observable<Inventory> {
    const item = this.mockInventory.find(i => i.id === id);
    return of(item!);
  }

  // เพิ่ม method สำหรับการสร้างรายการใหม่
  createInventory(data: Partial<Inventory>): Observable<Inventory> {
    // Simulate creating new inventory
    const newItem: Inventory = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastRestocked: new Date(),
      lastChecked: new Date()
    } as Inventory;
    
    this.mockInventory.push(newItem);
    return of(newItem);
  }

  // เพิ่ม method สำหรับการอัพเดทรายการ
  updateInventory(id: string, data: Partial<Inventory>): Observable<Inventory> {
    // Simulate updating inventory
    const index = this.mockInventory.findIndex(item => item.id === id);
    if (index > -1) {
      this.mockInventory[index] = {
        ...this.mockInventory[index],
        ...data,
        updatedAt: new Date()
      };
      return of(this.mockInventory[index]);
    }
    throw new Error('Item not found');
  }

  getAlerts(): Observable<InventoryAlert[]> {
    return of([]);
  }

  // เพิ่ม method สำหรับการลบรายการ
  deleteInventory(id: string): Observable<void> {
    const index = this.mockInventory.findIndex(item => item.id === id);
    if (index > -1) {
      this.mockInventory.splice(index, 1);
    }
    return of(void 0);
  }
}