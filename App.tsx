import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LazyMotion, domAnimation } from 'framer-motion';
import { Layout } from './components/Layout';
import { CookieConsent } from './components/CookieConsent';

// Lazy load pages to split code bundles
const Home = React.lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const About = React.lazy(() => import('./pages/About').then(module => ({ default: module.About })));
const Services = React.lazy(() => import('./pages/Services').then(module => ({ default: module.Services })));
const Partners = React.lazy(() => import('./pages/Partners').then(module => ({ default: module.Partners })));
const Careers = React.lazy(() => import('./pages/Careers').then(module => ({ default: module.Careers })));
const Apply = React.lazy(() => import('./pages/Apply').then(module => ({ default: module.Apply })));
const BusinessPartner = React.lazy(() => import('./pages/BusinessPartner').then(module => ({ default: module.BusinessPartner })));
const Contact = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const Blog = React.lazy(() => import('./pages/Blog').then(module => ({ default: module.Blog })));
const BlogPostDetail = React.lazy(() => import('./pages/BlogPostDetail').then(module => ({ default: module.BlogPostDetail })));
const Login = React.lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Impressum = React.lazy(() => import('./pages/Legal').then(module => ({ default: module.Impressum })));
const Datenschutz = React.lazy(() => import('./pages/Legal').then(module => ({ default: module.Datenschutz })));
const CookiePolicy = React.lazy(() => import('./pages/CookiePolicy').then(module => ({ default: module.CookiePolicy })));

// New Forms
const GasForm = React.lazy(() => import('./pages/forms/GasForm').then(module => ({ default: module.GasForm })));
const SolarForm = React.lazy(() => import('./pages/forms/SolarForm').then(module => ({ default: module.SolarForm })));
const FiberForm = React.lazy(() => import('./pages/forms/FiberForm').then(module => ({ default: module.FiberForm })));
const EnergyForm = React.lazy(() => import('./pages/forms/EnergyForm').then(module => ({ default: module.EnergyForm })));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-8 h-8 border-4 border-[#004e82] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <Router>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ueber-uns" element={<About />} />
              <Route path="/leistungen" element={<Services />} />
              <Route path="/partner" element={<Partners />} />
              <Route path="/karriere" element={<Careers />} />
              <Route path="/bewerben" element={<Apply />} />
              <Route path="/fuer-produktgeber" element={<BusinessPartner />} />
              <Route path="/kontakt" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/cookie-richtlinien" element={<CookiePolicy />} />

              {/* Form Routes */}
              <Route path="/Gas-formular" element={<GasForm />} />
              <Route path="/PV-formular" element={<SolarForm />} />
              <Route path="/Glasfaser-formular" element={<FiberForm />} />
              <Route path="/Energie-formular" element={<EnergyForm />} />
            </Routes>
          </Suspense>
        </Layout>
        <CookieConsent />
      </Router>
    </LazyMotion>
  );
};

export default App;