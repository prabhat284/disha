'use client'

import { motion } from 'framer-motion'
import { IndianRupee, TrendingUp, TrendingDown, AlertCircle, Download, CheckCircle2 } from 'lucide-react'
import boqData from '@/data/boq.json'
import projectInfo from '@/data/project-info.json'

export default function BudgetPage() {
  const budgetUtilization = (projectInfo.budget.spent / projectInfo.budget.approved) * 100

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
            <IndianRupee className="text-gold" size={32} />
            <h1 className="text-5xl font-serif font-bold text-gradient">Budget & BOQ</h1>
          </div>
          <p className="text-xl text-gray-400">
            Detailed cost breakdown and bill of quantities for Project DISHA
          </p>
        </motion.div>

        {/* Budget Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Approved Budget</span>
              <TrendingUp className="text-blue-400" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ₹{(projectInfo.budget.approved / 100000).toFixed(2)}L
            </div>
            <div className="text-sm text-gray-500">Total allocated amount</div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Amount Spent</span>
              <TrendingDown className="text-green-400" size={24} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              ₹{(projectInfo.budget.spent / 100000).toFixed(2)}L
            </div>
            <div className="progress-bar mt-3">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${budgetUtilization}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="text-sm text-gray-500 mt-2">{budgetUtilization.toFixed(1)}% utilized</div>
          </motion.div>

          <motion.div
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">Remaining</span>
              <AlertCircle className="text-gold" size={24} />
            </div>
            <div className="text-3xl font-bold text-gold mb-2">
              ₹{(projectInfo.budget.pending / 100000).toFixed(2)}L
            </div>
            <div className="text-sm text-gray-500">Available for allocation</div>
          </motion.div>
        </div>

        {/* BOQ Summary */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-serif font-bold text-white">Bill of Quantities</h2>
            <button className="flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury">
              <Download className="mr-2" size={20} />
              Download BOQ
            </button>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-6">
            {boqData.items.map((category, index) => (
              <motion.div
                key={index}
                className="glass-gold rounded-xl p-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{category.category}</h3>
                  <span className="text-2xl font-bold text-gold">
                    ₹{(category.subtotal / 1000).toFixed(0)}K
                  </span>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-luxury-border">
                        <th className="text-left py-3 px-2 text-gray-400 font-medium text-sm">Description</th>
                        <th className="text-center py-3 px-2 text-gray-400 font-medium text-sm">Unit</th>
                        <th className="text-center py-3 px-2 text-gray-400 font-medium text-sm">Qty</th>
                        <th className="text-right py-3 px-2 text-gray-400 font-medium text-sm">Rate</th>
                        <th className="text-right py-3 px-2 text-gray-400 font-medium text-sm">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, idx) => (
                        <tr key={idx} className="border-b border-luxury-border/50">
                          <td className="py-3 px-2 text-gray-300 text-sm">{item.description}</td>
                          <td className="py-3 px-2 text-center text-gray-400 text-sm">{item.unit}</td>
                          <td className="py-3 px-2 text-center text-white text-sm">{item.quantity}</td>
                          <td className="py-3 px-2 text-right text-gray-400 text-sm">₹{item.rate.toLocaleString()}</td>
                          <td className="py-3 px-2 text-right text-white font-medium text-sm">
                            ₹{item.amount.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="mt-8 glass rounded-xl p-6 border-2 border-gold">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white font-medium">₹{boqData.summary.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-gray-400">GST (9%)</span>
                <span className="text-white font-medium">₹{boqData.summary.gst.toLocaleString()}</span>
              </div>
              <div className="h-px bg-gold my-3"></div>
              <div className="flex justify-between items-center text-2xl">
                <span className="text-white font-bold">Grand Total</span>
                <span className="text-gold font-bold">₹{boqData.summary.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Payment Schedule */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Payment Schedule</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 glass-gold rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-green-400/20 flex items-center justify-center">
                  <CheckCircle2 className="text-green-400" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium">Advance Payment</div>
                  <div className="text-sm text-gray-400">Paid on Jan 15, 2025</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-green-400">₹{(boqData.summary.advancePaid / 100000).toFixed(2)}L</div>
                <div className="text-xs text-gray-500">30% of total</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 glass-gold rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center">
                  <AlertCircle className="text-yellow-400" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium">Second Installment</div>
                  <div className="text-sm text-gray-400">Due on Mar 10, 2025</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-yellow-400">₹3.50L</div>
                <div className="text-xs text-gray-500">40% of total</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 glass-gold rounded-xl">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <AlertCircle className="text-gold" size={20} />
                </div>
                <div>
                  <div className="text-white font-medium">Final Payment</div>
                  <div className="text-sm text-gray-400">Due on completion</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gold">₹{(boqData.summary.balance / 100000).toFixed(2)}L</div>
                <div className="text-xs text-gray-500">Remaining balance</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
