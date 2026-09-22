import { AudioComponentType } from "../lib/AudioComponentFactory";
import { InventoryItem, InventoryModel } from "../models/InventoryModel";

const supportedComponentTypes: readonly AudioComponentType[] = [
  "subwoofer",
  "equalizer",
  "headunit",
  "amplifier",
  "speakers",
  "tweeters",
  "dsp",
  "wiringkit",
  "capacitor",
];

function isAudioComponentType(type: string): type is AudioComponentType {
  return supportedComponentTypes.includes(type as AudioComponentType);
}

export const InventoryController = {
  getInventory(): InventoryItem[] {
    return InventoryModel.findAll();
  },

  removeComponent(id: string): void {
    if (!InventoryModel.remove(id)) {
      throw new Error("Component not found");
    }
  },

  addComponent(type: string): InventoryItem {
    if (!isAudioComponentType(type)) {
      throw new Error(`Unsupported component type: ${type}`);
    }

    return InventoryModel.create(type);
  },
};