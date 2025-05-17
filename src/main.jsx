import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import CreateTask from './pages/CreateTask.jsx'
import EditTask from './pages/EditTask.jsx'
import { TaskProvider } from './context/TaskContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="create" element={<CreateTask />} />
            <Route path="edit/:id" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  </StrictMode>,
)
