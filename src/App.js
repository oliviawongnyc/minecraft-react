import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Stars } from 'drei';
import { Physics } from 'use-cannon';
import { Player } from './components/Player';
import { nanoid } from 'nanoid';

import { Ground } from './components/Ground';
import { Cube } from './components/Cube';

import { useStore } from './hooks/useStore';
import { useInterval } from './hooks/useInterval';

function App() {
  const [cubes, saveWorld] = useStore((state) => [
    state.cubes,
    state.saveWorld,
  ]);
  console.log('cubes -->', cubes);

  useInterval(() => {
    saveWorld(cubes);
    console.log('Saved!');
  }, 10000);

  return (
    <Canvas shadowMap sRGB>
      <Stars />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 3, 10]} />
        {cubes.map((cube, index) => (
          <Cube key={nanoid()} position={cube.pos} texture={cube.texture} />
        ))}
      </Physics>
    </Canvas>
  );
}

export default App;
