---

## **3. CREATE: `/app/workflow/review/page.js`**
```javascript
// Path: /app/workflow/review/page.js
// Purpose: Client review and approval interface with commenting system

'use client'

import { useState } from 'react'
import { MessageSquare, ThumbsUp, ThumbsDown, CheckCircle, Edit3, Image as ImageIcon, FileText, Download } from 'lucide-react'

export default function ReviewPage() {
  const [selectedOption, setSelectedOption] = useState('option-a')
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [selectedArea, setSelectedArea] = useState(null)
  const [approvalStatus, setApprovalStatus] = useState({
    design: null,
    budget: null,
    timeline: null
  })

  const designOptions = [
    {
      id: 'option-a',
      name: 'Modern Minimalist',
      thumbnail: '/renders/option-a-thumb.jpg',
      style: 'Clean lines, handleless cabinets, white & wood',
      budget: '₹8.75L',
      timeline: '6-8 weeks'
    },
    {
      id: 'option-b',
      name: 'Contemporary Warm',
      thumbnail: '/renders/option-b-thumb.jpg',
      style: 'Warm tones, soft-close hardware, textured finishes',
      budget: '₹9.20L',
      timeline: '7-9 weeks'
    },
    {
      id: 'option-c',
      name: 'Industrial Chic',
      thumbnail: '/renders/option-c-thumb.jpg',
      style: 'Exposed elements, metal accents, bold contrast',
      budget: '₹10.50L',
      timeline: '8-10 weeks'
    }
  ]

  const reviewAreas = [
    { id: 'overall', name: 'Overall Design', icon: ImageIcon },
    { id: 'zone-a', name: 'Zone A - Cooking', icon: ImageIcon },
    { id: 'zone-b', name: 'Zone B - Storage', icon: ImageIcon },
    { id: 'zone-c', name: 'Zone C - Breakfast', icon: ImageIcon },
    { id: 'materials', name: 'Materials & Finishes', icon: FileText },
    { id: 'budget', name: 'Budget & BOQ', icon: FileText }
  ]

  const addComment = () => {
    if (!newComment.trim() || !selectedArea) return

    const comment = {
      id: Date.now(),
      area: selectedArea,
      text: newComment,
      author: 'Neeru Tiwary',
      timestamp: new Date().toISOString(),
      status: 'open',
      replies: []
    }

    setComments([comment, ...comments])
    setNewComment('')
  }

  const toggleApproval = (category, status) => {
    setApprovalStatus(prev => ({
      ...prev,
      [category]: prev[category] === status ? null : status
    }))
  }

  const allApproved = Object.values(approvalStatus).every(status => status === 'approved')

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
            Design Review & Approval
          </h1>
          <p className="text-gray-400">
            Review your kitchen designs and provide feedback
          </p>
        </div>

        {/* Client Info */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-xl mb-1">Neeru Tiwary</h3>
              <p className="text-gray-400">L-shaped Layout • 120 sq ft</p>
            </div>
            <div className="flex gap-3">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-1">Comments</p>
                <p className="text-2xl font-bold text-gold">{comments.length}</p>
              </div>
              <div className="text-center ml-6">
                <p className="text-gray-400 text-sm mb-1">Status</p>
                <p className={`text-2xl font-bold ${allApproved ? 'text-green-500' : 'text-yellow-500'}`}>
                  {allApproved ? 'Approved' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Design Options Selector */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Select Design Option</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {designOptions.map(option => (
              <button
                key={option.id}
                onClick={() => setSelectedOption(option.id)}
                className={`text-left p-4 rounded-xl transition-all ${
                  selectedOption === option.id
                    ? 'bg-gold text-black'
                    : 'bg-luxury-gray hover:bg-white/10'
                }`}
              >
                <div className="aspect-video bg-luxury-dark rounded-lg mb-3 flex items-center justify-center">
                  <ImageIcon size={48} className="text-gray-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">{option.name}</h3>
                <p className={`text-sm mb-3 ${selectedOption === option.id ? 'text-black' : 'text-gray-400'}`}>
                  {option.style}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{option.budget}</span>
                  <span>{option.timeline}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left: Visual Review */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Main Visualization */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Design Visualization</h2>
              
              {/* Image Viewer */}
              <div className="bg-luxury-gray rounded-xl overflow-hidden mb-4" style={{ height: '500px' }}>
                <iframe
                  src={`https://www.coohom.com/pub/modelo/viewer/preview/3FO3I6CXDHMI`}
                  className="w-full h-full border-0"
                  title="Kitchen 3D View"
                  allow="fullscreen"
                />
              </div>

              {/* View Selector */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {reviewAreas.map(area => (
                  <button
                    key={area.id}
                    onClick={() => setSelectedArea(area.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                      selectedArea === area.id
                        ? 'bg-gold text-black'
                        : 'bg-luxury-gray text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <area.icon size={16} />
                    {area.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Input */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={20} className="text-gold" />
                Add Comment
              </h3>
              
              {!selectedArea && (
                <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-4">
                  <p className="text-yellow-400 text-sm">
                    Please select an area above to comment on
                  </p>
                </div>
              )}

              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={selectedArea ? `Add your feedback about ${reviewAreas.find(a => a.id === selectedArea)?.name}...` : 'Select an area first...'}
                disabled={!selectedArea}
                className="w-full px-4 py-3 bg-luxury-gray border border-gold/20 rounded-lg text-white focus:border-gold outline-none resize-none"
                rows="4"
              />
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-gray-400 text-sm">
                  {selectedArea && `Commenting on: ${reviewAreas.find(a => a.id === selectedArea)?.name}`}
                </p>
                <button
                  onClick={addComment}
                  disabled={!newComment.trim() || !selectedArea}
                  className="px-6 py-2 bg-gold text-black rounded-lg hover:bg-gold-light transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Add Comment
                </button>
              </div>
            </div>

            {/* Comments Feed */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Comments & Feedback</h3>
              
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                  <p>No comments yet. Add your first feedback above.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map(comment => (
                    <div key={comment.id} className="bg-luxury-gray rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-white font-semibold">{comment.author}</p>
                          <p className="text-gray-400 text-xs">
                            {reviewAreas.find(a => a.id === comment.area)?.name} • 
                            {new Date(comment.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs ${
                          comment.status === 'resolved'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {comment.status}
                        </span>
                      </div>
                      <p className="text-gray-300">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right: Approval Panel */}
          <div className="space-y-6">
            
            {/* Approval Sections */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Approval Checklist</h3>
              
              <div className="space-y-4">
                {/* Design Approval */}
                <div className="p-4 bg-luxury-gray rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Design & Layout</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Overall design, zone layout, materials, finishes
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApproval('design', 'approved')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        approvalStatus.design === 'approved'
                          ? 'bg-green-600 text-white'
                          : 'bg-luxury-dark text-gray-400 hover:bg-green-600/20'
                      }`}
                    >
                      <ThumbsUp size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => toggleApproval('design', 'rejected')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        approvalStatus.design === 'rejected'
                          ? 'bg-red-600 text-white'
                          : 'bg-luxury-dark text-gray-400 hover:bg-red-600/20'
                      }`}
                    >
                      <ThumbsDown size={16} />
                      Revise
                    </button>
                  </div>
                </div>

                {/* Budget Approval */}
                <div className="p-4 bg-luxury-gray rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Budget & BOQ</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Total cost, payment terms, material costs
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApproval('budget', 'approved')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        approvalStatus.budget === 'approved'
                          ? 'bg-green-600 text-white'
                          : 'bg-luxury-dark text-gray-400 hover:bg-green-600/20'
                      }`}
                    >
                      <ThumbsUp size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => toggleApproval('budget', 'rejected')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        approvalStatus.budget === 'rejected'
                          ? 'bg-red-600 text-white'
                          : 'bg-luxury-dark text-gray-400 hover:bg-red-600/20'
                      }`}
                    >
                      <ThumbsDown size={16} />
                      Revise
                    </button>
                  </div>
                </div>

                {/* Timeline Approval */}
                <div className="p-4 bg-luxury-gray rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Timeline</h4>
                  <p className="text-gray-400 text-sm mb-3">
                    Project duration, milestones, completion date
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleApproval('timeline', 'approved')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        approvalStatus.timeline === 'approved'
                          ? 'bg-green-600 text-white'
                          : 'bg-luxury-dark text-gray-400 hover:bg-green-600/20'
                      }`}
                    >
                      <ThumbsUp size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => toggleApproval('timeline', 'rejected')}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        approvalStatus.timeline === 'rejected'
                          ? 'bg-red-600 text-white'
                          : 'bg-luxury-dark text-gray-400 hover:bg-red-600/20'
                      }`}
                    >
                      <ThumbsDown size={16} />
                      Revise
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Approval */}
            {allApproved && (
              <div className="glass rounded-xl p-6 border-2 border-green-500">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="text-green-500" size={32} />
                  <div>
                    <h3 className="text-xl font-bold text-white">Ready to Proceed</h3>
                    <p className="text-gray-400 text-sm">All items approved</p>
                  </div>
                </div>
                <button className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold">
                  Submit Final Approval
                </button>
              </div>
            )}

            {/* Documents */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Documents</h3>
              <div className="space-y-2">
                
                  href="#"
                  className="flex items-center justify-between p-3 bg-luxury-gray rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-gold" />
                    <span className="text-white">Complete BOQ.pdf</span>
                  </div>
                  <Download size={16} className="text-gray-400" />
                </a>
                
                  href="#"
                  className="flex items-center justify-between p-3 bg-luxury-gray rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-gold" />
                    <span className="text-white">Floor Plans.pdf</span>
                  </div>
                  <Download size={16} className="text-gray-400" />
                </a>
                
                  href="#"
                  className="flex items-center justify-between p-3 bg-luxury-gray rounded-lg hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-gold" />
                    <span className="text-white">Material Specs.pdf</span>
                  </div>
                  <Download size={16} className="text-gray-400" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

