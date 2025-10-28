// Path: /app/workflow/design-guide/page.js
// Purpose: Step-by-step design workflow checklist for designers

'use client'

import { useState, useEffect } from 'react'
import { CheckCircle, Circle, ChevronRight, ChevronDown, Download, Upload, AlertTriangle, Info } from 'lucide-react'

export default function DesignGuidePage() {
  const [projectData, setProjectData] = useState(null)
  const [checklist, setChecklist] = useState(designWorkflowChecklist)
  const [currentPhase, setCurrentPhase] = useState('concept')
  const [expandedSections, setExpandedSections] = useState({})

  // Load project requirements
  const loadProjectFile = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          setProjectData(data)
          initializeChecklistFromProject(data)
        } catch (error) {
          alert('Invalid JSON file')
        }
      }
      reader.readAsText(file)
    }
  }

  // Initialize checklist based on project requirements
  const initializeChecklistFromProject = (data) => {
    // Auto-check items based on project data
    const updated = { ...checklist }
    
    if (data.spaceInfo?.floorPlanAvailable) {
      updated.concept.steps[0].completed = true
    }
    
    setChecklist(updated)
  }

  // Toggle section expand/collapse
  const toggleSection = (phaseId, sectionId) => {
    const key = `${phaseId}-${sectionId}`
    setExpandedSections(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  // Mark step as complete
  const toggleStepComplete = (phaseId, sectionIndex, stepIndex) => {
    setChecklist(prev => {
      const updated = { ...prev }
      const step = updated[phaseId].steps[sectionIndex].items[stepIndex]
      step.completed = !step.completed
      
      // Auto-calculate section progress
      const section = updated[phaseId].steps[sectionIndex]
      const completedSteps = section.items.filter(item => item.completed).length
      section.progress = Math.round((completedSteps / section.items.length) * 100)
      
      // Auto-calculate phase progress
      const totalSteps = updated[phaseId].steps.reduce((acc, s) => acc + s.items.length, 0)
      const completedTotal = updated[phaseId].steps.reduce((acc, s) => 
        acc + s.items.filter(item => item.completed).length, 0)
      updated[phaseId].progress = Math.round((completedTotal / totalSteps) * 100)
      
      return updated
    })
  }

  // Download progress report
  const downloadProgress = () => {
    const report = {
      projectId: projectData?.projectId || 'N/A',
      clientName: projectData?.clientInfo?.name || 'N/A',
      reportDate: new Date().toISOString(),
      checklist: checklist,
      overallProgress: calculateOverallProgress()
    }
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `design-progress-${Date.now()}.json`
    a.click()
  }

  // Calculate overall progress
  const calculateOverallProgress = () => {
    const phases = Object.values(checklist)
    const totalProgress = phases.reduce((acc, phase) => acc + phase.progress, 0)
    return Math.round(totalProgress / phases.length)
  }

  const phases = Object.keys(checklist)
  const currentPhaseData = checklist[currentPhase]

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
              Design Workflow Guide
            </h1>
            <p className="text-gray-400">
              Follow this step-by-step checklist to ensure nothing is missed
            </p>
          </div>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 px-4 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all cursor-pointer">
              <Upload size={18} />
              Load Project
              <input
                type="file"
                accept=".json"
                onChange={loadProjectFile}
                className="hidden"
              />
            </label>
            <button
              onClick={downloadProgress}
              className="flex items-center gap-2 px-4 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all"
            >
              <Download size={18} />
              Export Progress
            </button>
          </div>
        </div>

        {/* Project Info Card */}
        {projectData && (
          <div className="glass rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-xl mb-1">
                  {projectData.clientInfo.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {projectData.spaceInfo.layoutType} • {projectData.spaceInfo.totalArea} sq ft • 
                  Budget: ₹{(projectData.budget.maxBudget / 100000).toFixed(2)}L
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
                <p className="text-3xl font-bold text-gold">{calculateOverallProgress()}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Phase Navigation */}
        <div className="glass rounded-xl p-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto">
            {phases.map((phase, idx) => {
              const phaseData = checklist[phase]
              const isActive = currentPhase === phase
              const isCompleted = phaseData.progress === 100
              
              return (
                <div key={phase} className="flex items-center flex-shrink-0">
                  <button
                    onClick={() => setCurrentPhase(phase)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      isActive 
                        ? 'bg-gold text-black' 
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-luxury-gray text-gray-400 hover:bg-gold/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <CheckCircle size={18} />
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-xs">
                          {idx + 1}
                        </span>
                      )}
                      <span className="capitalize">{phaseData.name}</span>
                    </div>
                    <p className="text-xs mt-1">{phaseData.progress}% complete</p>
                  </button>
                  {idx < phases.length - 1 && (
                    <ChevronRight className="text-gray-600 mx-2" size={20} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Current Phase Content */}
        <div className="space-y-6">
          
          {/* Phase Header */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  {currentPhaseData.name}
                </h2>
                <p className="text-gray-400">{currentPhaseData.description}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm mb-1">Phase Progress</p>
                <p className="text-4xl font-bold text-gold">{currentPhaseData.progress}%</p>
              </div>
            </div>
            <div className="w-full bg-luxury-gray rounded-full h-3">
              <div 
                className="bg-gold h-3 rounded-full transition-all duration-500"
                style={{ width: `${currentPhaseData.progress}%` }}
              />
            </div>
          </div>

          {/* Phase Sections */}
          {currentPhaseData.steps.map((section, sectionIdx) => {
            const sectionKey = `${currentPhase}-${sectionIdx}`
            const isExpanded = expandedSections[sectionKey] !== false // default expanded
            
            return (
              <div key={sectionIdx} className="glass rounded-xl overflow-hidden">
                
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(currentPhase, sectionIdx)}
                  className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      section.progress === 100 
                        ? 'bg-green-600' 
                        : section.progress > 0
                        ? 'bg-gold/20'
                        : 'bg-luxury-gray'
                    }`}>
                      {section.progress === 100 ? (
                        <CheckCircle className="text-white" size={24} />
                      ) : (
                        <span className="text-gold font-bold">{section.progress}%</span>
                      )}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-white mb-1">{section.title}</h3>
                      <p className="text-gray-400 text-sm">
                        {section.items.filter(i => i.completed).length} of {section.items.length} completed
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="text-gray-400" size={24} />
                  ) : (
                    <ChevronRight className="text-gray-400" size={24} />
                  )}
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className="px-6 pb-6 space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          item.completed
                            ? 'border-green-600 bg-green-600/10'
                            : item.priority === 'critical'
                            ? 'border-red-500/50 bg-red-500/5'
                            : 'border-gold/20 bg-luxury-gray'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleStepComplete(currentPhase, sectionIdx, itemIdx)}
                            className="flex-shrink-0 mt-1"
                          >
                            {item.completed ? (
                              <CheckCircle className="text-green-500" size={24} />
                            ) : (
                              <Circle className="text-gray-500 hover:text-gold transition-colors" size={24} />
                            )}
                          </button>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h4 className={`font-semibold ${
                                item.completed ? 'text-gray-500 line-through' : 'text-white'
                              }`}>
                                {item.task}
                              </h4>
                              <span className={`px-2 py-1 rounded text-xs font-medium flex-shrink-0 ${
                                item.priority === 'critical'
                                  ? 'bg-red-500/20 text-red-400'
                                  : item.priority === 'high'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {item.priority}
                              </span>
                            </div>
                            
                            {item.description && (
                              <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                            )}
                            
                            {item.deliverable && (
                              <div className="flex items-center gap-2 text-sm text-gold">
                                <Info size={14} />
                                <span>Deliverable: {item.deliverable}</span>
                              </div>
                            )}
                            
                            {item.coohomAction && (
                              <div className="mt-2 p-2 bg-gold/10 border border-gold/30 rounded text-sm">
                                <p className="text-gold font-medium mb-1">Coohom Action:</p>
                                <p className="text-gray-300">{item.coohomAction}</p>
                              </div>
                            )}
                            
                            {item.warning && (
                              <div className="mt-2 flex items-start gap-2 text-sm text-yellow-400">
                                <AlertTriangle size={14} className="flex-shrink-0 mt-0.5" />
                                <span>{item.warning}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Phase Completion Actions */}
        {currentPhaseData.progress === 100 && (
          <div className="glass rounded-xl p-6 mt-8 border border-green-500/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-500" size={32} />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {currentPhaseData.name} Complete!
                  </h3>
                  <p className="text-gray-400">Ready to move to the next phase</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const nextPhaseIdx = phases.indexOf(currentPhase) + 1
                  if (nextPhaseIdx < phases.length) {
                    setCurrentPhase(phases[nextPhaseIdx])
                  }
                }}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold"
              >
                Proceed to Next Phase
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

// Design Workflow Checklist Data
const designWorkflowChecklist = {
  concept: {
    name: 'Concept Design',
    description: 'Initial design exploration and client alignment',
    progress: 0,
    steps: [
      {
        title: 'Requirements Analysis',
        progress: 0,
        items: [
          {
            task: 'Review client requirements file',
            description: 'Load and analyze the generated requirements JSON',
            priority: 'critical',
            deliverable: 'Requirements summary document',
            completed: false
          },
          {
            task: 'Site measurements verification',
            description: 'Visit site or verify provided floor plan measurements',
            priority: 'critical',
            deliverable: 'Verified measurements document',
            warning: 'Inaccurate measurements will cause installation issues',
            completed: false
          },
          {
            task: 'Photo documentation',
            description: 'Take photos of existing space from all angles',
            priority: 'high',
            deliverable: 'Photo documentation folder',
            completed: false
          },
          {
            task: 'Utilities mapping',
            description: 'Mark all electrical, plumbing, and gas connection points',
            priority: 'critical',
            deliverable: 'Utilities map overlay',
            completed: false
          }
        ]
      },
      {
        title: 'Space Planning',
        progress: 0,
        items: [
          {
            task: 'Create zone layout',
            description: 'Define cooking, prep, storage, and other zones based on requirements',
            priority: 'critical',
            deliverable: 'Zone layout diagram',
            completed: false
          },
          {
            task: 'Work triangle validation',
            description: 'Ensure optimal distances between sink, hob, and refrigerator',
            priority: 'high',
            deliverable: 'Work triangle diagram',
            completed: false
          },
          {
            task: 'Traffic flow analysis',
            description: 'Verify minimum 900mm clearances and movement paths',
            priority: 'high',
            completed: false
          },
          {
            task: 'Appliance placement',
            description: 'Position all appliances with proper clearances',
            priority: 'critical',
            deliverable: 'Appliance layout plan',
            completed: false
          }
        ]
      },
      {
        title: 'Initial Concepts',
        progress: 0,
        items: [
          {
            task: 'Create 3 design concepts',
            description: 'Develop Option A, B, and C with different styles',
            priority: 'critical',
            deliverable: '3 concept presentations',
            completed: false
          },
          {
            task: 'Mood boards',
            description: 'Create material, color, and finish mood boards for each option',
            priority: 'high',
            deliverable: '3 mood boards',
            completed: false
          },
          {
            task: 'Preliminary cost estimates',
            description: 'Calculate rough budgets for each concept',
            priority: 'high',
            deliverable: 'Cost comparison sheet',
            completed: false
          },
          {
            task: 'Client presentation',
            description: 'Present all 3 concepts and gather feedback',
            priority: 'critical',
            deliverable: 'Presentation deck',
            completed: false
          }
        ]
      }
    ]
  },
  
  detailed: {
    name: 'Detailed Design',
    description: 'Develop selected concept into complete specifications',
    progress: 0,
    steps: [
      {
        title: 'Coohom 3D Modeling',
        progress: 0,
        items: [
          {
            task: 'Create new Coohom project',
            description: 'Set up project with exact measurements',
            priority: 'critical',
            coohomAction: 'New Project → Interior Design → Set dimensions',
            completed: false
          },
          {
            task: 'Import floor plan',
            description: 'Upload and scale floor plan image',
            priority: 'critical',
            coohomAction: 'Floor Plan → Upload Image → Scale to known dimension',
            completed: false
          },
          {
            task: 'Place all base cabinets',
            description: 'Add all base cabinets with exact dimensions',
            priority: 'critical',
            coohomAction: 'Furniture → Kitchen & Bath → Base Cabinets',
            deliverable: 'Base cabinet layout',
            completed: false
          },
          {
            task: 'Place all wall cabinets',
            description: 'Add wall cabinets at correct heights (2220mm from floor)',
            priority: 'critical',
            coohomAction: 'Furniture → Kitchen & Bath → Wall Cabinets',
            completed: false
          },
          {
            task: 'Place all tall units',
            description: 'Add tall units with 150mm toe kick',
            priority: 'high',
            coohomAction: 'Furniture → Kitchen & Bath → Tall Cabinets',
            completed: false
          },
          {
            task: 'Add countertop',
            description: 'Apply countertop material with cutouts',
            priority: 'critical',
            coohomAction: 'Kitchen & Bath → Countertop → Custom Cutout for sink/hob',
            completed: false
          },
          {
            task: 'Add backsplash',
            description: 'Apply tile/material to backsplash area (600mm height)',
            priority: 'high',
            coohomAction: 'Materials → Wall Tile → Apply to section',
            completed: false
          },
          {
            task: 'Place appliances',
            description: 'Add sink, hob, chimney, and other appliances',
            priority: 'critical',
            coohomAction: 'Furniture → Kitchen & Bath → Appliances',
            completed: false
          },
          {
            task: 'Apply materials and finishes',
            description: 'Set cabinet finishes, countertop, and hardware',
            priority: 'high',
            coohomAction: 'Material & Component → Edit Material',
            completed: false
          },
          {
            task: 'Add lighting',
            description: 'Place under-cabinet LEDs, ceiling lights',
            priority: 'medium',
            coohomAction: 'Images/Videos & Light → Add Light Sources',
            completed: false
          }
        ]
      },
      {
        title: 'Hardware Specification',
        progress: 0,
        items: [
          {
            task: 'Select Hafele hinges',
            description: 'Specify hinge type and quantity for each cabinet',
            priority: 'critical',
            deliverable: 'Hafele hardware schedule',
            completed: false
          },
          {
            task: 'Select drawer systems',
            description: 'Choose Tandem Box or other systems with exact lengths',
            priority: 'critical',
            completed: false
          },
          {
            task: 'Specify internal fittings',
            description: 'Pull-outs, organizers, corner solutions',
            priority: 'high',
            completed: false
          },
          {
            task: 'Create hardware schedule',
            description: 'List all hardware with Hafele article numbers',
            priority: 'critical',
            deliverable: 'Complete hardware list Excel',
            completed: false
          }
        ]
      },
      {
        title: 'Technical Documentation',
        progress: 0,
        items: [
          {
            task: 'Generate construction drawings',
            description: 'Export construction drawings from Coohom',
            priority: 'critical',
            coohomAction: 'Drawings & Schedules → Construction Drawings → Kitchen & Bath',
            deliverable: 'Construction drawings PDF',
            completed: false
          },
          {
            task: 'Generate cut list',
            description: 'Export material schedule/cut list',
            priority: 'critical',
            coohomAction: 'Construction Drawings → Material Schedule → Download Excel',
            deliverable: 'Cut list Excel',
            completed: false
          },
          {
            task: 'Create zone-specific drawings',
            description: 'Export separate drawings for each zone',
            priority: 'high',
            deliverable: 'Zone A, B, C drawings',
            completed: false
          },
          {
            task: 'Generate cabinet detail drawings',
            description: 'Part-level drawings for manufacturing',
            priority: 'critical',
            coohomAction: 'Select "Part" mode → Generate drawings',
            deliverable: 'Part drawings for each cabinet',
            completed: false
          }
        ]
      }
    ]
  },
  
  visualization: {
    name: 'Visualization',
    description: 'Create high-quality renders for client approval',
    progress: 0,
    steps: [
      {
        title: 'Render Setup',
        progress: 0,
        items: [
          {
            task: 'Set up lighting',
            description: 'Add daylight, under-cabinet LEDs, ambient lighting',
            priority: 'high',
            coohomAction: 'Images/Videos & Light → Adjust lighting',
            completed: false
          },
          {
            task: 'Save camera views',
            description: 'Create and save 5-7 camera angles',
            priority: 'high',
            coohomAction: 'Save View → Name each angle',
            completed: false
          },
          {
            task: 'Render settings optimization',
            description: 'Set 4K resolution, High/Ultra quality',
            priority: 'medium',
            completed: false
          }
        ]
      },
      {
        title: 'Image Generation',
        progress: 0,
        items: [
          {
            task: 'Full kitchen overview render',
            description: 'Isometric view showing entire kitchen',
            priority: 'critical',
            coohomAction: 'Render Image → 4K → High Quality',
            deliverable: 'Full kitchen 4K render',
            completed: false
          },
          {
            task: 'Zone A render',
            description: 'Detailed view of main cooking area',
            priority: 'critical',
            deliverable: 'Zone A 4K render',
            completed: false
          },
          {
            task: 'Zone B render',
            description: 'Storage/pantry area view',
            priority: 'high',
            deliverable: 'Zone B 4K render',
            completed: false
          },
          {
            task: 'Zone C render',
            description: 'Breakfast counter/dining area',
            priority: 'high',
            deliverable: 'Zone C 4K render',
            completed: false
          },
          {
            task: 'Detail shots',
            description: 'Close-ups of hardware, finishes, special features',
            priority: 'medium',
            deliverable: '3-5 detail renders',
            completed: false
          }
        ]
      },
      {
        title: 'Virtual Tour',
        progress: 0,
        items: [
          {
            task: 'Create 360° tour',
            description: 'Set panorama points and generate tour',
            priority: 'high',
            coohomAction: 'Panorama → Place points → Generate tour',
            deliverable: 'Shareable 360° tour link',
            completed: false
          },
          {
            task: 'Test embed functionality',
            description: 'Verify tour works on website',
            priority: 'medium',
            completed: false
          }
        ]
      }
    ]
  },
  
  documentation: {
    name: 'Documentation',
    description: 'Compile all deliverables for manufacturing',
    progress: 0,
    steps: [
      {
        title: 'BOQ Preparation',
        progress: 0,
        items: [
          {
            task: 'Calculate material quantities',
            description: 'From cut list, calculate total plywood, laminate, etc.',
            priority: 'critical',
            deliverable: 'Material quantities Excel',
            completed: false
          },
          {
            task: 'Price all materials',
            description: 'Get current rates for all materials',
            priority: 'critical',
            completed: false
          },
          {
            task: 'Price all hardware',
            description: 'Get Hafele pricing for all items',
            priority: 'critical',
            completed: false
          },
          {
            task: 'Calculate labor costs',
            description: 'Estimate carpentry, plumbing, electrical, tiling',
            priority: 'critical',
            completed: false
          },
          {
            task: 'Create final BOQ',
            description: 'Comprehensive BOQ with all line items',
            priority: 'critical',
            deliverable: 'Final BOQ Excel/PDF',
            completed: false
          }
        ]
      },
      {
        title: 'Client Package',
        progress: 0,
        items: [
          {
            task: 'Create presentation deck',
            description: '20-30 page PDF with renders, specs, costs',
            priority: 'critical',
            deliverable: 'Client presentation PDF',
            completed: false
          },
          {
            task: 'Material samples selection',
            description: 'Provide physical samples for approval',
            priority: 'high',
            completed: false
          },
          {
            task: 'Schedule client meeting',
            description: 'Book presentation and Q&A session',
            priority: 'critical',
            completed: false
          }
        ]
      },
      {
        title: 'Manufacturing Package',
        progress: 0,
        items: [
          {
            task: 'Organize all drawings',
            description: 'Folder structure with all PDFs and CADs',
            priority: 'critical',
            deliverable: 'Complete drawings folder',
            completed: false
          },
          {
            task: 'Hardware procurement list',
            description: 'Excel with Hafele order details',
            priority: 'critical',
            deliverable: 'Hardware purchase order',
            completed: false
          },
          {
            task: 'Material procurement list',
            description: 'Plywood, laminate, countertop orders',
            priority: 'critical',
            deliverable: 'Material purchase orders',
            completed: false
          },
          {
            task: 'Assembly instructions',
            description: 'Step-by-step guide for carpenters',
            priority: 'high',
            deliverable: 'Assembly manual',
            completed: false
          }
        ]
      }
    ]
  },
  
  approval: {
    name: 'Client Approval',
    description: 'Present design and obtain sign-off',
    progress: 0,
    steps: [
      {
        title: 'Presentation',
        progress: 0,
        items: [
          {
            task: 'Present design to client',
            description: 'Walk through all renders, specifications, and costs',
            priority: 'critical',
            completed: false
          },
          {
            task: 'Address feedback',
            description: 'Document all client comments and concerns',
            priority: 'critical',
            deliverable: 'Feedback log',
            completed: false
          },
          {
            task: 'Make revisions',
            description: 'Implement approved changes',
            priority: 'high',
            completed: false
          }
        ]
      },
      {
        title: 'Final Approval',
        progress: 0,
        items: [
          {
            task: 'Get design sign-off',
            description: 'Obtain written approval on final design',
            priority: 'critical',
            deliverable: 'Signed approval document',
            completed: false
          },
          {
            task: 'Get BOQ approval',
            description: 'Client approves budget and payment terms',
            priority: 'critical',
            deliverable: 'Signed BOQ',
            completed: false
          },
          {
            task: 'Collect advance payment',
            description: 'Receive initial payment (typically 40-50%)',
            priority: 'critical',
            deliverable: 'Payment receipt',
            completed: false
          },
          {
            task: 'Finalize timeline',
            description: 'Agree on project milestones and completion date',
            priority: 'critical',
            deliverable: 'Project timeline document',
            completed: false
          }
         ]
       }
     ]
   }
 }
