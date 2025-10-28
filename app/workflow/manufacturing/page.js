```

---

## **4. CREATE: `/app/workflow/manufacturing/page.js`**
```javascript
// Path: /app/workflow/manufacturing/page.js
// Purpose: Manufacturing handoff with complete technical package

'use client'

import { useState } from 'react'
import { Package, FileText, Download, CheckSquare, Wrench, Truck, Calendar } from 'lucide-react'

export default function ManufacturingPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const manufacturingPackage = {
    projectId: 'DISHA-2025-001',
    clientName: 'Neeru Tiwary',
    approvalDate: '2025-01-15',
    startDate: '2025-01-22',
    estimatedCompletion: '2025-03-15',
    
    materials: {
      plywood: [
        { type: '18mm BWP', quantity: 156.4, unit: 'sqft', supplier: 'Greenply', status: 'ordered' },
        { type: '12mm BWP', quantity: 36.5, unit: 'sqft', supplier: 'Greenply', status: 'ordered' },
        { type: '18mm MDF', quantity: 30.9, unit: 'sqft', supplier: 'Century', status: 'ordered' }
      ],
      laminate: [
        { type: 'High Gloss White', quantity: 220, unit: 'sqft', supplier: 'Greenlam', status: 'ordered' }
      ],
      countertop: [
        { type: 'Quartz', quantity: 34.1, unit: 'sqft', supplier: 'Caesarstone', status: 'pending' }
      ],
      hardware: [
        { item: 'Soft-close Hinges', article: '311.20.851', quantity: 34, supplier: 'Hafele', status: 'ordered' },
        { item: 'Tandem Box 550mm', article: '432.16.963', quantity: 10, supplier: 'Hafele', status: 'ordered' }
      ]
    },
    
    cabinets: [
      { id: 'BC-001', name: 'Sink Base', status: 'ready', progress: 100 },
      { id: 'BC-002', name: 'Hob Unit', status: 'in-progress', progress: 60 },
      { id: 'BC-003', name: 'Prep Cabinet', status: 'pending', progress: 0 },
      { id: 'WC-001', name: 'Wall Cabinet 1', status: 'ready', progress: 100 },
      { id: 'WC-002', name: 'Wall Cabinet 2', status: 'in-progress', progress: 40 },
      { id: 'TU-001', name: 'Tall Unit 1', status: 'pending', progress: 0 },
      { id: 'TU-002', name: 'Tall Unit 2', status: 'pending', progress: 0 },
      { id: 'BC-004', name: 'Peninsula Unit', status: 'pending', progress: 0 }
    ],
    
    milestones: [
      { name: 'Material Procurement', date: '2025-01-22', status: 'in-progress' },
      { name: 'Cutting & Edging', date: '2025-01-29', status: 'pending' },
      { name: 'Assembly', date: '2025-02-05', status: 'pending' },
      { name: 'Finishing', date: '2025-02-19', status: 'pending' },
      { name: 'Quality Check', date: '2025-02-26', status: 'pending' },
      { name: 'Delivery', date: '2025-03-05', status: 'pending' },
      { name: 'Installation', date: '2025-03-08', status: 'pending' }
    ]
  }

  const documents = [
    { name: 'Complete Cut List', file: 'cut-list.xlsx', size: '245 KB', category: 'manufacturing' },
    { name: 'Hardware Schedule', file: 'hardware-schedule.pdf', size: '180 KB', category: 'manufacturing' },
    { name: 'Assembly Instructions', file: 'assembly-guide.pdf', size: '3.2 MB', category: 'manufacturing' },
    { name: 'Construction Drawings', file: 'construction-drawings.pdf', size: '8.5 MB', category: 'technical' },
    { name: 'Part Drawings - BC-001', file: 'BC-001-parts.pdf', size: '420 KB', category: 'technical' },
    { name: 'Part Drawings - BC-002', file: 'BC-002-parts.pdf', size: '380 KB', category: 'technical' },
    { name: 'Hafele Purchase Order', file: 'hafele-po.pdf', size: '125 KB', category: 'procurement' },
    { name: 'Material Purchase Orders', file: 'material-po.pdf', size: '95 KB', category: 'procurement' },
    { name: 'Quality Control Checklist', file: 'qc-checklist.pdf', size: '210 KB', category: 'quality' }
  ]

  const calculateOverallProgress = () => {
    const total = manufacturingPackage.cabinets.length
    const completed = manufacturingPackage.cabinets.filter(c => c.status === 'ready').length
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
              Manufacturing Handoff
            </h1>
            <p className="text-gray-400">
              Complete technical package for production
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
            <p className="text-4xl font-bold text-gold">{calculateOverallProgress()}%</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-1">Client</p>
              <p className="text-white font-bold">{manufacturingPackage.clientName}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Project ID</p>
              <p className="text-white font-mono">{manufacturingPackage.projectId}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Start Date</p>
              <p className="text-white font-bold">{manufacturingPackage.startDate}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Target Completion</p>
              <p className="text-white font-bold">{manufacturingPackage.estimatedCompletion}</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="glass rounded-xl p-4 mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {[
              { id: 'overview', name: 'Overview', icon: Package },
              { id: 'materials', name: 'Materials', icon: FileText },
              { id: 'cabinets', name: 'Cabinets', icon: CheckSquare },
              { id: 'documents', name: 'Documents', icon: Download },
              { id: 'timeline', name: 'Timeline', icon: Calendar }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-black'
                    : 'text-gray-400 hover:bg-white/10'
                }`}
              >
                <tab.icon size={18} />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <Package className="text-gold" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Total Cabinets</p>
                      <p className="text-3xl font-bold text-white">8</p>
                    </div>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">2 Ready</span>
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded">2 In Progress</span>
                    <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded">4 Pending</span>
                  </div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <Wrench className="text-gold" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Materials</p>
                      <p className="text-3xl font-bold text-white">95%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">Most materials ordered, countertop pending</p>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <Truck className="text-gold" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Days Remaining</p>
                      <p className="text-3xl font-bold text-white">35</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">On track for March 15 completion</p>
                </div>
              </div>

              <div className="glass rounded-xl p-6">
<h2 className="text-2xl font-bold text-white mb-4">Production Status</h2>
<div className="space-y-3">
{manufacturingPackage.cabinets.map(cabinet => (
<div key={cabinet.id} className="p-4 bg-luxury-gray rounded-lg">
<div className="flex items-center justify-between mb-2">
<div className="flex items-center gap-3">
<span className="font-mono font-bold text-white">{cabinet.id}</span>
<span className="text-gray-400">{cabinet.name}</span>
</div>
<span className={px-3 py-1 rounded-full text-xs font-medium ${                           cabinet.status === 'ready'                             ? 'bg-green-500/20 text-green-400'                             : cabinet.status === 'in-progress'                             ? 'bg-yellow-500/20 text-yellow-400'                             : 'bg-gray-500/20 text-gray-400'                         }}>
{cabinet.status.replace('-', ' ')}
</span>
</div>
<div className="w-full bg-luxury-dark rounded-full h-2">
<div
className={h-2 rounded-full transition-all ${                             cabinet.status === 'ready' ? 'bg-green-500' : 'bg-gold'                           }}
style={{ width: ${cabinet.progress}% }}
/>
</div>
<p className="text-xs text-gray-500 mt-1">{cabinet.progress}% complete</p>
</div>
))}
</div>
</div>
</>
)}
{/* Materials Tab */}
      {activeTab === 'materials' && (
        <>
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Plywood & Boards</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Material</th>
                    <th className="text-right text-gray-400 font-semibold py-3 px-4">Quantity</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Supplier</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingPackage.materials.plywood.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="py-4 px-4 text-white font-medium">{item.type}</td>
                      <td className="py-4 px-4 text-right text-white">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{item.supplier}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'ordered'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Laminate & Finishes</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Material</th>
                    <th className="text-right text-gray-400 font-semibold py-3 px-4">Quantity</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Supplier</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingPackage.materials.laminate.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="py-4 px-4 text-white font-medium">{item.type}</td>
                      <td className="py-4 px-4 text-right text-white">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{item.supplier}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'ordered'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Countertop</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Material</th>
                    <th className="text-right text-gray-400 font-semibold py-3 px-4">Quantity</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Supplier</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingPackage.materials.countertop.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="py-4 px-4 text-white font-medium">{item.type}</td>
                      <td className="py-4 px-4 text-right text-white">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="py-4 px-4 text-gray-400">{item.supplier}</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Hardware (Hafele)</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gold/20">
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Item</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Article No.</th>
                    <th className="text-right text-gray-400 font-semibold py-3 px-4">Quantity</th>
                    <th className="text-left text-gray-400 font-semibold py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {manufacturingPackage.materials.hardware.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-800">
                      <td className="py-4 px-4 text-white font-medium">{item.item}</td>
                      <td className="py-4 px-4 text-gray-400 font-mono text-sm">{item.article}</td>
                      <td className="py-4 px-4 text-right text-white">{item.quantity} pcs</td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Cabinets Tab */}
      {activeTab === 'cabinets' && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Cabinet Production Tracker</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {manufacturingPackage.cabinets.map(cabinet => (
              <div key={cabinet.id} className="p-6 bg-luxury-gray rounded-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{cabinet.id}</h3>
                    <p className="text-gray-400">{cabinet.name}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    cabinet.status === 'ready'
                      ? 'bg-green-500/20 text-green-400'
                      : cabinet.status === 'in-progress'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {cabinet.status.replace('-', ' ')}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white font-bold">{cabinet.progress}%</span>
                  </div>
                  <div className="w-full bg-luxury-dark rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        cabinet.status === 'ready' ? 'bg-green-500' : 'bg-gold'
                      }`}
                      style={{ width: `${cabinet.progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <button className="w-full flex items-center justify-between p-3 bg-luxury-dark rounded-lg hover:bg-white/5 transition-all text-sm">
                    <span className="text-gray-400">View Part Drawings</span>
                    <Download size={16} className="text-gold" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-luxury-dark rounded-lg hover:bg-white/5 transition-all text-sm">
                    <span className="text-gray-400">View Cut List</span>
                    <Download size={16} className="text-gold" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-luxury-dark rounded-lg hover:bg-white/5 transition-all text-sm">
                    <span className="text-gray-400">Assembly Instructions</span>
                    <Download size={16} className="text-gold" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Technical Documentation</h2>
          
          <div className="space-y-6">
            {['manufacturing', 'technical', 'procurement', 'quality'].map(category => (
              <div key={category}>
                <h3 className="text-lg font-bold text-gold mb-3 capitalize">{category} Documents</h3>
                <div className="space-y-2">
                  {documents.filter(doc => doc.category === category).map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-luxury-gray rounded-lg hover:bg-white/5 transition-all">
                      <div className="flex items-center gap-3">
                        <FileText size={24} className="text-gold" />
                        <div>
                          <p className="text-white font-medium">{doc.name}</p>
                          <p className="text-gray-400 text-sm">{doc.size}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all">
                        <Download size={16} />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gold/10 border border-gold/30 rounded-xl">
            <h3 className="text-lg font-bold text-gold mb-3">📦 Download Complete Package</h3>
            <p className="text-gray-300 mb-4">
              Download all documents as a single ZIP file for offline access
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-gold text-black rounded-lg hover:bg-gold-light transition-all font-semibold">
              <Download size={20} />
              Download All Documents (24.5 MB)
            </button>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === 'timeline' && (
        <div className="glass rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Production Timeline</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gold/30"></div>

            <div className="space-y-8">
              {manufacturingPackage.milestones.map((milestone, idx) => (
                <div key={idx} className="relative pl-16">
                  {/* Timeline dot */}
                  <div className={`absolute left-3 w-6 h-6 rounded-full border-4 ${
                    milestone.status === 'completed'
                      ? 'bg-green-500 border-green-500'
                      : milestone.status === 'in-progress'
                      ? 'bg-gold border-gold animate-pulse'
                      : 'bg-luxury-gray border-gray-600'
                  }`}></div>

                  <div className="p-6 bg-luxury-gray rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{milestone.name}</h3>
                        <p className="text-gray-400">{milestone.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        milestone.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : milestone.status === 'in-progress'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {milestone.status.replace('-', ' ')}
                      </span>
                    </div>

                    {milestone.status === 'in-progress' && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-bold">65%</span>
                        </div>
                        <div className="w-full bg-luxury-dark rounded-full h-2">
                          <div className="bg-gold h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-6 bg-luxury-gray rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Estimated Completion</h3>
                <p className="text-gray-400">March 15, 2025</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Days Remaining</p>
                <p className="text-4xl font-bold text-gold">35</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>

  </div>
</div>
)
}
