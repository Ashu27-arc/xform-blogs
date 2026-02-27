import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import EmbededForm from './components/embededForm'
import EmbededBanner from './components/embededBanner'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-6">
      <Routes>
        <Route path="/" element={<Navigate to="/neet-updates" replace />} />
        <Route
          path="/neet-updates"
          element={
            <div className="mx-auto flex max-w-5xl justify-center">
              <EmbededForm />
            </div>
          }
        />
        <Route
          path="/banner"
          element={
            <div className="mx-auto flex max-w-5xl justify-center">
              <EmbededBanner
                src="/vite.svg"
                alt="Radical banner"
                className="w-full max-w-[420px]"
              />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/neet-updates" replace />} />
      </Routes>
    </div>
  )
}
