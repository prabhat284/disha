// Path: /components/kitchen/ZoneDetails.js
// Purpose: Level 2 - Detailed view of a selected zone with Coohom integration

'use client'

import { useState } from 'react'
import { ArrowLeft, Eye, Download, Maximize2, Grid, List, Zap, Droplet, Plug } from 'lucide-react'

export default function ZoneDetails({ zone, onBack, onCabinetSelect, manufacturingData }) {
  const [viewMode, setViewMode] = useState('3d')
  const [showUtilities, setShowUtilities] = useState(false)

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="glass rounded-xl p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gold hover:text-gold-light transition-all mb-4"
        >
          <ArrowLeft size={20} />
          <span>Back to Project Overview</span>
        </button>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{zone.name}</h2>
            <p className="text-gray-400 mb-2">{zone.description}</p>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>📍 {zone.location}</span>
              <span>📏 {zone.dimensions.width}mm × {zone.dimensions.depth}mm × {zone.dimensions.wallHeight}mm</span>
              <span>📦 {zone.cabinets.length} Cabinets</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Zone Budget</p>
            <p className="text-3xl font-bold text-gold">₹{(zone.boq.total / 100000).toFixed(2)}L</p>
          </div>
        </div>
      </div>

      {/* Coohom Zone Viewer */}
      <div className="glass rounded-xl p-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h3 className="text-xl font-bold text-white">Zone Visualization</h3>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setViewMode('3d')}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                viewMode === '3d' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
              }`}
            >
              3D View
            </button>
            <button
              onClick={() => setViewMode('floor')}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                viewMode === 'floor' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
              }`}
            >
              Floor Plan
            </button>
            <button
              onClick={() => setViewMode('elevation')}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                viewMode === 'elevation' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
              }`}
            >
              Elevation
            </button>
            <button
              onClick={() => setViewMode('render')}
              className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                viewMode === 'render' ? 'bg-gold text-black' : 'glass-gold text-gold hover:bg-gold/20'
              }`}
            >
              Render
            </button>
            {/* FIX: proper anchor tag */}
            <a
              href={zone.coohomView.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all text-sm font-medium"
            >
              <Maximize2 size={16} />
              Full Screen
            </a>
          </div>
        </div>

        {/* Coohom Embedded Viewer for Zone */}
        <div className="bg-luxury-gray rounded-xl overflow-hidden" style={{ height: '500px' }}>
          {viewMode === '3d' && (
            <iframe
              src={zone.coohomView.url}
              className="w-full h-full border-0"
              title={`${zone.name} - 3D View`}
              allow="fullscreen"
            />
          )}
          {viewMode === 'floor' && (
            <iframe
              src={zone.coohomView.floorPlanUrl}
              className="w-full h-full border-0"
              title={`${zone.name} - Floor Plan`}
              allow="fullscreen"
            />
          )}
          {viewMode === 'elevation' && (
            zone.drawings?.coohomExports?.elevation ? (
              <img
                src={zone.drawings.coohomExports.elevation}
                alt={`${zone.name} Elevation`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">Elevation drawing not yet exported from Coohom</p>
                  {/* FIX: proper anchor tag */}
                  <a
                    href={zone.coohomView.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all inline-flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Export from Coohom
                  </a>
                </div>
              </div>
            )
          )}
          {viewMode === 'render' && (
            zone.drawings?.coohomExports?.render ? (
              <img
                src={zone.drawings.coohomExports.render}
                alt={`${zone.name} Render`}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <p className="text-gray-400 mb-4">High-res render not yet exported from Coohom</p>
                  {/* FIX: proper anchor tag */}
                  <a
                    href={zone.coohomView.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all inline-flex items-center gap-2"
                  >
                    <Download size={16} />
                    Export 4K Render
                  </a>
                </div>
              </div>
            )
          )}
        </div>

        {/* Export Options */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {zone.drawings?.plan && (
            /* FIX: proper anchor tag */
            <a
              href={zone.drawings.plan}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
            >
              <Download size={14} />
              Plan PDF
            </a>
          )}
          {zone.drawings?.elevation && (
            <a
              href={zone.drawings.elevation}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
            >
              <Download size={14} />
              Elevation PDF
            </a>
          )}
          {zone.drawings?.section && (
            <a
              href={zone.drawings.section}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm"
            >
              <Download size={14} />
              Section PDF
            </a>
          )}
        </div>
      </div>

      {/* Zone Details Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cabinets List */}
        <div className="lg:col-span-2">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Grid size={20} className="text-gold" />
                Cabinets in this Zone
              </h3>
              <span className="text-gray-400 text-sm">{zone.cabinets.length} units</span>
            </div>

            <div className="space-y-3">
              {zone.cabinets.map((cabinetId) => {
                const cabinetData = manufacturingData?.[cabinetId]
                return (
                  <button
                    key={cabinetId}
                    onClick={() => onCabinetSelect(cabinetId)}
                    className="w-full glass-gold rounded-lg p-4 text-left hover:bg-gold hover:text-black transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono font-bold">{cabinetId}</span>
                          <span className="px-2 py-1 bg-gold/20 text-gold group-hover:bg-black group-hover:text-gold rounded text-xs">
                            {cabinetId.startsWith('BC') ? 'Base' : cabinetId.startsWith('WC') ? 'Wall' : 'Tall'}
                          </span>
                        </div>
                        {cabinetData && (
                          <>
                            <p className="text-sm opacity-90 mb-1">{cabinetData.name}</p>
                            <p className="text-xs opacity-70">
                              {cabinetData.dimensions.width}×{cabinetData.dimensions.depth}×{cabinetData.dimensions.height}mm
                            </p>
                          </>
                        )}
                      </div>
                      <div className="text-right">
                        <List size={20} className="text-gold group-hover:text-black" />
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Appliances */}
          {zone.appliances && zone.appliances.length > 0 && (
            <div className="glass rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Appliances</h3>
              <div className="space-y-3">
                {zone.appliances.map((appliance, idx) => (
                  <div key={idx} className="glass-gold rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-white capitalize mb-1">{appliance.type}</p>
                        <p className="text-sm text-gray-400 mb-2">{appliance.model}</p>
                        <p className="text-xs text-gray-500">Position: {appliance.position}</p>
                        {appliance.cutoutSize && (
                          <p className="text-xs text-gray-500">
                            Cutout: {appliance.cutoutSize.width}mm × {appliance.cutoutSize.depth}mm
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Zone Info */}
        <div className="space-y-6">
          {/* Measurements */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Key Measurements</h3>
            <div className="space-y-3">
              {Object.entries(zone.measurements).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-white font-mono font-bold">{value}mm</span>
                </div>
              ))}
            </div>
          </div>

          {/* Utilities */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">Utilities</h3>
              <button
                onClick={() => setShowUtilities(!showUtilities)}
                className="text-gold hover:text-gold-light text-sm"
              >
                {showUtilities ? 'Hide' : 'Show'}
              </button>
            </div>

            {showUtilities && (
              <div className="space-y-4">
                {/* Electrical */}
                {zone.utilities?.electrical && zone.utilities.electrical.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Plug size={16} className="text-gold" />
                      <h4 className="font-semibold text-white text-sm">Electrical</h4>
                    </div>
                    {zone.utilities.electrical.map((item, idx) => (
                      <div key={idx} className="text-xs text-gray-400 ml-6 mb-1">
                        • {item.type} - {item.location} ({item.rating || item.quantity})
                      </div>
                    ))}
                  </div>
                )}

                {/* Plumbing */}
                {zone.utilities?.plumbing && zone.utilities.plumbing.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Droplet size={16} className="text-gold" />
                      <h4 className="font-semibold text-white text-sm">Plumbing</h4>
                    </div>
                    {zone.utilities.plumbing.map((item, idx) => (
                      <div key={idx} className="text-xs text-gray-400 ml-6 mb-1">
                        • {item.type} - {item.location} ({item.size})
                      </div>
                    ))}
                  </div>
                )}

                {/* Gas */}
                {zone.utilities?.gas && zone.utilities.gas.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={16} className="text-gold" />
                      <h4 className="font-semibold text-white text-sm">Gas</h4>
                    </div>
                    {zone.utilities.gas.map((item, idx) => (
                      <div key={idx} className="text-xs text-gray-400 ml-6 mb-1">
                        • {item.type} - {item.location} ({item.size})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Zone BOQ */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Cost Breakdown</h3>
            <div className="space-y-2">
              {Object.entries(zone.boq).map(([key, value]) => {
                if (key === 'total') return null
                return (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm capitalize">{key}</span>
                    <span className="text-white font-medium">₹{(value / 1000).toFixed(1)}K</span>
                  </div>
                )
              })}
              <div className="border-t border-gold/20 pt-2 mt-2 flex justify-between items-center">
                <span className="text-gold font-bold">Total</span>
                <span className="text-gold text-xl font-bold">₹{(zone.boq.total / 100000).toFixed(2)}L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coohom Export Instructions */}
      <div className="glass rounded-xl p-6 border border-gold/20">
        <h3 className="text-lg font-bold text-white mb-3">📋 How to Export Drawings from Coohom</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <p className="font-semibold text-gold mb-2">For Construction Drawings:</p>
            <ol className="space-y-1 ml-4 list-decimal">
              <li>Open project in Coohom</li>
              <li>Go to &quot;Drawings & Schedules&quot; tab</li>
              <li>Select &quot;Construction Drawings&quot;</li>
              <li>Choose &quot;Kitchen & Bath&quot; type</li>
              <li>Select specific zone cabinets</li>
              <li>Click &quot;Download&quot; → Choose PDF/CAD</li>
            </ol>
          </div>
          <div>
            <p className="font-semibold text-gold mb-2">For High-Res Renders:</p>
            <ol className="space-y-1 ml-4 list-decimal">
              <li>Set camera angle for zone view</li>
              <li>Go to &quot;Images/Videos & Light&quot;</li>
              <li>Choose 4K resolution</li>
              <li>Adjust lighting settings</li>
              <li>Click &quot;Render Image&quot;</li>
              <li>Download when complete</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

