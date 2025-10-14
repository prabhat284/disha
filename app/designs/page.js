
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { CheckCircle2, Clock, MessageSquare, Download, Eye, Heart, Sparkles, Upload as UploadIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import designOptions from '@/data/design-options.json'
import manufacturingData from '@/data/manufacturing-drawings.json'
import FileUploader from '@/components/shared/FileUploader'
import CoohomEmbed from '@/components/3d/CoohomEmbed'
import AI3DGenerator from '@/components/3d/AI3DGenerator'
import DetailDrawings from '@/components/drawings/DetailDrawings'

// Dynamic import to avoid SSR issues with Three.js
const KitchenViewer = dynamic(() => import('@/components/3d/KitchenViewer'), { ssr: false })

export default function DesignsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [selectedOption, setSelectedOption] = useState(designOptions.options[1])
  const [view, setView] = useState('3d')
  const [filter, setFilter] = useState('All')
  const [coohomUrls, setCoohomUrls] = useState({
    'option-a': designOptions.options[0].coohomUrl || '',
    'option-b': designOptions.options[1].coohomUrl || '',
    'option-c': designOptions.options[2].coohomUrl || ''
  })

  const categories = ['All', ...new Set(designOptions.options.map(p => p.status))]
  const filteredOptions = filter === 'All' 
    ? designOptions.options 
    : designOptions.options.filter(p => p.status === filter)

  const handleCoohomUrlSave = (url) => {
    setCoohomUrls(prev => ({
      ...prev,
      [selectedOption.id]: url
    }))
  }

  const handleAIModelGenerated = (modelData) => {
    console.log('AI Model generated:', modelData)
    setTimeout(() => setView('3d'), 2000)
  }

  const statusColors = {
    'Preferred': 'status-approved',
    'Under Review': 'status-review',
    'Alternative': 'status-pending'
  }

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <Sparkles className="text-gold" size={32} />
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-gradient">Design Options</h1>
          </div>
          <p className="text-xl text-gray-400 mb-8">
            Explore three unique design concepts crafted for your dream kitchen
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  filter === category
                    ? 'bg-gold text-black'
                    : 'glass-gold text-gold hover:bg-gold hover:text-black'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Design Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredOptions.map((option, index) => (
            <div
              key={option.id}
              className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                selectedOption.id === option.id ? 'ring-2 ring-gold' : ''
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {/* Preview Image Placeholder */}
              <div className="aspect-video bg-luxury-gray rounded-xl mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  {selectedOption.id === option.id && (
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                      <CheckCircle2 className="text-black" size={18} />
                    </div>
                  )}
                </div>
              </div>

              {/* Option Info */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-serif font-bold text-white">{option.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[option.status]}`}>
                  {option.status}
                </span>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">{option.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gold font-medium">₹{(option.estimatedCost / 100000).toFixed(2)}L</span>
                {option.clientFeedback && (
                  <div className="flex items-center text-green-400">
                    <MessageSquare size={14} className="mr-1" />
                    <span className="text-xs">Feedback</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Design Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Viewer / Images */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              {/* View Toggle */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-serif font-bold text-white">{selectedOption.name}</h2>
                <div className="flex items-center flex-wrap gap-2">
                  <button
                    onClick={() => setView('coohom')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      view === 'coohom' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    Coohom
                  </button>
                  <button
                    onClick={() => setView('ai')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 flex items-center gap-1 ${
                      view === 'ai' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    <Sparkles size={14} />
                    AI
                  </button>
                  <button
                    onClick={() => setView('3d')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      view === '3d' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    3D View
                  </button>
                  <button
                    onClick={() => setView('detail')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      view === 'detail' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    Detail Drawings
                  </button>
                  <button
                    onClick={() => setView('floor')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      view === 'floor' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    Floor
                  </button>
                  <button
                    onClick={() => setView('elevation')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 ${
                      view === 'elevation' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    Elevation
                  </button>
                  <button
                    onClick={() => setView('upload')}
                    className={`px-3 py-2 text-sm rounded-lg font-medium transition-all duration-200 flex items-center gap-1 ${
                      view === 'upload' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold hover:text-black'
                    }`}
                  >
                    <UploadIcon size={14} />
                    Upload
                  </button>
                </div>
              </div>

              {/* Viewer */}
              <div className="viewer-3d mb-6">
                {view === 'detail' ? (
                  <DetailDrawings
                    designOption={selectedOption.id}
                    manufacturingData={manufacturingData[selectedOption.id]}
                  />
                ) : view === 'ai' ? (
                  <AI3DGenerator
                    designOption={selectedOption.id}
                    onModelGenerated={handleAIModelGenerated}
                  />
                ) : view === 'coohom' ? (
                  <CoohomEmbed
                    designOption={selectedOption.id}
                    coohomUrl={coohomUrls[selectedOption.id]}
                    onUrlSave={handleCoohomUrlSave}
                  />
                ) : view === '3d' ? (
                  <KitchenViewer designOption={selectedOption.id} />
                ) : view === 'upload' ? (
                  <div className="w-full h-full p-8 bg-luxury-gray rounded-xl overflow-y-auto">
                    <FileUploader 
                      category="models"
                      designOption={selectedOption.id}
                      maxSizeMB={100}
                      onUploadComplete={(file) => {
                        console.log('Uploaded:', file)
                        setTimeout(() => setView('3d'), 2000)
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-luxury-gray rounded-xl">
                    <div className="text-center">
                      <div className="text-gray-500 mb-2">{view === 'floor' ? 'Floor Plan' : 'Elevation'}</div>
                      <p className="text-gray-600 text-sm mb-4">Image will be displayed here</p>
                      <button
                        onClick={() => setView('upload')}
                        className="px-4 py-2 bg-gold text-black rounded-lg font-medium hover:bg-gold-light transition-all duration-200"
                      >
                        Upload {view === 'floor' ? 'Floor Plan' : 'Elevation'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-200">
                  <Heart className="mr-2" size={20} />
                  Select This Design
                </button>
                <button className="flex items-center px-6 py-3 glass-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-all duration-200">
                  <Download className="mr-2" size={20} />
                  Download Files
                </button>
                <button className="flex items-center px-6 py-3 glass-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-all duration-200">
                  <MessageSquare className="mr-2" size={20} />
                  Add Comment
                </button>
              </div>
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 space-y-6">
              {/* Features */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {selectedOption.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-300">
                      <CheckCircle2 className="text-gold mr-2 flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4">Materials</h3>
                <div className="space-y-3">
                  {Object.entries(selectedOption.materials).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm capitalize">{key}</span>
                      <span className="text-white text-sm font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="glass-gold rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Estimated Cost</span>
                  <span className="text-2xl font-bold text-gold">
                    ₹{(selectedOption.estimatedCost / 100000).toFixed(2)}L
                  </span>
                </div>
                <p className="text-gray-500 text-xs">Inclusive of materials and labor</p>
              </div>

              {/* Client Feedback */}
              {selectedOption.clientFeedback && (
                <div className="glass-gold rounded-xl p-4">
                  <div className="flex items-center mb-2">
                    <MessageSquare className="text-gold mr-2" size={18} />
                    <span className="text-white font-medium">Your Feedback</span>
                  </div>
                  <p className="text-gray-300 text-sm italic">"{selectedOption.clientFeedback}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
