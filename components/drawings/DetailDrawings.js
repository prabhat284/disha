'use client'

import { useState } from 'react'
import { Download, ExternalLink, Printer, FileText, Ruler, Wrench } from 'lucide-react'

export default function DetailDrawings({ designOption, manufacturingData }) {
  const [selectedCabinet, setSelectedCabinet] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')

  if (!manufacturingData) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-luxury-gray rounded-xl p-8">
        <div className="text-center">
          <FileText className="text-gray-500 mx-auto mb-4" size={48} />
          <p className="text-gray-400">No manufacturing drawings available for this design option</p>
        </div>
      </div>
    )
  }

  const allCabinets = [
    ...(manufacturingData.baseCabinets || []),
    ...(manufacturingData.wallCabinets || []),
    ...(manufacturingData.tallUnits || [])
  ]

  const cabinet = selectedCabinet || allCabinets[0]

  if (!cabinet) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-luxury-gray rounded-xl p-8">
        <div className="text-center">
          <FileText className="text-gray-500 mx-auto mb-4" size={48} />
          <p className="text-gray-400">No cabinets defined yet</p>
        </div>
      </div>
    )
  }

  const handleDownloadAll = () => {
    // Download all drawings for this cabinet
    console.log('Downloading all files for:', cabinet.id)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="w-full h-full bg-luxury-gray rounded-xl overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar - Cabinet List */}
      <div className="w-full md:w-72 bg-luxury-dark border-r border-gold/20 overflow-y-auto">
        <div className="p-4 border-b border-gold/20">
          <h3 className="text-lg font-bold text-white">Cabinet List</h3>
          <p className="text-xs text-gray-400 mt-1">{allCabinets.length} Total Units</p>
        </div>

        {/* Base Cabinets */}
        {manufacturingData.baseCabinets?.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gold mb-2">Base Cabinets</h4>
            {manufacturingData.baseCabinets.map((cab) => (
              <button
                key={cab.id}
                onClick={() => setSelectedCabinet(cab)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                  cabinet?.id === cab.id
                    ? 'bg-gold text-black'
                    : 'glass-gold text-gray-300 hover:bg-gold/20'
                }`}
              >
                <div className="font-medium text-sm">{cab.id}</div>
                <div className="text-xs opacity-80">{cab.name}</div>
                <div className="text-xs mt-1">
                  {cab.dimensions.width}×{cab.dimensions.depth}×{cab.dimensions.height}mm
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Wall Cabinets */}
        {manufacturingData.wallCabinets?.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gold mb-2">Wall Cabinets</h4>
            {manufacturingData.wallCabinets.map((cab) => (
              <button
                key={cab.id}
                onClick={() => setSelectedCabinet(cab)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                  cabinet?.id === cab.id
                    ? 'bg-gold text-black'
                    : 'glass-gold text-gray-300 hover:bg-gold/20'
                }`}
              >
                <div className="font-medium text-sm">{cab.id}</div>
                <div className="text-xs opacity-80">{cab.name}</div>
                <div className="text-xs mt-1">
                  {cab.dimensions.width}×{cab.dimensions.depth}×{cab.dimensions.height}mm
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tall Units */}
        {manufacturingData.tallUnits?.length > 0 && (
          <div className="p-4">
            <h4 className="text-sm font-semibold text-gold mb-2">Tall Units</h4>
            {manufacturingData.tallUnits.map((cab) => (
              <button
                key={cab.id}
                onClick={() => setSelectedCabinet(cab)}
                className={`w-full text-left p-3 rounded-lg mb-2 transition-all ${
                  cabinet?.id === cab.id
                    ? 'bg-gold text-black'
                    : 'glass-gold text-gray-300 hover:bg-gold/20'
                }`}
              >
                <div className="font-medium text-sm">{cab.id}</div>
                <div className="text-xs opacity-80">{cab.name}</div>
                <div className="text-xs mt-1">
                  {cab.dimensions.width}×{cab.dimensions.depth}×{cab.dimensions.height}mm
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-luxury-dark border-b border-gold/20 p-4">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white">{cabinet.name}</h2>
              <p className="text-sm text-gray-400">{cabinet.id}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleDownloadAll}
                className="px-4 py-2 bg-gold text-black rounded-lg font-medium hover:bg-gold-light transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Download All
              </button>
              <button 
                onClick={handlePrint}
                className="px-4 py-2 glass-gold text-gold rounded-lg font-medium hover:bg-gold hover:text-black transition-all flex items-center gap-2"
              >
                <Printer size={18} />
                Print
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {['overview', 'parts', 'hardware', 'cutlist', 'assembly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                  activeTab === tab
                    ? 'bg-gold text-black'
                    : 'text-gray-400 hover:text-gold'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && <OverviewTab cabinet={cabinet} />}
          {activeTab === 'parts' && <PartsTab cabinet={cabinet} />}
          {activeTab === 'hardware' && <HardwareTab cabinet={cabinet} />}
          {activeTab === 'cutlist' && <CutListTab cabinet={cabinet} />}
          {activeTab === 'assembly' && <AssemblyTab cabinet={cabinet} />}
        </div>
      </div>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ cabinet }) {
  return (
    <div className="space-y-6">
      {/* Dimensions */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Ruler className="text-gold" size={20} />
          Cabinet Dimensions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-gray-400 text-sm">Width</p>
            <p className="text-white text-2xl font-bold">{cabinet.dimensions.width}mm</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Depth</p>
            <p className="text-white text-2xl font-bold">{cabinet.dimensions.depth}mm</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Height</p>
            <p className="text-white text-2xl font-bold">{cabinet.dimensions.height}mm</p>
          </div>
        </div>
      </div>

      {/* Drawing Files */}
      <div className="glass rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Technical Drawings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cabinet.drawings?.assembly && (
            <a
              href={cabinet.drawings.assembly}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-gold rounded-lg p-4 hover:bg-gold hover:text-black transition-all group"
            >
              <FileText className="text-gold group-hover:text-black mb-2" size={32} />
              <p className="font-medium">Assembly Drawing</p>
              <p className="text-xs opacity-70">PDF</p>
            </a>
          )}
          {cabinet.drawings?.parts && (
            <a
              href={cabinet.drawings.parts}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-gold rounded-lg p-4 hover:bg-gold hover:text-black transition-all group"
            >
              <FileText className="text-gold group-hover:text-black mb-2" size={32} />
              <p className="font-medium">Parts Drawing</p>
              <p className="text-xs opacity-70">PDF</p>
            </a>
          )}
          {cabinet.drawings?.elevation && (
            <a
              href={cabinet.drawings.elevation}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-gold rounded-lg p-4 hover:bg-gold hover:text-black transition-all group"
            >
              <FileText className="text-gold group-hover:text-black mb-2" size={32} />
              <p className="font-medium">Elevation</p>
              <p className="text-xs opacity-70">PDF</p>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// Parts Tab Component
function PartsTab({ cabinet }) {
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-luxury-dark border-b border-gold/20">
            <tr>
              <th className="text-left p-4 text-gold font-semibold">Part ID</th>
              <th className="text-left p-4 text-gold font-semibold">Name</th>
              <th className="text-left p-4 text-gold font-semibold">Material</th>
              <th className="text-left p-4 text-gold font-semibold">Dimensions (L×W×T)</th>
              <th className="text-left p-4 text-gold font-semibold">Qty</th>
              <th className="text-left p-4 text-gold font-semibold">Edge Banding</th>
            </tr>
          </thead>
          <tbody>
            {cabinet.components?.map((part, idx) => (
              <tr key={part.id} className={idx % 2 === 0 ? 'bg-luxury-gray/50' : ''}>
                <td className="p-4 text-white font-mono text-sm">{part.id}</td>
                <td className="p-4 text-white">{part.name}</td>
                <td className="p-4 text-gray-300 text-sm">
                  {part.material}
                  <br/>
                  <span className="text-xs text-gray-400">{part.finish}</span>
                </td>
                <td className="p-4 text-white font-mono text-sm">
                  {part.dimensions.length}×{part.dimensions.width}×{part.dimensions.thickness}
                </td>
                <td className="p-4 text-white">{part.quantity}</td>
                <td className="p-4 text-gray-300 text-xs">{(part.edgeBanding || []).join(', ') || 'None'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Hardware Tab Component
function HardwareTab({ cabinet }) {
  return (
    <div className="space-y-4">
      {cabinet.hafeleHardware?.map((hardware) => (
        <div key={hardware.article} className="glass rounded-xl p-6">
          <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
            <div>
              <h4 className="text-xl font-bold text-white mb-1">{hardware.name}</h4>
              <p className="text-gold font-mono">Article: {hardware.article}</p>
              <p className="text-gray-400 text-sm mt-1">Position: {hardware.position}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Quantity</p>
              <p className="text-2xl font-bold text-white">{hardware.quantity}</p>
            </div>
          </div>

          {/* Specifications */}
          {hardware.specifications && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {Object.entries(hardware.specifications).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-400 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="text-white">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3 flex-wrap">
            {hardware.drillingTemplate && (
              <a
                href={hardware.drillingTemplate}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
              >
                <FileText size={16} />
                Drilling Template
              </a>
            )}
            {hardware.installationGuide && (
              <a
                href={hardware.installationGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
              >
                <Wrench size={16} />
                Installation Guide
              </a>
            )}
            <a
              href={`https://www.hafele.com/in/en/search/?q=${hardware.article}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
            >
              <ExternalLink size={16} />
              View on Hafele
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

// Cut List Tab Component
function CutListTab({ cabinet }) {
  return (
    <div className="space-y-6">
      {Object.entries(cabinet.cutList || {}).map(([material, items]) => (
        <div key={material} className="glass rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">{material}</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gold/20">
                <tr>
                  <th className="text-left pb-3 text-gold">Description</th>
                  <th className="text-left pb-3 text-gold">Size (mm)</th>
                  <th className="text-left pb-3 text-gold">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="py-3 text-white">{item.description}</td>
                    <td className="py-3 text-white font-mono">{item.size}</td>
                    <td className="py-3 text-white">{item.qty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}

// Assembly Tab Component
function AssemblyTab({ cabinet }) {
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Wrench className="text-gold" size={20} />
        Assembly Instructions
      </h3>
      <ol className="space-y-4">
        {cabinet.assemblySteps?.map((step, idx) => (
          <li key={idx} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-bold">
              {idx + 1}
            </div>
            <p className="text-gray-300 pt-1">{step}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

