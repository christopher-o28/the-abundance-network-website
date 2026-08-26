import { Routes, Route } from 'react-router-dom'
import Navbar from './Layout/Navbar'
import Footer from './Layout/Footer'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import Shows from './pages/Shows'
import ForBrands from './pages/ForBrands'
import ForCreators from './pages/ForCreators'
import BeAGuest from './pages/BeAGuest'
import StudioRentals from './pages/StudioRentals'
import Insider from './pages/Insider'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shows" element={<Shows />} />
            <Route path="/for-brands" element={<ForBrands />} />
            <Route path="/for-creators" element={<ForCreators />} />
            <Route path="/be-a-guest" element={<BeAGuest />} />
            <Route path="/studio-rentals" element={<StudioRentals />} />
            <Route path="/insider" element={<Insider />} />
          </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}
