
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
      { id: '2', componentType: 'HeadUnit', specs: '1-DIN Retractable Screen Head Unit, 7-inch display' },
      { id: '3', componentType: 'Amplifier', specs: '4-Channel Class D Amplifier, 800W Peak Power' },
      { id: '4', componentType: 'Speakers', specs: '6.5-inch Component Speaker Set, 120W Peak Power' },
      { id: '5', componentType: 'Tweeters', specs: 'Silk Dome Tweeter Pair, 100W Peak Power' },
      { id: '6', componentType: 'DSP', specs: '8-Channel Digital Signal Processor with Bluetooth Tuning' },
      { id: '7', componentType: 'WiringKit', specs: '4-Gauge Amplifier Wiring Kit with 100A Fuse' },
      { id: '8', componentType: 'Capacitor', specs: '1 Farad Digital Power Capacitor, 20V Maximum' }
    ];
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public getCache(): InventoryItem[] { return this.inventoryCache; }

  public removeFromCache(id: string): boolean {
    const itemIndex = this.inventoryCache.findIndex((item) => item.id === id);
    if (itemIndex === -1) return false;

    this.inventoryCache.splice(itemIndex, 1);
    return true;
  }
  
  public setCache(data: InventoryItem): void {
    this.inventoryCache.push(data); 
  }
}