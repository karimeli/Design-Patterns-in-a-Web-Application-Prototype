import { DatabaseConnection } from "../lib/DatabaseConnection";
import { AudioComponentFactory, AudioComponentType } from "../lib/AudioComponentFactory";

export interface InventoryItem {
  id: string;
  componentType: string;
  specs: string;
}

export const InventoryModel = {
  findAll(): InventoryItem[] {
    const db = DatabaseConnection.getInstance();
    return db.getCache();
  },

  remove(id: string): boolean {
    const db = DatabaseConnection.getInstance();
    return db.removeFromCache(id);
  },
  
  create(type: AudioComponentType): InventoryItem {
    const db = DatabaseConnection.getInstance();
    const component = AudioComponentFactory.create(type);
    
    const newItem = {
      id: Math.random().toString(36).substring(7),
      componentType: component.type,
      specs: component.getSpecs(),
    };
    
    db.setCache(newItem);
    return newItem;
  }
};