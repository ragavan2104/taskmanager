import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-xl font-bold text-blue-600 flex items-center">
              <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="24" height="24" rx="4" fill="#3B82F6"/>
                <path d="M9,16.17 L4.83,12 L3.41,13.41 L9,19 L21,7 L19.59,5.59 L9,16.17 Z" fill="white"/>
              </svg>
              Task Manager
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
              <Link to="/create" className="text-gray-700 hover:text-blue-600">
                Create Task
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="py-6">
        <Outlet />
      </main>

      <footer className="bg-white shadow-inner mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500">
          <p>Task Manager - Organize Your Tasks Efficiently</p>
          <p className="text-xs mt-1">Built with React, React Router, and Tailwind CSS</p>
        </div>
      </footer>
    </div>
  )
}

export default App
