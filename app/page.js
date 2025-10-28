'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, TrendingUp, CheckCircle2, AlertCircle, ArrowRight, MapPin, Clock } from 'lucide-react'
import projectInfo from '@/data/project-info.json'

import { ClipboardList, Sparkles } from 'lucide-react'

export default function Dashboard() {
  const quickStats = [
    {
      label: 'Project Progress',
      value: `${projectInfo.completionPercentage}%`,
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      label: 'Budget Used',
      value: `₹${(projectInfo.budget.spent / 100000).toFixed(1)}L`,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      label: 'Days Remaining',
      value: '61',
      icon: Calendar,
      color: 'text-gold',
      bgColor: 'bg-gold/10'
    },
    {
      label: 'Current Phase',
      value: projectInfo.currentPhase,
      icon: Clock,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    }
  ]

  const recentActivity = [
    {
      action: 'Design Option B selected',
      user: 'Neeru Tiwary',
      time: '2 days ago',
      status: 'approved'
    },
    {
      action: 'Countertop material changed to Quartz',
      user: 'Architect',
      time: '3 days ago',
      status: 'approved'
    },
    {
      action: 'Brass hardware finish pending approval',
      user: 'Neeru Tiwary',
      time: '5 days ago',
      status: 'pending'
    }
  ]

  const quickActions = [
    { label: 'View Design Options', href: '/designs', icon: '🎨' },
    { label: 'Check Timeline', href: '/timeline', icon: '📅' },
    { label: 'Review Budget', href: '/budget', icon: '💰' },
    { label: 'Hafele Products', href: '/products', icon: '🔧' }
  ]

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gold-light rounded-full blur-3xl animate-float delay-200"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 glass-gold rounded-full mb-6">
                <span className="text-gold text-sm font-medium">Welcome Back, Neeru! 👋</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient mb-6">
                Project {projectInfo.projectName}
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                {projectInfo.projectType} • {projectInfo.area} • Jamshedpur
              </p>
              
              {/* Progress Bar */}
              <div className="glass rounded-2xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-400">Overall Progress</span>
                  <span className="text-gold font-bold text-lg">{projectInfo.completionPercentage}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${projectInfo.completionPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
                <div className="flex justify-between mt-3 text-sm text-gray-500">
                  <span>Started: {new Date(projectInfo.startDate).toLocaleDateString()}</span>
                  <span>Target: {new Date(projectInfo.expectedCompletion).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                className="glass rounded-2xl p-6 card-hover transition-luxury"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4`}>
                  <Icon className={stat.color} size={24} />
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex items-center justify-between p-4 glass-gold rounded-xl hover:bg-gold hover:text-black transition-luxury group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{action.icon}</span>
                      <span className="font-medium text-gold group-hover:text-black">{action.label}</span>
                    </div>
                    <ArrowRight className="text-gold group-hover:text-black" size={20} />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-2xl p-6">
              <h2 className="text-2xl font-serif font-bold text-white mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 glass-gold rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.status === 'approved' ? 'bg-green-400/20' : 'bg-yellow-400/20'
                    }`}>
                      {activity.status === 'approved' ? (
                        <CheckCircle2 className="text-green-400" size={20} />
                      ) : (
                        <AlertCircle className="text-yellow-400" size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{activity.action}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'approved' ? 'status-approved' : 'status-pending'
                    }`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
       

        {/* Important Notice */}
        <motion.div
          className="mt-8 glass-gold rounded-2xl p-6 border-2 border-gold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
              <AlertCircle className="text-black" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gold mb-2">Action Required</h3>
              <p className="text-gray-300 mb-4">
                Please review and approve the brass hardware finish for the cabinets. The Hafele order needs to be placed by Feb 16th to meet the project timeline.
              </p>
              <Link
                href="/collaboration"
                className="inline-flex items-center px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-luxury"
              >
                Review Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
