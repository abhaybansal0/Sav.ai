// components/ParticleBackground.tsx
import { useEffect, useState, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import { type Engine, type ISourceOptions } from '@tsparticles/engine';
import { initParticlesEngine } from '@tsparticles/react';

export default function ParticleBackground() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine); // load all tsParticles features
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(() => ({
    fpsLimit: 30,
    particles: {
      number: { value: 140, density: { enable: true, area: 10 } },
      shape: { type: ['circle', 'polygon'],
        
        random: { enable: true} },
      opacity: { value: {min:0.5, max:0.7}, random: { enable: true, minimumValue: 0.5 } },
      size: { value: {min:2, max:6}, random: { enable: true, minimumValue: 1} },
      move: { enable: true, speed: 0.15, outModes: "split" },
      color: {
        value: ["#9B5DE5", "#5F6FFF"],
        random:{
            enable:true
        }
      }
    },
    detectRetina: true,
  }), []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles-canvas"
      options={options}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
      }}
    />
  );
}
