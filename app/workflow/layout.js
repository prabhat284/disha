---

## **6. CREATE: `/app/workflow/layout.js`**
```javascript
// Path: /app/workflow/layout.js
// Purpose: Workflow section layout with navigation

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, Compass, MessageSquare, Package, Wrench } from 'lucide-react'

export default function WorkflowLayout({ children }) {
  const pathname = usePathname()

  const workflowPages = [
    { 
      id: 'requirements', 
      name: 'Requirements', 
      path: '/workflow/requirements',
      icon: ClipboardList,
      description: 'Capture client needs'
    },
    { 
      id: 'design-guide', 
      name: 'Design Guide', 
      path: '/workflow/design-guide',
      icon: Compass,
      description: 'Step-by-step checklist'
    },
    { 
      id: 'review', 
      name: 'Review', 
      path: '/workflow/review',
      icon: MessageSquare,
      description: 'Client feedback'
    },
    { 
      id: 'manufacturing', 
      name: 'Manufacturing', 
      path: '/workflow/manufacturing',
      icon: Package,
      description: 'Production tracking'
    },
    { 
      id: 'installation', 
      name: 'Installation', 
      path: '/workflow/installation',
      icon: Wrench,
      description: 'Site progress'
    }
  ]

  return (
    <div className="min-h-screen bg-luxury-dark">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-dark/95 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-serif font-bold text-gradient">
              DISHA
            </Link>
            <div className="flex items-center gap-2 overflow-x-auto">
              {workflowPages.map((page) => {
                const isActive = pathname === page.path
                const Icon = page.icon
                
                return (
                  <Link
                    key={page.id}
                    href={page.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-gold text-black'
                        : 'text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="hidden md:inline">{page.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}

