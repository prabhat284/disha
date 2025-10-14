'use client'

import { motion } from 'framer-motion'
import { Package, CheckCircle2, Clock, Info } from 'lucide-react'
import hafeleProducts from '@/data/hafele-products.json'

export default function ProductsPage() {
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
                <Package className="text-gold" size={32} />
                <h1 className="text-5xl font-serif font-bold text-gradient">Hafele Products</h1>
              </div>
              <p className="text-xl text-gray-400">
                Premium hardware and fittings selected for Project DISHA
              </p>
            </div>
            <div className="hidden md:block">
              <img src="/hafele-logo.svg" alt="Hafele" className="h-16 opacity-70" />
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-white mb-1">
                {hafeleProducts.categories.reduce((acc, cat) => acc + cat.products.length, 0)}
              </div>
              <div className="text-sm text-gray-400">Products Selected</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">
                {hafeleProducts.categories.reduce((acc, cat) => 
                  acc + cat.products.filter(p => p.status === 'Selected').length, 0
                )}
              </div>
              <div className="text-sm text-gray-400">Approved Items</div>
            </div>
            <div className="glass rounded-xl p-4">
              <div className="text-2xl font-bold text-gold mb-1">
                ₹{(hafeleProducts.categories.reduce((acc, cat) => 
                  acc + cat.products.reduce((sum, p) => sum + p.totalPrice, 0), 0
                ) / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-400">Total Value</div>
            </div>
          </div>
        </motion.div>

        {/* Product Categories */}
        <div className="space-y-8">
          {hafeleProducts.categories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <h2 className="text-2xl font-serif font-bold text-white mb-6">{category.name}</h2>
              
              <div className="grid lg:grid-cols-2 gap-6">
                {category.products.map((product, prodIndex) => (
                  <motion.div
                    key={product.id}
                    className="glass-gold rounded-xl p-6 transition-luxury card-hover"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: catIndex * 0.1 + prodIndex * 0.05 }}
                  >
                    {/* Product Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-sm text-gray-400">{product.description}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-4 ${
                        product.status === 'Selected' ? 'status-approved' : 'status-review'
                      }`}>
                        {product.status}
                      </span>
                    </div>

                    {/* Product Image Placeholder */}
                    <div className="aspect-video bg-luxury-gray rounded-lg mb-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="text-gold opacity-30" size={48} />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-luxury-dark rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Quantity</div>
                        <div className="text-lg font-bold text-white">{product.quantity}</div>
                      </div>
                      <div className="text-center p-3 bg-luxury-dark rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Unit Price</div>
                        <div className="text-lg font-bold text-white">₹{product.unitPrice.toLocaleString()}</div>
                      </div>
                      <div className="text-center p-3 bg-luxury-dark rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">Total</div>
                        <div className="text-lg font-bold text-gold">₹{product.totalPrice.toLocaleString()}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {product.status === 'Selected' ? (
                        <button className="flex-1 flex items-center justify-center px-4 py-2 bg-green-400/20 text-green-400 rounded-lg font-medium">
                          <CheckCircle2 className="mr-2" size={16} />
                          Approved
                        </button>
                      ) : (
                        <>
                          <button className="flex-1 px-4 py-2 bg-gold text-black rounded-lg font-medium hover:bg-gold-light transition-luxury">
                            Approve
                          </button>
                          <button className="px-4 py-2 glass text-gray-300 rounded-lg font-medium hover:text-gold transition-luxury">
                            <Info size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Why Hafele Section */}
        <motion.div
          className="mt-12 glass rounded-2xl p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl font-serif font-bold text-gradient mb-6">Why Hafele?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-gold" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">German Engineering</h3>
              <p className="text-gray-400 text-sm">
                Premium quality and precision engineering for lasting durability
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-gold" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">10-Year Warranty</h3>
              <p className="text-gray-400 text-sm">
                Comprehensive warranty coverage on all hardware and fittings
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full glass-gold flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-gold" size={32} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">
                Cutting-edge solutions like Servo-Drive for modern living
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
