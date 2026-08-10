import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import SearchOverlay from './components/SearchOverlay'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import { useState } from 'react'

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen bg-surface">
          <Navbar onSearchClick={() => setIsSearchOpen(true)} />
          <CartDrawer />
          <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
          <WhatsAppFloat />
        </div>
      </WishlistProvider>
    </CartProvider>
  )
}

export default App
