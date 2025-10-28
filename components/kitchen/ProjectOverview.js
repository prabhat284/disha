// Path: /components/kitchen/ProjectOverview.js
// Purpose: Level 0 - Top-level project overview with Coohom integration

'use client'

import { useState } from 'react'
import { LayoutGrid, Ruler, DollarSign, Clock, ChevronRight, Map, Eye, Download } from 'lucide-react'

export default function ProjectOverview({ projectData, designOption, onZoneSelect, onViewChange }) {
  const [selectedView, setSelectedView] = useState('3d')

  const handleZoneClick = (zoneId) => {
    onZoneSelect(zoneId)
  }

  const handleExportFromCoohom = () => {
    // Instructions for exporting from Coohom
    alert('Export Instructions:\n1. Open Coohom project\n2. Go to Construction Drawings\n3. Select Kitchen & Bath\n4. Download as PDF/CAD\n5. Upload to project folder')
  }

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{projectData.projectInfo.name}</h2>
            <p className="text-gray-400">Client: {projectData.projectInfo.client}</p>
            <p className="text-gray-400">
              {projectData.projectInfo.layoutType} Layout • {projectData.projectInfo.totalArea} sq ft
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Coohom Project ID: {projectData.coohomProject.projectId}
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Total Investment</p>
            <p className="text-3xl font-bold text-gold">₹{(projectData.projectInfo.totalCost / 100000).toFixed(2)}L</p>
            <p className="text-gray-500 text-xs mt-1">{projectData.projectInfo.timeline}</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-gold rounded-lg p-4">
            <LayoutGrid className="text-gold mb-2" size={24} />
            <p className="text-gray-400 text-sm">Zones</p>
            <p className="text-white text-2xl font-bold">{projectData.zones.length}</p>
          </div>
          <div className="glass-gold rounded-lg p-4">
            <Ruler className="text-gold mb-2" size={24} />
            <p className="text-gray-400 text-sm">Total Cabinets</p>
            <p className="text-white text-2xl font-bold">
              {projectData.zones.reduce((acc, zone) => acc + zone.cabinets.length, 0)}
            </p>
          </div>
          <div className="glass-gold rounded-lg p-4">
            <DollarSign className="text-gold mb-2" size={24} />
            <p className="text-gray-400 text-sm">Avg per Zone</p>
            <p className="text-white text-2xl font-bold">
              ₹{(projectData.projectInfo.totalCost / projectData.zones.length / 100000).toFixed(2)}L
            </p>
          </div>
          <div className="glass-gold rounded-lg p-4">
            <Clock className="text-gold mb-2" size={24} />
            <p className="text-gray-400 text-sm">Timeline</p>
            <p className="text-white text-lg font-bold">{projectData.projectInfo.timeline}</p>
          </div>
        </div>
      </div>

      {/* Coohom Viewer Section */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Kitchen Visualization</h3>
          <div className="flex gap-2">
            <button
              onClick={handleExportFromCoohom}
              className="flex items-center gap-2 px-3 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
            >
              <Download size={16} />
              Export from Coohom
            </button>
            {/* FIX: proper anchor tag for "Open in Coohom" */}
            <a
              href={projectData.coohomProject.mainUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all text-sm font-medium"
            >
              <Eye size={16} />
              Open in Coohom
            </a>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => setSelectedView('3d')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedView === '3d' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
            }`}
          >
            3D View
          </button>
          <button
            onClick={() => setSelectedView('floor')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedView === 'floor' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
            }`}
          >
            Floor Plan
          </button>
          <button
            onClick={() => setSelectedView('zones')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedView === 'zones' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
            }`}
          >
            Zone Map
          </button>
        </div>

        {/* Coohom Embedded Viewer */}
        <div className="bg-luxury-gray rounded-xl overflow-hidden" style={{ height: '600px' }}>
          {selectedView === '3d' && (
            <iframe
              src={projectData.coohomProject.mainUrl}
              className="w-full h-full border-0"
              title="Coohom 3D View"
              allow="fullscreen"
            />
          )}
          {selectedView === 'floor' && (
            <iframe
              src={projectData.coohomProject.views?.floorPlan || projectData.coohomProject.mainUrl + '?view=floorplan'}
              className="w-full h-full border-0"
              title="Coohom Floor Plan"
              allow="fullscreen"
            />
          )}
          {selectedView === 'zones' && (
            <ZoneMap zones={projectData.zones} onZoneClick={handleZoneClick} />
          )}
        </div>

        {/* Coohom Tips */}
        <div className="mt-4 p-4 bg-luxury-dark rounded-lg border border-gold/20">
          <h4 className="text-sm font-bold text-gold mb-2">💡 Coohom Integration Tips</h4>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Use Coohom's Construction Drawings feature to export detailed plans</li>
            <li>• Select "Kitchen & Bath" mode for cabinet-specific drawings</li>
            <li>• Export as PDF/CAD for manufacturing documentation</li>
            <li>• Use "Part" selection to get component-level breakdowns</li>
          </ul>
        </div>
      </div>

      {/* Zones Quick Access */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Kitchen Zones</h3>
          <Map className="text-gold" size={24} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projectData.zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => handleZoneClick(zone.id)}
              className="glass-gold rounded-lg p-4 text-left hover:bg-gold hover:text-black transition-all group"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-lg">{zone.name}</h4>
                <ChevronRight className="text-gold group-hover:text-black" size={20} />
              </div>
              <p className="text-sm opacity-80 mb-3">{zone.description}</p>
              <div className="flex items-center justify-between text-xs mb-2">
                <span>{zone.cabinets.length} Cabinets</span>
                <span className="font-bold">₹{(zone.boq.total / 100000).toFixed(2)}L</span>
              </div>
              <div className="text-xs opacity-70">
                {zone.dimensions.width}mm × {zone.dimensions.depth}mm
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// Zone Map Component (Interactive SVG showing kitchen layout)
function ZoneMap({ zones, onZoneClick }) {
  const [hoveredZone, setHoveredZone] = useState(null)

  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        style={{ maxWidth: '800px', maxHeight: '600px' }}
      >
        {/* Background */}
        <rect x="0" y="0" width="800" height="600" fill="#1a1a1a" />
        
        {/* Grid */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#333" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="800" height="600" fill="url(#grid)" />

        {/* Zone A - Main Cooking (L-shape horizontal) */}
        <g
          onClick={() => onZoneClick('zone-a')}
          onMouseEnter={() => setHoveredZone('zone-a')}
          onMouseLeave={() => setHoveredZone(null)}
          className="cursor-pointer transition-opacity"
          opacity={hoveredZone && hoveredZone !== 'zone-a' ? 0.5 : 1}
        >
          <rect
            x="100"
            y="100"
            width="300"
            height="60"
            fill="#D4AF37"
            fillOpacity={hoveredZone === 'zone-a' ? 0.5 : 0.3}
            stroke="#D4AF37"
            strokeWidth="2"
            rx="4"
          />
          <text x="250" y="125" textAnchor="middle" fill="#D4AF37" fontSize="14" fontWeight="bold">
            Zone A
          </text>
          <text x="250" y="145" textAnchor="middle" fill="#999" fontSize="11">
            Main Cooking
          </text>
        </g>

        {/* Zone B - Storage (L-shape vertical) */}
        <g
          onClick={() => onZoneClick('zone-b')}
          onMouseEnter={() => setHoveredZone('zone-b')}
          onMouseLeave={() => setHoveredZone(null)}
          className="cursor-pointer transition-opacity"
          opacity={hoveredZone && hoveredZone !== 'zone-b' ? 0.5 : 1}
        >
          <rect
            x="100"
            y="160"
            width="60"
            height="200"
            fill="#D4AF37"
            fillOpacity={hoveredZone === 'zone-b' ? 0.5 : 0.3}
            stroke="#D4AF37"
            strokeWidth="2"
            rx="4"
          />
          <text x="130" y="250" textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" transform="rotate(-90 130 260)">
            Zone B: Storage
          </text>
        </g>

        {/* Zone C - Breakfast Counter */}
        <g
          onClick={() => onZoneClick('zone-c')}
          onMouseEnter={() => setHoveredZone('zone-c')}
          onMouseLeave={() => setHoveredZone(null)}
          className="cursor-pointer transition-opacity"
          opacity={hoveredZone && hoveredZone !== 'zone-c' ? 0.5 : 1}
        >
          <rect
            x="250"
            y="250"
            width="150"
            height="90"
            fill="#D4AF37"
            fillOpacity={hoveredZone === 'zone-c' ? 0.5 : 0.3}
            stroke="#D4AF37"
            strokeWidth="2"
            rx="4"
          />
          <text x="325" y="285" textAnchor="middle" fill="#D4AF37" fontSize="13" fontWeight="bold">
            Zone C
          </text>
          <text x="325" y="305" textAnchor="middle" fill="#999" fontSize="10">
            Breakfast Counter
          </text>
        </g>

        {/* Dimensions */}
        <g stroke="#666" strokeWidth="1">
          <line x1="100" y1="380" x2="400" y2="380" markerEnd="url(#arrowhead)"/>
          <line x1="400" y1="380" x2="100" y2="380" markerStart="url(#arrowhead2)"/>
        </g>
        <text x="250" y="395" textAnchor="middle" fill="#666" fontSize="10">3000mm</text>

        <g stroke="#666" strokeWidth="1">
          <line x1="80" y1="160" x2="80" y2="360" markerEnd="url(#arrowhead)"/>
          <line x1="80" y1="360" x2="80" y2="160" markerStart="url(#arrowhead2)"/>
        </g>
        <text x="60" y="260" textAnchor="middle" fill="#666" fontSize="10" transform="rotate(-90 60 260)">1800mm</text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
          </marker>
          <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto">
            <polygon points="10 0, 0 3.5, 10 7" fill="#666" />
          </marker>
        </defs>

        {/* Legend */}
        <g transform="translate(500, 100)">
          <rect x="-10" y="-15" width="180" height="90" fill="#0a0a0a" stroke="#333" strokeWidth="1" rx="4"/>
          <text x="0" y="0" fill="#999" fontSize="12" fontWeight="bold">Legend</text>
          <rect x="0" y="10" width="20" height="20" fill="#D4AF37" fillOpacity="0.3" stroke="#D4AF37" strokeWidth="1"/>
          <text x="25" y="25" fill="#999" fontSize="10">Kitchen Zone</text>
          <text x="0" y="50" fill="#666" fontSize="9">Click to view zone details</text>
          <text x="0" y="65" fill="#666" fontSize="9">Hover for highlight</text>
        </g>

        {/* Info panel for hovered zone */}
        {hoveredZone && zones.find(z => z.id === hoveredZone) && (
          <g transform="translate(500, 220)">
            <rect x="-10" y="-15" width="200" height="100" fill="#0a0a0a" stroke="#D4AF37" strokeWidth="2" rx="4"/>
            <text x="0" y="0" fill="#D4AF37" fontSize="13" fontWeight="bold">
              {zones.find(z => z.id === hoveredZone).name}
            </text>
            <text x="0" y="20" fill="#999" fontSize="10">
              {zones.find(z => z.id === hoveredZone).cabinets.length} Cabinets
            </text>
            <text x="0" y="35" fill="#999" fontSize="10">
              {zones.find(z => z.id === hoveredZone).dimensions.width}mm × {zones.find(z => z.id === hoveredZone).dimensions.depth}mm
            </text>
            <text x="0" y="55" fill="#D4AF37" fontSize="11" fontWeight="bold">
              ₹{(zones.find(z => z.id === hoveredZone).boq.total / 100000).toFixed(2)}L
            </text>
            <text x="0" y="75" fill="#666" fontSize="9">
              Click for details →
            </text>
          </g>
        )}
      </svg>
    </div>
  )
}

