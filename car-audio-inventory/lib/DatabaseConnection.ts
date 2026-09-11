
export interface InventoryItem {
  id: string;
  componentType: string;
  specs: string;
}

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  public readonly connectionId: string;
  private inventoryCache: InventoryItem[] = [];

  private constructor() {
    this.connectionId = `db_${Math.random().toString(36).slice(2, 10)}`;
    this.inventoryCache = [
      { id: '1', componentType: 'Subwoofer', specs: 'Kicker Hideaway 10" Compact Active Subwoofer, 150W RMS' },
      { id: '2', componentType: 'HeadUnit', specs: '1-DIN Retractable Screen Head Unit, 7-inch display' }
    ];
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getCache(): InventoryItem[] { return this.inventoryCache; }
  
  public setCache(data: InventoryItem): void {
    this.inventoryCache.push(data); 
  }
}