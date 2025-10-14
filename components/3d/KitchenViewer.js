'use client'

import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useGLTF } from '@react-three/drei'
import { RotateCcw, Move, Layers, Eye } from 'lucide-react'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useLoader } from '@react-three/fiber'
import * as THREE from 'three'

// Component to load OBJ model from Coohom
function OBJKitchenModel({ modelPath, mtlPath, showWireframe }) {
  try {
    // Load MTL (materials) if available
    const materials = mtlPath ? useLoader(MTLLoader, mtlPath) : null
    
    // Load OBJ with materials
    const obj = useLoader(OBJLoader, modelPath, (loader) => {
      if (materials) {
        materials.preload()
        loader.setMaterials(materials)
      }
    })

    // Apply wireframe if enabled
    if (showWireframe) {
      obj.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = true
        }
      })
    }

    // Center and scale the model
    const box = new THREE.Box3().setFromObject(obj)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Scale to fit in view
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 5 / maxDim
    
    return (
      <primitive 
        object={obj} 
        scale={scale}
        position={[-center.x * scale, -center.y * scale, -center.z * scale]}
      />
    )
  } catch (error) {
    console.log('OBJ model not found:', error)
    return <FallbackKitchenModel showWireframe={showWireframe} />
  }
}

// Component to load GLB model
function GLBKitchenModel({ modelPath, showWireframe }) {
  try {
    const { scene } = useGLTF(modelPath)
    
    // Clone the scene to avoid mutating the cached version
    const clonedScene = scene.clone()
    
    if (showWireframe) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map(mat => {
              const newMat = mat.clone()
              newMat.wireframe = true
              return newMat
            })
          } else {
            const newMat = child.material.clone()
            newMat.wireframe = true
            child.material = newMat
          }
        }
      })
    }
    
    // Center and scale the model
    const box = new THREE.Box3().setFromObject(clonedScene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Scale to fit in view
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 5 / maxDim
    
    // Center the model
    clonedScene.position.set(-center.x, -center.y, -center.z)
    
    return <primitive object={clonedScene} scale={scale} />
  } catch (error) {
    console.error('GLB model loading error:', error)
    return <FallbackKitchenModel showWireframe={showWireframe} />
  }
}

// Fallback geometric model
function FallbackKitchenModel({ showWireframe }) {
  const colors = {
    cabinets: '#8B6F47',
    countertop: '#F5F5DC',
    backsplash: '#E8D5C4',
    handles: '#D4AF37'
  }

  return (
    <group position={[0, 0, 0]}>
      {/* Base Cabinets */}
      <mesh position={[-3, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 1, 0.6]} />
        <meshStandardMaterial 
          color={colors.cabinets} 
          roughness={0.4} 
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>

      <mesh position={[-0.5, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 1, 0.6]} />
        <meshStandardMaterial 
          color={colors.cabinets} 
          roughness={0.4} 
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Wall Cabinets */}
      <mesh position={[-3, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.8, 0.4]} />
        <meshStandardMaterial 
          color={colors.cabinets} 
          roughness={0.4} 
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>

      <mesh position={[-0.5, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 0.8, 0.4]} />
        <meshStandardMaterial 
          color={colors.cabinets} 
          roughness={0.4} 
          metalness={0.1}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Countertop */}
      <mesh position={[-1.75, 1.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[5.5, 0.08, 0.7]} />
        <meshStandardMaterial 
          color={colors.countertop} 
          roughness={0.2} 
          metalness={0.6}
          wireframe={showWireframe}
        />
      </mesh>
      
      {/* Backsplash */}
      <mesh position={[-1.75, 1.8, -0.35]} receiveShadow>
        <boxGeometry args={[5.5, 1.4, 0.03]} />
        <meshStandardMaterial 
          color={colors.backsplash} 
          roughness={0.15} 
          metalness={0.3}
          wireframe={showWireframe}
        />
      </mesh>

      {/* Handles */}
      {[-3.8, -2.8, -1.8, -0.8, 0.2, 1.2].map((x, i) => (
        <mesh key={`handle-${i}`} position={[x, 0.5, 0.35]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 0.25, 16]} />
          <meshStandardMaterial 
            color={colors.handles} 
            roughness={0.2} 
            metalness={0.9}
            wireframe={showWireframe}
          />
        </mesh>
      ))}
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial 
          color="#2A2A2A" 
          roughness={0.7}
          wireframe={showWireframe}
        />
      </mesh>
    </group>
  )
}

export default function KitchenViewer({ designOption }) {
  const [cameraReset, setCameraReset] = useState(0)
  const [showGrid, setShowGrid] = useState(false)
  const [showWireframe, setShowWireframe] = useState(false)
  const [viewMode, setViewMode] = useState('perspective')
  const [modelFormat, setModelFormat] = useState('auto') // auto, obj, glb, fallback

  // Paths to models - supports both OBJ and GLB
  const objPath = `/models/${designOption}.obj`
  const mtlPath = `/models/${designOption}.mtl` // Optional materials file
  const glbPath = `/models/${designOption}.glb`

  const cameraPositions = {
    perspective: [6, 3, 6],
    top: [0, 8, 0.1],
    side: [8, 2, 0],
    front: [0, 2, 6]
  }

  // Auto-detect which model format to use
  const renderModel = () => {
    if (modelFormat === 'fallback') {
      return <FallbackKitchenModel showWireframe={showWireframe} />
    }
    
    // Try GLB first (best for web)
    if (modelFormat === 'glb' || modelFormat === 'auto') {
      return (
        <Suspense fallback={<FallbackKitchenModel showWireframe={showWireframe} />}>
          <GLBKitchenModel 
            modelPath={glbPath} 
            showWireframe={showWireframe} 
          />
        </Suspense>
      )
    }
    
    // Otherwise try OBJ
    return (
      <Suspense fallback={<FallbackKitchenModel showWireframe={showWireframe} />}>
        <OBJKitchenModel 
          modelPath={objPath} 
          mtlPath={mtlPath}
          showWireframe={showWireframe} 
        />
      </Suspense>
    )
  }

  return (
    <div className="relative w-full h-full bg-luxury-gray rounded-2xl overflow-hidden border border-luxury-border">
      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: cameraPositions[viewMode], fov: 50 }}>
        <PerspectiveCamera 
          makeDefault 
          position={cameraPositions[viewMode]} 
          fov={50} 
          key={`${cameraReset}-${viewMode}`}
        />
        
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[8, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 4, 3]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[5, 3, 3]} intensity={0.4} color="#F4E4C1" />
        <spotLight
          position={[0, 8, 0]}
          intensity={0.6}
          angle={0.8}
          penumbra={0.5}
          castShadow
        />
        
        {/* Kitchen Model */}
        {renderModel()}
        
        {/* Shadows */}
        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.5}
          scale={20}
          blur={2}
          far={8}
        />
        
        {/* Grid */}
        {showGrid && (
          <gridHelper args={[12, 12, '#D4AF37', '#3A3A3A']} position={[0, 0.01, 0]} />
        )}
        
        {/* Environment */}
        <Environment preset="warehouse" />
        
        {/* Controls */}
        <OrbitControls
          makeDefault
          minDistance={3}
          maxDistance={25}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
          enablePan={true}
        />
      </Canvas>

      {/* Control Panel */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 glass px-4 py-3 rounded-full flex items-center gap-2 flex-wrap justify-center max-w-[90vw]">
        <button
          onClick={() => setCameraReset(prev => prev + 1)}
          className="p-2 text-gray-300 hover:text-gold transition-all rounded-full hover:bg-white/5"
          title="Reset View"
        >
          <RotateCcw size={18} />
        </button>
        
        <div className="w-px h-6 bg-luxury-border"></div>
        
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 transition-all rounded-full hover:bg-white/5 ${showGrid ? 'text-gold' : 'text-gray-500'}`}
          title="Toggle Grid"
        >
          <Move size={18} />
        </button>

        <button
          onClick={() => setShowWireframe(!showWireframe)}
          className={`p-2 transition-all rounded-full hover:bg-white/5 ${showWireframe ? 'text-gold' : 'text-gray-500'}`}
          title="Toggle Wireframe"
        >
          <Layers size={18} />
        </button>
        
        <div className="w-px h-6 bg-luxury-border"></div>

        {/* View Mode Buttons */}
        <div className="flex gap-1">
          {['perspective', 'top', 'side', 'front'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                viewMode === mode 
                  ? 'bg-gold text-black font-medium' 
                  : 'text-gray-400 hover:text-gold hover:bg-white/5'
              }`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="w-px h-6 bg-luxury-border hidden md:block"></div>
        
        <span className="text-xs text-gray-400 px-2 hidden lg:block">
          Drag • Scroll • Right-click
        </span>
      </div>

      {/* Model Format Switch */}
      <div className="absolute bottom-24 left-6 glass px-3 py-2 rounded-lg">
        <div className="text-xs text-gray-400 mb-2">Model Source:</div>
        <div className="flex gap-2">
          {['auto', 'glb', 'obj', 'fallback'].map((format) => (
            <button
              key={format}
              onClick={() => setModelFormat(format)}
              className={`px-2 py-1 text-xs rounded transition-all ${
                modelFormat === format 
                  ? 'bg-gold text-black font-medium' 
                  : 'text-gray-400 hover:text-gold'
              }`}
            >
              {format.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-2">
          Current: {modelFormat.toUpperCase()}
        </div>
      </div>

      {/* Info Badge */}
      <div className="absolute top-6 left-6 glass-gold px-4 py-2 rounded-full flex items-center gap-2">
        <Eye className="text-gold" size={16} />
        <span className="text-gold text-sm font-medium">Interactive 3D View</span>
      </div>

      {/* Material Info */}
      <div className="absolute top-6 right-6 glass px-4 py-2 rounded-lg">
        <div className="text-xs text-gray-400 mb-1">Design Option</div>
        <div className="text-sm text-gold font-medium capitalize">
          {designOption.replace('option-', 'Option ').toUpperCase()}
        </div>
      </div>
    </div>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#D4AF37" wireframe />
    </mesh>
  )
}
