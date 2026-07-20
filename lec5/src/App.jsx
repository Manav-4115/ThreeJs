import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experienced from './components/Experienced'
import {OrbitControls}from '@react-three/drei'


const App = () => {
  return (
    <div className='parent' >
      <Canvas>
        <OrbitControls />
          <Experienced />
      </Canvas>
    </div>
  )
}

export default App