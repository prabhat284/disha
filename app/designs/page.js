
// Path: /app/designs/page.js
// Purpose: Main orchestrator for the entire design system with hierarchical navigation

'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { CheckCircle2, MessageSquare, Download, Heart, Sparkles, Upload as UploadIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import designOptions from '@/data/design-options.json'
import manufacturingData from '@/data/manufacturing-drawings.json'
import kitchenZones from '@/data/kitchen-zones.json'
import FileUploader from '@/components/shared/FileUploader'
import CoohomEmbed from '@/components/3d/CoohomEmbed'
import AI3DGenerator from '@/components/3d/AI3DGenerator'
import DetailDrawings from '@/components/drawings/DetailDrawings'
import ProjectOverview from '@/components/kitchen/ProjectOverview'
import ZoneDetails from '@/components/kitchen/ZoneDetails'

// Dynamic import to avoid SSR issues with Three.js
const KitchenViewer = dynamic(() => import('@/components/3d/KitchenViewer'), { ssr: false })

export default function DesignsPage() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  const [selectedOption, setSelectedOption] = useState(designOptions.options[1])
  const [view, setView] = useState('overview') // 'overview', 'zone', 'cabinet', 'detail'
  const [selectedZone, setSelectedZone] = useState(null)
  const [selectedCabinet, setSelectedCabinet] = useState(null)
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

  // Get current project data
  const currentProjectData = kitchenZones[selectedOption.id]
  const currentZoneData = selectedZone ? currentProjectData?.zones.find(z => z.id === selectedZone) : null
  const currentCabinetData = selectedCabinet ? manufacturingData[selectedOption.id] : null

  const handleCoohomUrlSave = (url) => {
    setCoohomUrls(prev => ({
      ...prev,
      [selectedOption.id]: url
    }))
  }

  const handleAIModelGenerated = (modelData) => {
    console.log('AI Model generated:', modelData)
  }

  const handleZoneSelect = (zoneId) => {
    setSelectedZone(zoneId)
    setView('zone')
  }

  const handleCabinetSelect = (cabinetId) => {
    setSelectedCabinet(cabinetId)
    setView('detail')
  }

  const handleBackToOverview = () => {
    setSelectedZone(null)
    setSelectedCabinet(null)
    setView('overview')
  }

  const handleBackToZone = () => {
    setSelectedCabinet(null)
    setView('zone')
  }

  const statusColors = {
    'Preferred': 'status-approved',
    'Under Review': 'status-review',
    'Alternative': 'status-pending'
  }

  return (
    <div className="min-h-screen bg-luxury-dark pt-28 pb-12">
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gradient">Design Options</h1>
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

        {/* Design Options Grid - Only show when in overview */}
        {view === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredOptions.map((option, index) => (
              <div
                key={option.id}
                className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:scale-105 ${
                  selectedOption.id === option.id ? 'ring-2 ring-gold' : ''
                }`}
                onClick={() => {
                  setSelectedOption(option)
                  setView('overview')
                  setSelectedZone(null)
                  setSelectedCabinet(null)
                }}
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
        )}

        {/* Main Content Area - Changes based on view level */}
        <div className="glass rounded-2xl p-6">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <button
              onClick={handleBackToOverview}
              className="hover:text-gold transition-colors"
            >
              {selectedOption.name}
            </button>
            {selectedZone && (
              <>
                <span>/</span>
                <button
                  onClick={() => setView('zone')}
                  className="hover:text-gold transition-colors"
                >
                  {currentZoneData?.name}
                </button>
              </>
            )}
            {selectedCabinet && (
              <>
                <span>/</span>
                <span className="text-gold">{selectedCabinet}</span>
              </>
            )}
          </div>

          {/* Level 0: Project Overview */}
          {view === 'overview' && currentProjectData && (
            <ProjectOverview
              projectData={currentProjectData}
              designOption={selectedOption.id}
              onZoneSelect={handleZoneSelect}
              onViewChange={setView}
            />
          )}

          {/* Level 1: Zone Details */}
          {view === 'zone' && currentZoneData && (
            <ZoneDetails
              zone={currentZoneData}
              onBack={handleBackToOverview}
              onCabinetSelect={handleCabinetSelect}
              manufacturingData={manufacturingData[selectedOption.id]}
            />
          )}

          {/* Level 2: Cabinet Detail Drawings */}
          {view === 'detail' && selectedCabinet && (
            <div>
              <button
                onClick={handleBackToZone}
                className="flex items-center gap-2 text-gold hover:text-gold-light transition-all mb-4"
              >
                ← Back to {currentZoneData?.name}
              </button>
              <DetailDrawings
                designOption={selectedOption.id}
                manufacturingData={manufacturingData[selectedOption.id]}
              />
            </div>
          )}
        </div>

        {/* Action Buttons - Show contextually */}
        {view !== 'overview' && (
          <div className="flex flex-wrap gap-3 mt-6">
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
        )}
      </div>
    </div>
  )
}

