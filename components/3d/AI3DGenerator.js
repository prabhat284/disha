'use client'

import { useState } from 'react'
import { Sparkles, Wand2, Image as ImageIcon, Loader, Download, AlertCircle } from 'lucide-react'

export default function AI3DGenerator({ onModelGenerated, designOption }) {
  const [mode, setMode] = useState('text') // text, image
  const [prompt, setPrompt] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedModel, setGeneratedModel] = useState(null)
  const [error, setError] = useState(null)

  const examplePrompts = [
    "Modern minimalist kitchen with white cabinets, marble countertop, and stainless steel appliances",
    "Contemporary kitchen with wooden cabinets, brass hardware, and open shelving",
    "Industrial style kitchen with concrete countertops, metal fixtures, and exposed brick",
    "Luxury kitchen with gold accents, dark wood cabinets, and premium finishes"
  ]

  const handleGenerate = async () => {
    if (!prompt.trim() && mode === 'text') {
      setError('Please enter a description')
      return
    }

    if (!imageFile && mode === 'image') {
      setError('Please upload a reference image')
      return
    }

    setGenerating(true)
    setError(null)
    setProgress(0)

    try {
      // Simulate AI generation progress
      // In production, this would call Meshy.ai or similar API
      await simulateGeneration()
      
      // Mock generated model data
      const modelData = {
        name: `AI-Generated-${designOption}-${Date.now()}.glb`,
        url: '/models/ai-generated-kitchen.glb', // This would be the actual generated model URL
        prompt: prompt,
        format: 'glb',
        generatedAt: new Date().toISOString()
      }

      setGeneratedModel(modelData)
      
      if (onModelGenerated) {
        onModelGenerated(modelData)
      }

    } catch (err) {
      setError('Failed to generate 3D model. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const simulateGeneration = () => {
    return new Promise((resolve) => {
      let currentProgress = 0
      const interval = setInterval(() => {
        currentProgress += 10
        setProgress(currentProgress)
        
        if (currentProgress >= 100) {
          clearInterval(interval)
          resolve()
        }
      }, 500)
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setError(null)
    }
  }

  return (
    <div className="w-full h-full bg-luxury-gray rounded-2xl overflow-hidden border border-luxury-border p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center mx-auto mb-4">
            <Wand2 className="text-black" size={32} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gradient mb-3">
            AI 3D Model Generator
          </h2>
          <p className="text-gray-400">
            Generate 3D kitchen models using AI from text descriptions or images
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-3 mb-6 justify-center">
          <button
            onClick={() => setMode('text')}
            className={`px-6 py-3 rounded-lg font-medium transition-luxury flex items-center gap-2 ${
              mode === 'text' ? 'bg-gold text-black' : 'glass-gold text-gold'
            }`}
          >
            <Sparkles size={18} />
            Text to 3D
          </button>
          <button
            onClick={() => setMode('image')}
            className={`px-6 py-3 rounded-lg font-medium transition-luxury flex items-center gap-2 ${
              mode === 'image' ? 'bg-gold text-black' : 'glass-gold text-gold'
            }`}
          >
            <ImageIcon size={18} />
            Image to 3D
          </button>
        </div>

        {/* Generation Form */}
        {!generatedModel ? (
          <div className="glass rounded-2xl p-6">
            {mode === 'text' ? (
              <>
                {/* Text Input */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Describe your kitchen design
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Modern kitchen with white cabinets, marble countertop, and brass fixtures..."
                    className="w-full h-32 px-4 py-3 bg-luxury-dark border border-luxury-border rounded-lg text-white placeholder-gray-600 focus:border-gold focus:outline-none transition-luxury resize-none"
                    disabled={generating}
                  />
                </div>

                {/* Example Prompts */}
                <div className="mb-6">
                  <p className="text-sm text-gray-400 mb-3">Example prompts:</p>
                  <div className="space-y-2">
                    {examplePrompts.map((example, index) => (
                      <button
                        key={index}
                        onClick={() => setPrompt(example)}
                        className="w-full text-left px-4 py-2 glass-gold rounded-lg text-sm text-gray-300 hover:text-gold transition-luxury"
                        disabled={generating}
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Image Upload */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Upload reference image
                  </label>
                  <div className="border-2 border-dashed border-luxury-border rounded-lg p-8 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="ai-image-upload"
                      disabled={generating}
                    />
                    <label
                      htmlFor="ai-image-upload"
                      className="cursor-pointer block"
                    >
                      {imageFile ? (
                        <div className="text-gold">
                          <ImageIcon size={48} className="mx-auto mb-3" />
                          <p className="font-medium">{imageFile.name}</p>
                          <p className="text-sm text-gray-400 mt-2">Click to change</p>
                        </div>
                      ) : (
                        <div className="text-gray-400">
                          <ImageIcon size={48} className="mx-auto mb-3" />
                          <p className="font-medium">Click to upload image</p>
                          <p className="text-sm mt-2">JPG, PNG, or WEBP</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Additional Text Prompt */}
                <div className="mb-6">
                  <label className="block text-white font-medium mb-3">
                    Additional details (optional)
                  </label>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., Add brass handles, change to marble countertop..."
                    className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-lg text-white placeholder-gray-600 focus:border-gold focus:outline-none transition-luxury"
                    disabled={generating}
                  />
                </div>
              </>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || (!prompt.trim() && mode === 'text') || (!imageFile && mode === 'image')}
              className="w-full px-8 py-4 bg-gold text-black font-bold rounded-lg hover:bg-gold-light transition-luxury disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Generating... {progress}%
                </>
              ) : (
                <>
                  <Wand2 size={20} />
                  Generate 3D Model
                </>
              )}
            </button>

            {/* Progress Bar */}
            {generating && (
              <div className="mt-4">
                <div className="h-2 bg-luxury-dark rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gold to-gold-light transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-center text-sm text-gray-400 mt-2">
                  {progress < 30 && 'Analyzing description...'}
                  {progress >= 30 && progress < 60 && 'Creating 3D geometry...'}
                  {progress >= 60 && progress < 90 && 'Applying materials...'}
                  {progress >= 90 && 'Finalizing model...'}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Info Box */}
            <div className="mt-6 p-4 glass-gold rounded-lg">
              <p className="text-sm text-gold font-medium mb-2">💡 How it works:</p>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• AI generates 3D models based on your description</li>
                <li>• Generation typically takes 30-60 seconds</li>
                <li>• Models are optimized for web viewing</li>
                <li>• You can refine and regenerate as needed</li>
              </ul>
            </div>
          </div>
        ) : (
          /* Generated Model Result */
          <div className="glass rounded-2xl p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-green-400/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="text-green-400" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Model Generated Successfully!
              </h3>
              <p className="text-gray-400">
                Your AI-generated 3D model is ready
              </p>
            </div>

            <div className="bg-luxury-dark rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Model Name:</span>
                <span className="text-white font-medium">{generatedModel.name}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-400">Format:</span>
                <span className="text-gold font-medium uppercase">{generatedModel.format}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Generated:</span>
                <span className="text-white">{new Date(generatedModel.generatedAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGeneratedModel(null)
                  setPrompt('')
                  setImageFile(null)
                  setProgress(0)
                }}
                className="flex-1 px-6 py-3 glass-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-luxury"
              >
                Generate Another
              </button>
              <button
                className="flex-1 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Model
              </button>
            </div>

            <p className="text-center text-sm text-gray-500 mt-4">
              The model will automatically appear in the 3D Viewer
            </p>
          </div>
        )}

        {/* Service Info */}
        <div className="mt-6 p-4 glass rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            <strong className="text-gold">Note:</strong> AI generation is currently simulated. 
            To enable real AI generation, integrate with services like Meshy.ai, Spline AI, or Luma AI.
          </p>
        </div>
      </div>
    </div>
  )
}
