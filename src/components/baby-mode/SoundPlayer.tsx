// src/components/baby-mode/SoundPlayer.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Cloud, Waves, Music, Activity } from 'lucide-react';

const SOUNDS = [
  { id: 'rain', label: 'Yomg\'ir', icon: Cloud },
  { id: 'ocean', label: 'Dengiz', icon: Waves },
  { id: 'lullaby', label: 'Alla', icon: Music },
  { id: 'white', label: 'Oq shovqin', icon: Activity },
] as const;

type SoundId = typeof SOUNDS[number]['id'];

export function SoundPlayer() {
  const [active, setActive] = useState<SoundId | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{
    gain?: GainNode;
    noise?: AudioBufferSourceNode;
    osc?: OscillatorNode;
    melody?: number;
  } | null>(null);

  const stopSound = () => {
    if (nodesRef.current) {
      try {
        nodesRef.current.osc?.stop();
        nodesRef.current.noise?.stop();
        if (nodesRef.current.melody) clearInterval(nodesRef.current.melody);
      } catch {}
      nodesRef.current.gain?.disconnect();
      nodesRef.current = null;
    }
  };

  useEffect(() => () => stopSound(), []);

  const playSound = (kind: SoundId) => {
    stopSound();

    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = ctxRef.current!;
    if (ctx.state === 'suspended') ctx.resume();

    const gain = ctx.createGain();
    gain.gain.value = 0.06;
    gain.connect(ctx.destination);
    nodesRef.current = { gain };

    if (kind === 'white' || kind === 'rain' || kind === 'ocean') {
      const bufSize = 2 * ctx.sampleRate;
      const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
      const out = buf.getChannelData(0);
      for (let i = 0; i < bufSize; i++) out[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buf;
      noise.loop = true;
      const filter = ctx.createBiquadFilter();
      if (kind === 'rain') { filter.type = 'highpass'; filter.frequency.value = 1000; }
      else if (kind === 'ocean') { filter.type = 'lowpass'; filter.frequency.value = 600; }
      else { filter.type = 'lowpass'; filter.frequency.value = 4000; }
      noise.connect(filter); filter.connect(gain); noise.start();
      nodesRef.current.noise = noise;
    } else if (kind === 'lullaby') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      const notes = [523.25, 587.33, 659.25, 587.33, 523.25, 440, 523.25];
      let i = 0;
      osc.frequency.setValueAtTime(notes[0], ctx.currentTime);
      const interval = window.setInterval(() => {
        if (!nodesRef.current?.osc) { clearInterval(interval); return; }
        i = (i + 1) % notes.length;
        osc.frequency.exponentialRampToValueAtTime(notes[i], ctx.currentTime + 0.3);
      }, 700);
      osc.connect(gain); osc.start();
      nodesRef.current.osc = osc;
      nodesRef.current.melody = interval;
    }
  };

  const handleClick = (id: SoundId) => {
    if (active === id) { stopSound(); setActive(null); }
    else { setActive(id); playSound(id); }
  };

  return (
    <div className="grid grid-cols-4 gap-1.5">
      {SOUNDS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className={`flex flex-col items-center gap-1.5 rounded-2xl border-[1.5px] py-3 transition active:scale-95 ${
              isActive
                ? 'border-stone-900 bg-stone-900 text-amber-50'
                : 'border-transparent bg-amber-50/70 text-stone-700'
            }`}
          >
            <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
