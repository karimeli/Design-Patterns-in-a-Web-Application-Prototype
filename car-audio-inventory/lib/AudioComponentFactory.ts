// Location: lib/AudioComponentFactory.ts
// Pattern: Factory (Lines 22-30)
export interface AudioComponent {
  type: string;
  getSpecs(): string;
}

export type AudioComponentType =
  | 'subwoofer'
  | 'equalizer'
  | 'headunit'
  | 'amplifier'
  | 'speakers'
  | 'tweeters'
  | 'dsp'
  | 'wiringkit'
  | 'capacitor';

class Subwoofer implements AudioComponent {
  type = 'Subwoofer';
  getSpecs() { return "Compact Active Subwoofer, ideal for V-shaped audio profiles"; }
}

class Equalizer implements AudioComponent {
  type = 'Equalizer';
  getSpecs() { return "Graphic Equalizer, multi-band frequency adjustment"; }
}

class HeadUnit implements AudioComponent {
  type = 'HeadUnit';
  getSpecs() { return "1-DIN Retractable Screen Head Unit"; }
}

class Amplifier implements AudioComponent {
  type = 'Amplifier';
  getSpecs() { return "4-Channel Class D Amplifier, 800W Peak Power"; }
}

class Speakers implements AudioComponent {
  type = 'Speakers';
  getSpecs() { return "6.5-inch Component Speaker Set, 120W Peak Power"; }
}

class Tweeters implements AudioComponent {
  type = 'Tweeters';
  getSpecs() { return "Silk Dome Tweeter Pair, 100W Peak Power"; }
}

class DSP implements AudioComponent {
  type = 'DSP';
  getSpecs() { return "8-Channel Digital Signal Processor with Bluetooth Tuning"; }
}

class WiringKit implements AudioComponent {
  type = 'WiringKit';
  getSpecs() { return "4-Gauge Amplifier Wiring Kit with 100A Fuse"; }
}

class Capacitor implements AudioComponent {
  type = 'Capacitor';
  getSpecs() { return "1 Farad Digital Power Capacitor, 20V Maximum"; }
}

export class AudioComponentFactory {
  static create(type: AudioComponentType): AudioComponent {
    switch (type) {
      case 'subwoofer': return new Subwoofer();
      case 'equalizer': return new Equalizer();
      case 'headunit':  return new HeadUnit();
      case 'amplifier': return new Amplifier();
      case 'speakers': return new Speakers();
      case 'tweeters': return new Tweeters();
      case 'dsp': return new DSP();
      case 'wiringkit': return new WiringKit();
      case 'capacitor': return new Capacitor();
      default: throw new Error(`Unsupported component type: ${type}`);
    }
  }
}