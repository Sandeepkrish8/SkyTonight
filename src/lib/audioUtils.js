class AudioEngine {
  constructor() {
    this.audioCtx = null;
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playChime() {
    this.init();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    
    // Create oscillator
    const osc = this.audioCtx.createOscillator();
    const gainNode = this.audioCtx.createGain();
    
    osc.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    // Soft sine wave
    osc.type = 'sine';
    
    // Frequency envelope (subtle pitch drop)
    osc.frequency.setValueAtTime(880, t); // A5
    osc.frequency.exponentialRampToValueAtTime(440, t + 0.3); // A4
    
    // Volume envelope (quick attack, slow release)
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.2, t + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    
    osc.start(t);
    osc.stop(t + 1.2);
  }

  playWhoosh() {
    this.init();
    if (!this.audioCtx) return;

    const t = this.audioCtx.currentTime;
    const bufferSize = this.audioCtx.sampleRate * 1; // 1 second buffer
    const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // White noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = this.audioCtx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = this.audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    
    const gainNode = this.audioCtx.createGain();
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.audioCtx.destination);
    
    // Filter sweep
    filter.frequency.setValueAtTime(100, t);
    filter.frequency.exponentialRampToValueAtTime(2000, t + 0.2);
    filter.frequency.exponentialRampToValueAtTime(100, t + 0.8);
    
    // Volume envelope
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.1, t + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    
    noiseSource.start(t);
  }
}

export const audio = new AudioEngine();
