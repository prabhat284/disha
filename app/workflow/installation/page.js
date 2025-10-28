---

## **5. CREATE: `/app/workflow/installation/page.js`**
```javascript
// Path: /app/workflow/installation/page.js
// Purpose: Installation tracking and progress monitoring

'use client'

import { useState } from 'react'
import { Calendar, CheckCircle, Clock, MapPin, User, Camera, AlertTriangle } from 'lucide-react'

export default function InstallationPage() {
  const [selectedDay, setSelectedDay] = useState(1)

  const installationSchedule = {
    startDate: '2025-03-08',
    endDate: '2025-03-15',
    totalDays: 7,
    team: [
      { name: 'Rajesh Kumar', role: 'Lead Carpenter', phone: '+91 98765 43210' },
      { name: 'Amit Singh', role: 'Assistant Carpenter', phone: '+91 98765 43211' },
      { name: 'Suresh Yadav', role: 'Helper', phone: '+91 98765 43212' }
    ],
    
    dailyPlan: [
      {
        day: 1,
        date: '2025-03-08',
        tasks: [
          { name: 'Site preparation & cleaning', status: 'completed', time: '9:00 AM - 11:00 AM' },
          { name: 'Mark wall measurements', status: 'completed', time: '11:00 AM - 12:00 PM' },
          { name: 'Install base cabinet BC-001', status: 'completed', time: '12:00 PM - 3:00 PM' },
          { name: 'Install base cabinet BC-002', status: 'completed', time: '3:00 PM - 6:00 PM' }
        ],
        progress: 100,
        photos: 4
      },
      {
        day: 2,
        date: '2025-03-09',
        tasks: [
          { name: 'Install base cabinet BC-003', status: 'in-progress', time: '9:00 AM - 12:00 PM' },
          { name: 'Install base cabinet BC-004 (Peninsula)', status: 'pending', time: '12:00 PM - 4:00 PM' },
          { name: 'Level all base cabinets', status: 'pending', time: '4:00 PM - 6:00 PM' }
        ],
        progress: 30,
        photos: 2
      },
      {
        day: 3,
        date: '2025-03-10',
        tasks: [
          { name: 'Install wall cabinet WC-001', status: 'pending', time: '9:00 AM - 12:00 PM' },
          { name: 'Install wall cabinet WC-002', status: 'pending', time: '12:00 PM - 3:00 PM' },
          { name: 'Check alignment', status: 'pending', time: '3:00 PM - 4:00 PM' }
        ],
        progress: 0,
        photos: 0
      },
      {
        day: 4,
        date: '2025-03-11',
        tasks: [
          { name: 'Install tall unit TU-001', status: 'pending', time: '9:00 AM - 1:00 PM' },
          { name: 'Install tall unit TU-002', status: 'pending', time: '1:00 PM - 5:00 PM' }
        ],
        progress: 0,
        photos: 0
      },
      {
        day: 5,
        date: '2025-03-12',
        tasks: [
          { name: 'Countertop installation', status: 'pending', time: '9:00 AM - 2:00 PM' },
          { name: 'Sink cutout & installation', status: 'pending', time: '2:00 PM - 4:00 PM' },
          { name: 'Hob cutout & installation', status: 'pending', time: '4:00 PM - 6:00 PM' }
        ],
        progress: 0,
        photos: 0
      },
      {
        day: 6,
        date: '2025-03-13',
        tasks: [
          { name: 'Backsplash tiling', status: 'pending', time: '9:00 AM - 2:00 PM' },
          { name: 'Install chimney', status: 'pending', time: '2:00 PM - 4:00 PM' },
          { name: 'Install water purifier', status: 'pending', time: '4:00 PM - 5:00 PM' }
        ],
        progress: 0,
        photos: 0
      },
      {
        day: 7,
        date: '2025-03-14',
        tasks: [
          { name: 'Final hardware adjustments', status: 'pending', time: '9:00 AM - 12:00 PM' },
          { name: 'Install LED strips', status: 'pending', time: '12:00 PM - 2:00 PM' },
          { name: 'Cleanup & quality check', status: 'pending', time: '2:00 PM - 5:00 PM' },
          { name: 'Client walkthrough', status: 'pending', time: '5:00 PM - 6:00 PM' }
        ],
        progress: 0,
        photos: 0
      }
    ],
    
    issues: [
      { 
        id: 1,
        day: 1,
        severity: 'low',
        description: 'Wall not perfectly level, adjusted with shims',
        resolution: 'Added extra shims to compensate',
        status: 'resolved'
      }
    ]
  }

  const currentDay = installationSchedule.dailyPlan[selectedDay - 1]
  
  const calculateOverallProgress = () => {
    const totalTasks = installationSchedule.dailyPlan.reduce((acc, day) => acc + day.tasks.length, 0)
    const completedTasks = installationSchedule.dailyPlan.reduce((acc, day) => 
      acc + day.tasks.filter(t => t.status === 'completed').length, 0)
    return Math.round((completedTasks / totalTasks) * 100)
  }

  return (
    <div className="min-h-screen bg-luxury-dark pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gradient mb-2">
              Installation Tracker
            </h1>
            <p className="text-gray-400">
              Real-time progress monitoring and site updates
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-sm mb-1">Overall Progress</p>
            <p className="text-4xl font-bold text-gold">{calculateOverallProgress()}%</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="glass rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-gold" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="text-white font-bold">Jamshedpur, Jharkhand</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gold" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Duration</p>
                <p className="text-white font-bold">7 Days</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-gold" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Day</p>
                <p className="text-white font-bold">{selectedDay} of 7</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <User className="text-gold" size={24} />
              <div>
                <p className="text-gray-400 text-sm">Team Size</p>
                <p className="text-white font-bold">{installationSchedule.team.length} Members</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Info */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Installation Team</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {installationSchedule.team.map((member, idx) => (
              <div key={idx} className="p-4 bg-luxury-gray rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <User className="text-gold" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-bold">{member.name}</p>
                    <p className="text-gray-400 text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-gold text-sm font-mono">{member.phone}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Day Selector */}
        <div className="glass rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Select Day</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {installationSchedule.dailyPlan.map((day) => (
              <button
                key={day.day}
                onClick={() => setSelectedDay(day.day)}
                className={`flex-shrink-0 p-4 rounded-lg transition-all min-w-[120px] ${
                  selectedDay === day.day
                    ? 'bg-gold text-black'
                    : day.progress === 100
                    ? 'bg-green-600/20 text-green-400'
                    : day.progress > 0
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-luxury-gray text-gray-400'
                }`}
              >
                <p className="font-bold mb-1">Day {day.day}</p>
                <p className="text-xs mb-2">{day.date}</p>
                <div className="flex items-center justify-center gap-1">
                  {day.progress === 100 ? (
                    <CheckCircle size={16} />
                  ) : (
                    <span className="font-bold">{day.progress}%</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Day Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Day {currentDay.day} Tasks
                </h2>
                <span className="text-gray-400">{currentDay.date}</span>
              </div>

              <div className="space-y-4">
                {currentDay.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 ${
                      task.status === 'completed'
                        ? 'border-green-500 bg-green-500/10'
                        : task.status === 'in-progress'
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-gray-700 bg-luxury-gray'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {task.status === 'completed' ? (
                          <CheckCircle className="text-green-500" size={24} />
) : task.status === 'in-progress' ? (
<Clock className="text-yellow-500 animate-pulse" size={24} />
) : (
<div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>
)}
</div>
<div className="flex-1">
<h3 className={font-semibold mb-1 ${                           task.status === 'completed' ? 'text-gray-500 line-through' : 'text-white'                         }}>
{task.name}
</h3>
<p className="text-gray-400 text-sm">{task.time}</p>
</div>
<span className={px-3 py-1 rounded-full text-xs font-medium ${                         task.status === 'completed'                           ? 'bg-green-500/20 text-green-400'                           : task.status === 'in-progress'                           ? 'bg-yellow-500/20 text-yellow-400'                           : 'bg-gray-500/20 text-gray-400'                       }}>
{task.status.replace('-', ' ')}
</span>
</div>
</div>
))}
</div>
{/* Day Progress */}
          <div className="mt-6 pt-6 border-t border-gold/20">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Day Progress</span>
              <span className="text-white font-bold">{currentDay.progress}%</span>
            </div>
            <div className="w-full bg-luxury-dark rounded-full h-3">
              <div 
                className="bg-gold h-3 rounded-full transition-all"
                style={{ width: `${currentDay.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Site Photos */}
        <div className="glass rounded-xl p-6 mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Camera size={20} className="text-gold" />
              Site Photos
            </h3>
            <span className="text-gray-400">{currentDay.photos} photos</span>
          </div>

          {currentDay.photos > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: currentDay.photos }).map((_, idx) => (
                <div key={idx} className="aspect-video bg-luxury-gray rounded-lg flex items-center justify-center">
                  <Camera size={32} className="text-gray-600" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Camera size={48} className="mx-auto mb-3 opacity-50" />
              <p>No photos uploaded yet</p>
            </div>
          )}

          <button className="w-full mt-4 px-4 py-3 bg-gold text-black rounded-lg hover:bg-gold-light transition-all font-semibold">
            Upload Photos
          </button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        
        {/* Overall Timeline */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Installation Timeline</h3>
          <div className="space-y-3">
            {installationSchedule.dailyPlan.map((day) => (
              <div key={day.day} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  day.progress === 100
                    ? 'bg-green-500 text-white'
                    : day.progress > 0
                    ? 'bg-gold text-black'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {day.day}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">Day {day.day}</p>
                  <p className="text-gray-400 text-xs">{day.date}</p>
                </div>
                <div className="text-right">
                  {day.progress === 100 ? (
                    <CheckCircle className="text-green-500" size={20} />
                  ) : (
                    <span className={`text-sm font-bold ${
                      day.progress > 0 ? 'text-gold' : 'text-gray-500'
                    }`}>
                      {day.progress}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Issues & Notes */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle size={20} className="text-yellow-500" />
            Issues & Notes
          </h3>
          
          {installationSchedule.issues.length > 0 ? (
            <div className="space-y-3">
              {installationSchedule.issues.map((issue) => (
                <div key={issue.id} className={`p-4 rounded-lg border ${
                  issue.severity === 'high'
                    ? 'border-red-500 bg-red-500/10'
                    : issue.severity === 'medium'
                    ? 'border-yellow-500 bg-yellow-500/10'
                    : 'border-blue-500 bg-blue-500/10'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.severity === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : issue.severity === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      Day {issue.day} • {issue.severity}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      issue.status === 'resolved'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-white text-sm mb-2">{issue.description}</p>
                  <p className="text-gray-400 text-xs">
                    <strong>Resolution:</strong> {issue.resolution}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <p className="text-sm">No issues reported</p>
            </div>
          )}

          <button className="w-full mt-4 px-4 py-2 glass-gold text-gold rounded-lg hover:bg-gold hover:text-black transition-all text-sm font-semibold">
            Report Issue
          </button>
        </div>

        {/* Weather Info */}
        <div className="glass rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Today's Weather</h3>
          <div className="text-center">
            <p className="text-5xl mb-2">☀️</p>
            <p className="text-3xl font-bold text-white mb-1">28°C</p>
            <p className="text-gray-400 mb-4">Clear Sky</p>
            <p className="text-sm text-green-400">✓ Good conditions for work</p>
          </div>
        </div>

      </div>

    </div>

  </div>
</div>
)
}
