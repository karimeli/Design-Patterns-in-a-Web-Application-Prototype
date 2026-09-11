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

  addComponent(type: string): InventoryItem {
    if (!isAudioComponentType(type)) {
      throw new Error(`Unsupported component type: ${type}`);
    }

    return InventoryModel.create(type);
  },
};