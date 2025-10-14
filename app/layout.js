import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'DISHA - Kitchen Project | Neeru Tiwary',
  description: 'Collaborative kitchen design platform for Project DISHA featuring Hafele products',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-luxury-dark">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-luxury-dark py-8 border-t border-luxury-border">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500 text-sm">
              Project DISHA © {new Date().getFullYear()} | Powered by Hafele
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
