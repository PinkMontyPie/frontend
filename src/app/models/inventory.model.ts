export interface Inventory {
    id: string;
    name: string;
    type: 'VEHICLE' | 'EQUIPMENT' | 'ACCOMMODATION';
    quantity: number;
    availableQuantity: number;
    status: 'AVAILABLE' | 'LOW_STOCK' | 'OUT_OF_STOCK';
    location: string;
    description?: string;
    minimumQuantity: number;
    lastRestocked: Date;
    lastChecked: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface InventoryAlert {
    id: string;
    inventoryId: string;
    type: 'LOW_STOCK' | 'OUT_OF_STOCK' | 'MAINTENANCE_NEEDED';
    message: string;
    isRead: boolean;
    createdAt: Date;
  }
  
  export interface InventoryHistory {
    id: string;
    inventoryId: string;
    action: 'CHECK_IN' | 'CHECK_OUT' | 'RESTOCK' | 'MAINTENANCE';
    quantity: number;
    notes?: string;
    performedBy: string;
    performedAt: Date;
  }