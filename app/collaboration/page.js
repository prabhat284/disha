'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, CheckCircle2, Clock, Send, FileText, User } from 'lucide-react'
import collaborationData from '@/data/collaboration.json'

export default function CollaborationPage() {
  const [newComment, setNewComment] = useState('')
  const [activeTab, setActiveTab] = useState('comments') // comments, decisions

  const handleSubmitComment = (e) => {
    e.preventDefault()
    alert('Comment submitted! The architect will respond shortly.')
    setNewComment('')
  }

  return (
   <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center space-x-3 mb-4">
            <MessageSquare className="text-gold" size={32} />
            <h1 className="text-5xl font-serif font-bold text-gradient">Collaboration Space</h1>
          </div>
          <p className="text-xl text-gray-400">
            Your space to ask questions, provide feedback, and make decisions together
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('comments')}
            className={`px-6 py-3 rounded-lg font-medium transition-luxury ${
              activeTab === 'comments' ? 'bg-gold text-black' : 'glass-gold text-gold'
            }`}
          >
            Comments & Questions
          </button>
          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-6 py-3 rounded-lg font-medium transition-luxury ${
              activeTab === 'decisions' ? 'bg-gold text-black' : 'glass-gold text-gold'
            }`}
          >
            Decision Log
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'comments' ? (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* New Comment Form */}
                <div className="glass rounded-2xl p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4">Add a Comment or Question</h2>
                  <form onSubmit={handleSubmitComment}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts, ask questions, or request changes..."
                      className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-lg text-white focus:border-gold focus:outline-none transition-luxury resize-none mb-4"
                      rows="4"
                      required
                    />
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        The architect will be notified instantly
                      </div>
                      <button
                        type="submit"
                        className="flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury"
                      >
                        <Send className="mr-2" size={18} />
                        Post Comment
                      </button>
                    </div>
                  </form>
                </div>

                {/* Comments Thread */}
                <div className="space-y-4">
                  {collaborationData.comments.map((comment, index) => (
                    <motion.div
                      key={comment.id}
                      className="glass rounded-2xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          comment.author === 'Neeru Tiwary' 
                            ? 'bg-gradient-to-br from-gold to-gold-light text-black' 
                            : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
                        }`}>
                          <span className="font-bold text-sm">
                            {comment.author === 'Neeru Tiwary' ? 'NT' : 'A'}
                          </span>
                        </div>

                        <div className="flex-1">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="font-bold text-white">{comment.author}</div>
                              <div className="text-xs text-gray-500">
                                {comment.date} • {comment.section}
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              comment.status === 'Resolved' ? 'status-approved' : 'status-pending'
                            }`}>
                              {comment.status}
                            </span>
                          </div>

                          {/* Comment */}
                          <p className="text-gray-300 mb-3">{comment.comment}</p>

                          {/* Reply */}
                          {comment.reply && (
                            <div className="glass-gold rounded-lg p-4 mt-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <User size={14} className="text-gold" />
                                <span className="text-sm font-medium text-gold">Architect Reply</span>
                              </div>
                              <p className="text-gray-300 text-sm">{comment.reply}</p>
                            </div>
                          )}

                          {/* Reply Button */}
                          {comment.status === 'Awaiting Response' && !comment.reply && (
                            <button className="mt-3 text-sm text-gold hover:text-gold-light transition-luxury">
                              Reply to this
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                {collaborationData.decisions.map((decision, index) => (
                  <motion.div
                    key={decision.id}
                    className="glass rounded-2xl p-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          decision.status === 'Approved' ? 'bg-green-400/20' : 'bg-yellow-400/20'
                        }`}>
                          {decision.status === 'Approved' ? (
                            <CheckCircle2 className="text-green-400" size={20} />
                          ) : (
                            <Clock className="text-yellow-400" size={20} />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{decision.topic}</h3>
                          <p className="text-sm text-gray-500">{decision.date}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        decision.status === 'Approved' ? 'status-approved' : 'status-review'
                      }`}>
                        {decision.status}
                      </span>
                    </div>

                    <p className="text-gray-300 mb-3">{decision.decision}</p>

                    <div className="flex items-center text-sm text-gray-500">
                      <span>Decided by: </span>
                      <span className="ml-2 text-gold">{decision.decidedBy}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              className="glass rounded-2xl p-6 sticky top-24"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-between p-4 glass-gold rounded-lg hover:bg-gold hover:text-black transition-luxury group">
                  <span className="text-gold group-hover:text-black font-medium">Request Meeting</span>
                  <FileText className="text-gold group-hover:text-black" size={18} />
                </button>
                <button className="w-full flex items-center justify-between p-4 glass-gold rounded-lg hover:bg-gold hover:text-black transition-luxury group">
                  <span className="text-gold group-hover:text-black font-medium">Share Reference</span>
                  <FileText className="text-gold group-hover:text-black" size={18} />
                </button>
              </div>

              <div className="border-t border-luxury-border pt-6">
                <h4 className="text-sm font-bold text-gray-400 mb-4">COLLABORATION STATS</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Total Comments</span>
                      <span className="text-white font-medium">{collaborationData.comments.length}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Resolved</span>
                      <span className="text-green-400 font-medium">
                        {collaborationData.comments.filter(c => c.status === 'Resolved').length}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Decisions Made</span>
                      <span className="text-white font-medium">{collaborationData.decisions.length}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Approved</span>
                      <span className="text-green-400 font-medium">
                        {collaborationData.decisions.filter(d => d.status === 'Approved').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-luxury-border pt-6 mt-6">
                <h4 className="text-sm font-bold text-gray-400 mb-3">ARCHITECT CONTACT</h4>
                <div className="text-sm text-gray-400 space-y-2">
                  <p>📧 architect@disha.com</p>
                  <p>📱 +91 98765 43210</p>
                  <p className="text-green-400">● Available Now</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
