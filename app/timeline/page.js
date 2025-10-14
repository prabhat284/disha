'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle2, Circle, AlertCircle, Calendar } from 'lucide-react'
import timelineData from '@/data/timeline.json'

export default function TimelinePage() {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="text-green-400" size={20} />
      case 'In Progress':
        return <Circle className="text-yellow-400 animate-pulse" size={20} />
      default:
        return <Circle className="text-gray-500" size={20} />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-400'
      case 'In Progress':
        return 'bg-yellow-400'
      default:
        return 'bg-gray-600'
    }
  }

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
    return days
  }

  const calculatePosition = (date) => {
    const projectStart = new Date('2025-01-15')
    const projectEnd = new Date('2025-04-15')
    const taskDate = new Date(date)
    const totalDuration = projectEnd - projectStart
    const elapsed = taskDate - projectStart
    return (elapsed / totalDuration) * 100
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
            <Clock className="text-gold" size={32} />
            <h1 className="text-5xl font-serif font-bold text-gradient">Project Timeline</h1>
          </div>
          <p className="text-xl text-gray-400">
            Track milestones and progress from concept to completion
          </p>
        </motion.div>

        {/* Timeline Overview */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Jan 15</div>
              <div className="text-sm text-gray-400">Start Date</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold mb-2">35%</div>
              <div className="text-sm text-gray-400">Complete</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">61 Days</div>
              <div className="text-sm text-gray-400">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Apr 15</div>
              <div className="text-sm text-gray-400">Target Date</div>
            </div>
          </div>
        </motion.div>

        {/* Gantt Chart View */}
        <motion.div
          className="glass rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Gantt Chart</h2>
          
          {/* Timeline Header */}
          <div className="mb-4 flex items-center space-x-2 text-sm text-gray-400 pl-48">
            <div className="flex-1 text-center">Jan</div>
            <div className="flex-1 text-center">Feb</div>
            <div className="flex-1 text-center">Mar</div>
            <div className="flex-1 text-center">Apr</div>
          </div>

          {/* Tasks */}
          <div className="space-y-6">
            {timelineData.milestones.map((milestone, mIndex) => (
              <div key={milestone.id}>
                <div className="text-lg font-bold text-gold mb-3">{milestone.phase}</div>
                {milestone.tasks.map((task, tIndex) => {
                  const startPos = calculatePosition(task.startDate)
                  const endPos = calculatePosition(task.endDate)
                  const width = endPos - startPos

                  return (
                    <motion.div
                      key={tIndex}
                      className="flex items-center mb-3"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + (mIndex * 0.1 + tIndex * 0.05) }}
                    >
                      {/* Task Name */}
                      <div className="w-44 pr-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(task.status)}
                          <span className="text-sm text-gray-300">{task.name}</span>
                        </div>
                      </div>

                      {/* Gantt Bar */}
                      <div className="flex-1 relative h-8">
                        <div className="absolute inset-0 bg-luxury-gray rounded-lg"></div>
                        <motion.div
                          className={`absolute h-full rounded-lg ${getStatusColor(task.status)} opacity-70`}
                          style={{
                            left: `${startPos}%`,
                            width: `${width}%`
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: `${width}%` }}
                          transition={{ duration: 0.8, delay: 0.5 + (mIndex * 0.1 + tIndex * 0.05) }}
                        >
                          <div className="h-full flex items-center justify-center text-xs text-black font-medium">
                            {task.completion}%
                          </div>
                        </motion.div>
                      </div>

                      {/* Duration */}
                      <div className="w-20 pl-4 text-xs text-gray-500 text-right">
                        {calculateDuration(task.startDate, task.endDate)}d
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Milestones */}
        <div className="grid lg:grid-cols-2 gap-6">
          {timelineData.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <h3 className="text-xl font-serif font-bold text-white mb-4">{milestone.phase}</h3>
              <div className="space-y-3">
                {milestone.tasks.map((task, tIndex) => (
                  <div key={tIndex} className="glass-gold rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <span className="text-white font-medium">{task.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        task.status === 'Completed' ? 'status-approved' :
                        task.status === 'In Progress' ? 'status-pending' :
                        'status-review'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>{new Date(task.startDate).toLocaleDateString()}</span>
                        <span>→</span>
                        <span>{new Date(task.endDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-gold font-medium">{task.completion}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alert Box */}
        <motion.div
          className="mt-8 glass-gold rounded-2xl p-6 border-2 border-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-start space-x-4">
            <AlertCircle className="text-gold flex-shrink-0" size={24} />
            <div>
              <h3 className="text-lg font-bold text-gold mb-2">Upcoming Milestone</h3>
              <p className="text-gray-300">
                Final design approval is scheduled for February 5th. Please review all design options and provide your feedback by February 3rd to stay on track.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
