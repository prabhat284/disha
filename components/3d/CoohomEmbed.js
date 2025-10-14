'use client'

import { useState } from 'react'
import { ExternalLink, Eye, Maximize2, Link as LinkIcon, Save, Edit2 } from 'lucide-react'

export default function CoohomEmbed({ designOption, coohomUrl, onUrlSave }) {
  const [isEditing, setIsEditing] = useState(!coohomUrl)
  const [tempUrl, setTempUrl] = useState(coohomUrl || '')
  const [showFullscreen, setShowFullscreen] = useState(false)

  const handleSave = () => {
    if (tempUrl.trim()) {
      onUrlSave(tempUrl.trim())
      setIsEditing(false)
    }
  }

  const extractCoohomId = (url) => {
    // Extract ID from Coohom URL if needed
    // e.g., https://www.coohom.com/pub/tool/panorama/xxxxx
    return url
  }

  if (isEditing) {
    return (
      <div className="w-full h-full bg-luxury-gray rounded-2xl overflow-hidden border border-luxury-border flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          <div className="glass-gold rounded-2xl p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
              <LinkIcon className="text-gold" size={32} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Add Coohom Shareable Link
            </h3>

            <p className="text-gray-400 mb-6">
              Get the shareable link from your Coohom design and paste it here
            </p>

            <div className="mb-6">
              <label className="block text-left text-sm text-gray-400 mb-2">
                Coohom Shareable Link
              </label>
              <input
                type="url"
                value={tempUrl}
                onChange={(e) => setTempUrl(e.target.value)}
                placeholder="https://www.coohom.com/pub/tool/panorama/..."
                className="w-full px-4 py-3 bg-luxury-dark border border-luxury-border rounded-lg text-white placeholder-gray-600 focus:border-gold focus:outline-none transition-luxury"
              />
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={handleSave}
                disabled={!tempUrl.trim()}
                className="px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save size={18} />
                Save & Preview
              </button>
              {coohomUrl && (
                <button
                  onClick={() => {
                    setTempUrl(coohomUrl)
                    setIsEditing(false)
                  }}
                  className="px-6 py-3 glass-gold text-gold font-semibold rounded-lg hover:bg-gold hover:text-black transition-luxury"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-luxury-border">
              <p className="text-sm text-gray-500 mb-3">How to get Coohom shareable link:</p>
              <ol className="text-sm text-gray-400 text-left space-y-2 max-w-lg mx-auto">
                <li>1. Open your design in Coohom</li>
                <li>2. Click on <strong className="text-gold">"Share"</strong> or <strong className="text-gold">"Publish"</strong></li>
                <li>3. Copy the shareable/public link</li>
                <li>4. Paste it above and click "Save"</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full bg-luxury-gray rounded-2xl overflow-hidden border border-luxury-border">
      {/* Embedded iFrame */}
      <iframe
        src={coohomUrl}
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        title={`Coohom Design - ${designOption}`}
      />

      {/* Control Overlay */}
      <div className="absolute top-6 left-6 glass-gold px-4 py-2 rounded-full flex items-center gap-2">
        <Eye className="text-gold" size={16} />
        <span className="text-gold text-sm font-medium">Coohom 3D View</span>
      </div>

      <div className="absolute top-6 right-6 flex gap-2">
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 glass rounded-lg hover:bg-gold hover:text-black transition-luxury text-gold"
          title="Change Link"
        >
          <Edit2 size={18} />
        </button>

        <a
          href={coohomUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 glass rounded-lg hover:bg-gold hover:text-black transition-luxury text-gold"
          title="Open in New Tab"
        >
          <ExternalLink size={18} />
        </a>

        <button
          onClick={() => setShowFullscreen(true)}
          className="p-2 glass rounded-lg hover:bg-gold hover:text-black transition-luxury text-gold"
          title="Fullscreen"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {/* Info Badge */}
      <div className="absolute bottom-6 left-6 glass px-4 py-2 rounded-lg">
        <div className="text-xs text-gray-400 mb-1">Design Option</div>
        <div className="text-sm text-gold font-medium capitalize">
          {designOption.replace('option-', 'Option ').toUpperCase()}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 z-10 px-4 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury"
          >
            Exit Fullscreen
          </button>
          <iframe
            src={coohomUrl}
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      )}
    </div>
  )
}
