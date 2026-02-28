import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import EmbededForm from './components/embededForm'
import EmbededBanner from './components/embededBanner'
import EmbededeFAQs from './components/embededeFAQs'

export default function App() {
  return (
    <div className="w-full bg-slate-50 p-6 overflow-hidden">
      <Routes>
        <Route path="/" element={<Navigate to="/neet-updates" replace />} />
        <Route
          path="/neet-updates"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededForm />
            </div>
          }
        />
        <Route
          path="/banner"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner
                src="/MBBS-IN-INDIA-BANNER-26.webp"
                alt="Radical banner"
                className="w-full max-w-[420px]"
              />
            </div>
          }
        />
        <Route
          path="/faqs"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededeFAQs className="w-full max-w-[520px]" />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/neet-updates" replace />} />
      </Routes>
    </div>
  )
}
