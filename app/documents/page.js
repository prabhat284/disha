'use client'

import { motion } from 'framer-motion'
import { FileText, Download, Eye, FolderOpen, Clock, CheckCircle2 } from 'lucide-react'

export default function DocumentsPage() {
  const documentCategories = [
    {
      name: 'Floor Plans',
      icon: FolderOpen,
      files: [
        { name: 'Ground Floor Plan - v3.0', size: '2.4 MB', date: '2025-02-02', status: 'Current', type: 'PDF' },
        { name: 'Ground Floor Plan - v2.0', size: '2.1 MB', date: '2025-01-28', status: 'Archive', type: 'PDF' },
        { name: 'Ground Floor Plan - v1.0', size: '1.9 MB', date: '2025-01-20', status: 'Archive', type: 'PDF' }
      ]
    },
    {
      name: 'Elevations',
      icon: FolderOpen,
      files: [
        { name: 'North Elevation - Final', size: '1.8 MB', date: '2025-02-01', status: 'Current', type: 'PDF' },
        { name: 'South Elevation - Final', size: '1.7 MB', date: '2025-02-01', status: 'Current', type: 'PDF' },
        { name: 'East & West Elevations', size: '2.0 MB', date: '2025-02-01', status: 'Current', type: 'PDF' }
      ]
    },
    {
      name: 'Detail Drawings',
      icon: FolderOpen,
      files: [
        { name: 'Cabinet Details', size: '3.2 MB', date: '2025-01-30', status: 'Current', type: 'DWG' },
        { name: 'Countertop Details', size: '1.5 MB', date: '2025-01-30', status: 'Current', type: 'PDF' },
        { name: 'Electrical Layout', size: '1.1 MB', date: '2025-01-29', status: 'Current', type: 'PDF' },
        { name: 'Plumbing Layout', size: '950 KB', date: '2025-01-29', status: 'Current', type: 'PDF' }
      ]
    },
    {
      name: '3D Renders',
      icon: FolderOpen,
      files: [
        { name: 'Option B - Perspective View 1', size: '5.2 MB', date: '2025-01-26', status: 'Current', type: 'JPG' },
        { name: 'Option B - Perspective View 2', size: '4.8 MB', date: '2025-01-26', status: 'Current', type: 'JPG' },
        { name: 'Option B - Night View', size: '5.5 MB', date: '2025-01-26', status: 'Current', type: 'JPG' }
      ]
    },
    {
      name: 'Specifications',
      icon: FolderOpen,
      files: [
        { name: 'Material Specifications', size: '850 KB', date: '2025-01-31', status: 'Current', type: 'PDF' },
        { name: 'Hafele Products Catalog', size: '12.3 MB', date: '2025-01-25', status: 'Current', type: 'PDF' },
        { name: 'Finishing Schedule', size: '620 KB', date: '2025-01-30', status: 'Current', type: 'PDF' }
      ]
    },
    {
      name: 'Contracts & BOQ',
      icon: FolderOpen,
      files: [
        { name: 'Bill of Quantities', size: '1.2 MB', date: '2025-02-03', status: 'Current', type: 'XLSX' },
        { name: 'Project Agreement', size: '450 KB', date: '2025-01-15', status: 'Signed', type: 'PDF' },
        { name: 'Payment Schedule', size: '280 KB', date: '2025-01-15', status: 'Current', type: 'PDF' }
      ]
    }
  ]

  const getFileIcon = (type) => {
    return <FileText className="text-gold" size={20} />
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <FileText className="text-gold" size={32} />
                <h1 className="text-5xl font-serif font-bold text-gradient">Documents</h1>
              </div>
              <p className="text-xl text-gray-400">
                All technical drawings, specifications, and project documents
              </p>
            </div>
            <button className="flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury">
              <Download className="mr-2" size={20} />
              Download All
            </button>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {documentCategories.reduce((acc, cat) => acc + cat.files.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Total Files</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {documentCategories.reduce((acc, cat) => 
                  acc + cat.files.filter(f => f.status === 'Current').length, 0
                )}
              </div>
              <div className="text-sm text-gray-400">Current Version</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {documentCategories.reduce((acc, cat) => 
                  acc + cat.files.filter(f => f.type === 'PDF').length, 0
                )}
              </div>
              <div className="text-sm text-gray-400">PDF Documents</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gold mb-1">
                Last Updated
              </div>
              <div className="text-sm text-gray-400">Feb 3, 2025</div>
            </div>
          </div>
        </motion.div>

        {/* Document Categories */}
        <div className="space-y-8">
          {documentCategories.map((category, catIndex) => {
            const Icon = category.icon
            return (
              <motion.div
                key={catIndex}
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Icon className="text-gold" size={24} />
                  <h2 className="text-2xl font-serif font-bold text-white">{category.name}</h2>
                  <span className="px-3 py-1 glass-gold rounded-full text-xs text-gold font-medium">
                    {category.files.length} files
                  </span>
                </div>

                <div className="space-y-3">
                  {category.files.map((file, fileIndex) => (
                    <motion.div
                      key={fileIndex}
                      className="glass-gold rounded-xl p-4 hover:bg-gold/5 transition-luxury cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: catIndex * 0.1 + fileIndex * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          {/* File Icon */}
                          <div className="w-10 h-10 rounded-lg bg-luxury-dark flex items-center justify-center flex-shrink-0">
                            {getFileIcon(file.type)}
                          </div>

                          {/* File Info */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-1">
                              <h3 className="text-white font-medium">{file.name}</h3>
                              {file.status === 'Current' && (
                                <span className="status-approved px-2 py-0.5 rounded text-xs">
                                  {file.status}
                                </span>
                              )}
                              {file.status === 'Signed' && (
                                <span className="status-approved px-2 py-0.5 rounded text-xs flex items-center">
                                  <CheckCircle2 size={12} className="mr-1" />
                                  {file.status}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{file.type}</span>
                              <span>•</span>
                              <span>{file.size}</span>
                              <span>•</span>
                              <span className="flex items-center">
                                <Clock size={12} className="mr-1" />
                                {file.date}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <button className="p-2 glass rounded-lg hover:bg-gold hover:text-black transition-luxury text-gold">
                            <Eye size={18} />
                          </button>
                          <button className="p-2 glass rounded-lg hover:bg-gold hover:text-black transition-luxury text-gold">
                            <Download size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Version Control Notice */}
        <motion.div
          className="mt-8 glass-gold rounded-2xl p-6 border-2 border-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-start space-x-4">
            <FileText className="text-gold flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold text-gold mb-2">Version Control</h3>
              <p className="text-gray-300 text-sm">
                All documents are version-controlled. Archived versions are kept for reference. 
                Always use the files marked as "Current" for the latest approved designs. 
                You'll be notified when new versions are uploaded.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
