'use client'

import { useState, useRef } from 'react'
import { Upload, X, CheckCircle2, AlertCircle, File, Image, Box, FileText } from 'lucide-react'

export default function FileUploader({ 
  category = 'general', // 'models', 'drawings', 'images', 'documents'
  acceptedFormats = [],
  maxSizeMB = 50,
  onUploadComplete,
  designOption = null // For 3D models - option-a, option-b, option-c
}) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  // Default accepted formats based on category
  const defaultFormats = {
    models: ['.obj', '.mtl', '.glb', '.gltf', '.fbx'],
    drawings: ['.pdf', '.dwg', '.dxf', '.jpg', '.jpeg', '.png'],
    images: ['.jpg', '.jpeg', '.png', '.webp'],
    documents: ['.pdf', '.doc', '.docx', '.xlsx', '.xls'],
    general: ['.obj', '.glb', '.pdf', '.jpg', '.png', '.dwg', '.dxf']
  }

  const formats = acceptedFormats.length > 0 ? acceptedFormats : defaultFormats[category]

  const getFileIcon = (fileName) => {
    const ext = fileName.toLowerCase().split('.').pop()
    if (['obj', 'glb', 'gltf', 'fbx'].includes(ext)) return <Box className="text-gold" size={24} />
    if (['jpg', 'jpeg', 'png', 'webp'].includes(ext)) return <Image className="text-blue-400" size={24} />
    if (['pdf'].includes(ext)) return <FileText className="text-red-400" size={24} />
    return <File className="text-gray-400" size={24} />
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const validateFile = (file) => {
    const ext = '.' + file.name.toLowerCase().split('.').pop()
    
    // Check format
    if (!formats.includes(ext)) {
      return { valid: false, error: `Invalid format. Accepted: ${formats.join(', ')}` }
    }

    // Check size
    const maxSize = maxSizeMB * 1024 * 1024
    if (file.size > maxSize) {
      return { valid: false, error: `File too large. Max size: ${maxSizeMB}MB` }
    }

    return { valid: true }
  }

  const handleFiles = async (files) => {
    setError(null)
    const fileArray = Array.from(files)
    
    for (const file of fileArray) {
      const validation = validateFile(file)
      
      if (!validation.valid) {
        setError(validation.error)
        continue
      }

      setUploading(true)

      try {
        // Simulate upload (in real implementation, this would upload to server)
        await simulateUpload(file)
        
        const uploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
          url: URL.createObjectURL(file) // Temporary URL for preview
        }

        setUploadedFiles(prev => [...prev, uploadedFile])
        
        if (onUploadComplete) {
          onUploadComplete(uploadedFile)
        }

      } catch (err) {
        setError(`Failed to upload ${file.name}`)
      }
    }

    setUploading(false)
  }

  // Simulate file upload (replace with actual upload logic)
  const simulateUpload = (file) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Here you would normally upload to your server/storage
        console.log('Uploading file:', file.name)
        
        // For now, we'll just create a local blob URL
        // In production, upload to server and get URL back
        resolve()
      }, 1500)
    })
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getCategoryTitle = () => {
    const titles = {
      models: '3D Models',
      drawings: '2D Drawings',
      images: 'Images',
      documents: 'Documents',
      general: 'Files'
    }
    return titles[category] || 'Files'
  }

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
          dragActive 
            ? 'border-gold bg-gold/10' 
            : 'border-luxury-border hover:border-gold/50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={formats.join(',')}
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mb-4">
            <Upload className="text-gold" size={32} />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Upload {getCategoryTitle()}
          </h3>

          {designOption && (
            <p className="text-sm text-gold mb-4">
              For Design {designOption.replace('option-', 'Option ').toUpperCase()}
            </p>
          )}

          <p className="text-gray-400 mb-4">
            Drag and drop files here, or click to browse
          </p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all"
          >
            Choose Files
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Supported formats: {formats.join(', ')}
            <br />
            Max size: {maxSizeMB}MB per file
          </p>
        </div>

        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-luxury-dark/80 rounded-2xl">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gold font-medium">Uploading...</p>
            </div>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 glass-gold rounded-lg border border-red-500/50 flex items-start gap-3">
          <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-red-400 font-medium">Upload Error</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-lg font-bold text-white mb-4">
            Uploaded Files ({uploadedFiles.length})
          </h4>
          
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="glass rounded-xl p-4 flex items-center justify-between group hover:glass-gold transition-all"
            >
              <div className="flex items-center gap-4 flex-1">
                {getFileIcon(file.name)}
                
                <div className="flex-1 min-w-0">
                  <p className="text-white font-medium truncate">{file.name}</p>
                  <p className="text-gray-500 text-sm">
                    {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleTimeString()}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="text-green-400" size={20} />
                  <button
                    onClick={() => removeFile(index)}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X className="text-red-400" size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Instructions */}
      {category === 'models' && uploadedFiles.length === 0 && (
        <div className="mt-6 glass rounded-xl p-6">
          <h4 className="text-white font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="text-gold" size={18} />
            Tips for 3D Models
          </h4>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• Upload both .obj and .mtl files together for best results</li>
            <li>• Ensure textures are referenced correctly in the .mtl file</li>
            <li>• GLB/GLTF files are self-contained and work best</li>
            <li>• Model will be auto-scaled to fit the viewer</li>
          </ul>
        </div>
      )}
    </div>
  )
}
