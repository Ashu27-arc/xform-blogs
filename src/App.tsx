import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import EmbededForm from './components/embededForm.tsx'
import EmbededBanner from './components/embededBanner.tsx'
import EmbededBanner1 from './components/embededBanner-1.tsx'
import EmbededBanner2 from './components/embededBanner-2.tsx'
import EmbededBanner3 from './components/embededBanner-3.tsx'
import EmbededBanner4 from './components/embededBanner-4.tsx'
import EmbededBanner5 from './components/embededBanner-5.tsx'
import EmbededBanner6 from './components/embededBanner-6.tsx'
import EmbededeFAQs from './components/embededeFAQs.tsx'
import EmbededWhatsapp from './components/embededWhatsapp.tsx'

export default function App() {
  return (
    <div className="w-full overflow-hidden p-0 m-0">
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
                src="/mbbs-in-india.webp"
                alt="Radical banner"
                className="w-full max-w-[800px]"
              />
            </div>
          }
        />
        <Route
          path="/banner-1"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner1 />
            </div>
          }
        />
        <Route
          path="/banner-2"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner2 />
            </div>
          }
        />
        <Route
          path="/banner-3"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner3 />
            </div>
          }
        />
        <Route
          path="/banner-4"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner4 />
            </div>
          }
        />
        <Route
          path="/banner-5"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner5 />
            </div>
          }
        />
        <Route
          path="/banner-6"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededBanner6 />
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
        <Route
          path="/whatsapp"
          element={
            <div className="mx-auto flex max-w-5xl justify-center overflow-hidden">
              <EmbededWhatsapp />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/neet-updates" replace />} />
      </Routes>
    </div>
  )
}
