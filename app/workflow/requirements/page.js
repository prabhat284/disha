// Path: /app/workflow/requirements/page.js
// Purpose: Capture client requirements and generate project JSON

'use client'

import { useState } from 'react'
import { Download, Save, CheckCircle, AlertCircle } from 'lucide-react'

export default function RequirementsPage() {
  const [formData, setFormData] = useState({
    // Client Information
    clientInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      projectLocation: ''
    },
    
    // Space Information
    spaceInfo: {
      layoutType: 'L-shaped', // L-shaped, U-shaped, Parallel, Island
      totalArea: '',
      existingKitchen: false,
      ceilingHeight: 2700,
      floorPlanAvailable: false
    },
    
    // Kitchen Usage
    usage: {
      familySize: '',
      cookingFrequency: 'daily', // daily, occasional, frequent
      cuisineType: [], // indian, continental, chinese, baking
      primaryCook: '', // homemaker, professional, multiple
      entertainingFrequency: 'occasional' // never, occasional, frequent
    },
    
    // Zones & Functionality
    zones: {
      cooking: { required: true, priority: 'high' },
      prep: { required: true, priority: 'high' },
      storage: { required: true, priority: 'high' },
      pantry: { required: false, priority: 'medium' },
      breakfast: { required: false, priority: 'low' },
      cleaning: { required: true, priority: 'high' }
    },
    
    // Appliances
    appliances: {
      existing: [],
      new: [],
      preferences: {
        hob: { type: 'gas', burners: 4 }, // gas, induction, mixed
        oven: { required: false, type: 'builtin' },
        microwave: { required: true, type: 'countertop' },
        dishwasher: { required: false },
        refrigerator: { size: 'double-door', location: 'kitchen' },
        chimney: { required: true, type: 'filterless' },
        waterPurifier: { required: true, type: 'wall-mounted' }
      }
    },
    
    // Storage Needs
    storage: {
      utensils: { quantity: 'high', type: 'drawers' },
      groceries: { quantity: 'medium', type: 'pantry' },
      spices: { quantity: 'high', organization: 'pull-out' },
      cookware: { quantity: 'high', type: 'deep-drawers' },
      smallAppliances: { quantity: 'medium', location: 'countertop' },
      crockery: { quantity: 'medium', display: false }
    },
    
    // Design Preferences
    design: {
      style: 'contemporary', // modern, contemporary, traditional, minimalist, industrial
      colorScheme: [],
      finishes: {
        cabinets: 'laminate', // laminate, veneer, lacquer, acrylic
        countertop: 'quartz', // granite, quartz, marble, solid-surface
        backsplash: 'tiles' // tiles, glass, stone, stainless-steel
      },
      handleStyle: 'handleless', // handles, knobs, handleless, mixed
      inspirationImages: []
    },
    
    // Budget
    budget: {
      range: 'mid', // budget: <6L, mid: 6-12L, premium: >12L
      maxBudget: '',
      flexibility: 'moderate', // strict, moderate, flexible
      priorities: [] // quality, aesthetics, functionality, timeline
    },
    
    // Special Requirements
    special: {
      accessibility: false,
      childSafety: false,
      petFriendly: false,
      ecoFriendly: false,
      smartFeatures: false,
      workTriangle: true
    },
    
    // Timeline
    timeline: {
      projectStart: '',
      desiredCompletion: '',
      flexibility: 'moderate', // strict, moderate, flexible
      moveInDate: '',
      urgency: 'normal' // urgent, normal, flexible
    },
    
    // Utilities & Infrastructure
    utilities: {
      electrical: {
        currentLoad: '',
        upgradeNeeded: false,
        socketLocations: []
      },
      plumbing: {
        waterPressure: 'adequate',
        hotWaterSource: 'geyser',
        existingConnections: []
      },
      gas: {
        pipelineAvailable: true,
        cylinderStorage: 'inside'
      },
      ventilation: {
        windows: true,
        exhaust: true,
        naturalLight: 'adequate'
      }
    }
  })

  const [generatedJSON, setGeneratedJSON] = useState(null)
  const [validationErrors, setValidationErrors] = useState([])

  // Handle form updates
  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  // Validate form
  const validateForm = () => {
    const errors = []
    
    if (!formData.clientInfo.name) errors.push('Client name is required')
    if (!formData.clientInfo.email) errors.push('Client email is required')
    if (!formData.spaceInfo.totalArea) errors.push('Kitchen area is required')
    if (!formData.budget.maxBudget) errors.push('Budget range is required')
    
    setValidationErrors(errors)
    return errors.length === 0
  }

  // Generate project JSON
  const generateJSON = () => {
    if (!validateForm()) {
      alert('Please fill all required fields')
      return
    }

    const projectConfig = {
      projectId: `DISHA-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'requirements-captured',
      phase: 'requirement',
      
      ...formData,
      
      // Auto-generate recommended zones based on inputs
      recommendedZones: generateRecommendedZones(formData),
      
      // Auto-calculate estimated timeline
      estimatedTimeline: calculateTimeline(formData),
      
      // Auto-calculate preliminary budget breakdown
      preliminaryBudget: calculatePreliminaryBudget(formData),
      
      // Generate design constraints
      designConstraints: generateConstraints(formData)
    }

    setGeneratedJSON(projectConfig)
  }

  // Helper: Generate recommended zones
  const generateRecommendedZones = (data) => {
    const zones = []
    
    if (data.zones.cooking.required) {
      zones.push({
        id: 'zone-cooking',
        name: 'Cooking & Prep Zone',
        priority: data.zones.cooking.priority,
        estimatedLength: 3000,
        cabinets: ['BC-hob', 'BC-prep', 'WC-storage']
      })
    }
    
    if (data.zones.storage.required) {
      zones.push({
        id: 'zone-storage',
        name: 'Storage & Pantry Zone',
        priority: data.zones.storage.priority,
        estimatedLength: 1800,
        cabinets: ['TU-pantry', 'TU-storage']
      })
    }
    
    if (data.zones.breakfast.required) {
      zones.push({
        id: 'zone-breakfast',
        name: 'Breakfast Counter',
        priority: data.zones.breakfast.priority,
        estimatedLength: 1200,
        cabinets: ['BC-breakfast']
      })
    }
    
    return zones
  }

  // Helper: Calculate timeline
  const calculateTimeline = (data) => {
    let weeks = 6 // Base timeline
    
    if (data.spaceInfo.totalArea > 150) weeks += 2
    if (data.appliances.new.length > 5) weeks += 1
    if (data.special.smartFeatures) weeks += 1
    if (data.budget.range === 'premium') weeks += 2
    
    return {
      estimated: `${weeks}-${weeks + 2} weeks`,
      breakdown: {
        design: '1-2 weeks',
        approval: '3-5 days',
        procurement: '2-3 weeks',
        manufacturing: '2-3 weeks',
        installation: '1 week'
      }
    }
  }

  // Helper: Calculate preliminary budget
  const calculatePreliminaryBudget = (data) => {
    const baseRate = {
      'budget': 5000,
      'mid': 7500,
      'premium': 10000
    }
    
    const rate = baseRate[data.budget.range]
    const area = parseInt(data.spaceInfo.totalArea) || 100
    const baseCost = rate * area
    
    return {
      estimated: baseCost,
      breakdown: {
        cabinets: baseCost * 0.45,
        countertop: baseCost * 0.20,
        appliances: baseCost * 0.20,
        hardware: baseCost * 0.10,
        labor: baseCost * 0.15
      },
      confidence: 'preliminary'
    }
  }

  // Helper: Generate constraints
  const generateConstraints = (data) => {
    return {
      maxCabinetHeight: data.spaceInfo.ceilingHeight - 450,
      workTriangleRequired: data.special.workTriangle,
      accessibilityCompliance: data.special.accessibility,
      childSafetyFeatures: data.special.childSafety,
      budgetCeiling: parseInt(data.budget.maxBudget),
      styleGuidelines: data.design.style
    }
  }

  // Download JSON
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(generatedJSON, null, 2)], { 
      type: 'application/json' 
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${formData.clientInfo.name.replace(/\s+/g, '-')}-requirements.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
            Kitchen Requirements Capture
          </h1>
          <p className="text-gray-400">
            Complete this form to generate your project configuration file
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Phase 1: Requirements</span>
            <span className="text-gold text-sm">Step 1 of 5</span>
          </div>
          <div className="w-full bg-luxury-gray rounded-full h-2">
            <div className="bg-gold h-2 rounded-full" style={{ width: '20%' }}></div>
          </div>
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          
          {/* Client Information */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Client Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.clientInfo.name}
                  onChange={(e) => updateField('clientInfo', 'name', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email *</label>
                <input
                  type="email"
                  value={formData.clientInfo.email}
                  onChange={(e) => updateField('clientInfo', 'email', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="client@example.com"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.clientInfo.phone}
                  onChange={(e) => updateField('clientInfo', 'phone', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">City</label>
                <input
                  type="text"
                  value={formData.clientInfo.city}
                  onChange={(e) => updateField('clientInfo', 'city', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="Jamshedpur"
                />
              </div>
            </div>
          </div>

          {/* Space Information */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Space Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Layout Type *</label>
                <select
                  value={formData.spaceInfo.layoutType}
                  onChange={(e) => updateField('spaceInfo', 'layoutType', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                >
                  <option value="L-shaped">L-Shaped</option>
                  <option value="U-shaped">U-Shaped</option>
                  <option value="Parallel">Parallel/Galley</option>
                  <option value="Island">Island</option>
                  <option value="Single-wall">Single Wall</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Total Area (sq ft) *</label>
                <input
                  type="number"
                  value={formData.spaceInfo.totalArea}
                  onChange={(e) => updateField('spaceInfo', 'totalArea', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="120"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Ceiling Height (mm)</label>
                <input
                  type="number"
                  value={formData.spaceInfo.ceilingHeight}
                  onChange={(e) => updateField('spaceInfo', 'ceilingHeight', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="2700"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.spaceInfo.existingKitchen}
                  onChange={(e) => updateField('spaceInfo', 'existingKitchen', e.target.checked)}
                  className="w-4 h-4 text-gold bg-luxury-gray border-gold/20 rounded focus:ring-gold"
                />
                <label className="ml-2 text-gray-400 text-sm">Existing Kitchen (Renovation)</label>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Budget</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Budget Range *</label>
                <select
                  value={formData.budget.range}
                  onChange={(e) => updateField('budget', 'range', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                >
                  <option value="budget">Budget (&lt; ₹6 Lakhs)</option>
                  <option value="mid">Mid-Range (₹6-12 Lakhs)</option>
                  <option value="premium">Premium (&gt; ₹12 Lakhs)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Maximum Budget (₹) *</label>
                <input
                  type="number"
                  value={formData.budget.maxBudget}
                  onChange={(e) => updateField('budget', 'maxBudget', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                  placeholder="1000000"
                />
              </div>
            </div>
          </div>

          {/* Design Preferences */}
          <div className="glass rounded-xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Design Preferences</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Style</label>
                <select
                  value={formData.design.style}
                  onChange={(e) => updateField('design', 'style', e.target.value)}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                >
                  <option value="modern">Modern Minimalist</option>
                  <option value="contemporary">Contemporary Warm</option>
                  <option value="traditional">Traditional</option>
                  <option value="industrial">Industrial Chic</option>
                  <option value="scandinavian">Scandinavian</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Cabinet Finish</label>
                <select
                  value={formData.design.finishes.cabinets}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      design: {
                        ...prev.design,
                        finishes: {
                          ...prev.design.finishes,
                          cabinets: e.target.value
                        }
                      }
                    }))
                  }}
                  className="w-full px-4 py-2 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none"
                >
                  <option value="laminate">Laminate</option>
                  <option value="veneer">Veneer</option>
                  <option value="lacquer">Lacquer</option>
                  <option value="acrylic">Acrylic</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="glass rounded-xl p-4 mt-6 border border-red-500/50">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
              <div>
                <h3 className="text-red-500 font-semibold mb-2">Please fix the following:</h3>
                <ul className="text-red-400 text-sm space-y-1">
                  {validationErrors.map((error, idx) => (
                    <li key={idx}>• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={generateJSON}
            className="flex items-center gap-2 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all"
          >
            <CheckCircle size={20} />
            Generate Project Config
          </button>
          
          {generatedJSON && (
            <button
              onClick={downloadJSON}
              className="flex items-center gap-2 px-6 py-3 glass-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-all"
            >
              <Download size={20} />
              Download JSON
            </button>
          )}
        </div>

        {/* Generated JSON Preview */}
        {generatedJSON && (
          <div className="glass rounded-xl p-6 mt-8">
            <h3 className="text-xl font-bold text-white mb-4">Generated Configuration</h3>
            <pre className="bg-luxury-gray p-4 rounded-lg overflow-auto max-h-96 text-xs text-gray-300">
              {JSON.stringify(generatedJSON, null, 2)}
            </pre>
          </div>
        )}

      </div>
    </div>
  )
}
