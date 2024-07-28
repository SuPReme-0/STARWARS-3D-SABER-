import * as THREE from 'three'
import { useLayoutEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, Preload } from '@react-three/drei'
import { Effects } from './Effects'

export default function App() {
  return (
    <Canvas gl={{ antialias: true, stencil: false }} camera={{ position: [5, 0, 0], fov: 80 }}>
      <ambientLight intensity={0.9} />
      <spotLight
        angle={0.12}
        penumbra={0.1}
        position={[-10, -100, -10]}
        intensity={10}
        onUpdate={(self) => {
          self.target.position.set(-10, 0, 0)
          self.target.updateMatrixWorld()
        }}
      />
      <Hall position={[1, 0.98, 0]} />
      <Darth position={[-3, -0.39, -0.2]} rotation={[0, 2, 0]} scale={0.005} />
      <Float>
        <Probe position={[-1.59, 0.70, 0.80]} scale={0.01} rotation={[-1, Math.PI / 2, 0]} />
      </Float>
      <Effects />
      <Rig from={-Math.PI / 2} to={Math.PI / 2.66} />
      <Preload all />
    </Canvas>
  )
}

function Rig() {
  useFrame((state) => {
    state.camera.position.lerp({ x: 0, y: -state.pointer.y / 4, z: state.pointer.x / 2 }, 0.1)
    state.camera.lookAt(-20, 0, 0)
  })
}

function Hall({ ...props }) {
  const { scene } = useGLTF('/hall-transformed.glb')
  return <primitive object={scene} {...props} />
}

function Probe({ ...props }) {
  const { scene, materials } = useGLTF('/probe-transformed.glb')
  useLayoutEffect(() => {
    Object.values(materials).forEach((material) => (material.roughness = 0))
    Object.assign(materials.light, {
      color: new THREE.Color('white'),
      emissive: new THREE.Color(1, 0, 0),
      emissiveIntensity: 1,
      toneMapped: false
    })
  }, [])
  return <primitive object={scene} {...props} />
}

function Darth({ ...props }) {
  const { scene, materials } = useGLTF('/darth-transformed.glb')
  useLayoutEffect(() => {
    Object.assign(materials.Sabel_svart, {
      color: new THREE.Color('aqua'),
      emissive: new THREE.Color(1, 0, 0),
      emissiveIntensity: 2,
      toneMapped: false
    })
  }, [])
  return <primitive object={scene} {...props} />
}
