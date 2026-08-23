import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';

// Lazy loading pages for optimized performance (code splitting)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Products = lazy(() => import('./pages/Products'));
const Events = lazy(() => import('./pages/Events'));
const Internships = lazy(() => import('./pages/Internships'));
const Testimonials = lazy(() => import('./pages/Testimonials'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const BookCall = lazy(() => import('./pages/BookCall'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loader component for lazy loading transitions
const PageLoader = () => (
  <div className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{ backgroundColor: 'var(--dark-bg)' }}>
    <Loader2 className="animate-spin text-gradient" size={48} />
    <span className="text-gradient-cyan mt-3 fw-bold tracking-wider text-uppercase" style={{ fontSize: '0.9rem' }}>
      Loading Area Coordinates...
    </span>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <MainLayout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/products" element={<Products />} />
              <Route path="/events" element={<Events />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/book-call" element={<BookCall />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

