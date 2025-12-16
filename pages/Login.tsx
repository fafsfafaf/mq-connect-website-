import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { EtheralShadow } from '../components/ui/EtheralShadow';
import { Logo } from '../components/ui/Logo';
import { Link } from 'react-router-dom';

export const Login: React.FC = () => {
  const [view, setView] = useState<'login' | 'forgot'>('login');
  
  // Login State
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  // Password Reset State
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('idle');

    // Simulate API verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock Validation
    if (formData.email.includes('@mq-connect.de')) {
      setStatus('success');
    } else {
      setStatus('error');
    }
    setIsLoading(false);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetStatus('loading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setResetStatus('success');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] relative flex items-center justify-center p-4 bg-slate-50 overflow-hidden">
      
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <EtheralShadow
           color="#BAE6FD"
           animation={{ scale: 60, speed: 15 }}
           noise={{ opacity: 0.05, scale: 0.5 }}
           sizing="stretch"
         />
      </div>

      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* REFACTOR: Replaced backdrop-blur-xl with bg-white/95 for Safari stability */}
        <Card className="bg-white/95 border border-white/50 shadow-2xl p-8 md:p-10 macos-layer-fix">
          
          {/* Header & Logo Logic */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-blue-900/10 overflow-hidden border border-slate-100">
               <Logo imgClassName="w-full h-full object-contain p-2" />
            </div>
            
            <AnimatePresence mode="wait">
              {view === 'login' ? (
                <motion.div 
                  key="login-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Mitarbeiter Portal</h1>
                  <p className="text-slate-500 text-sm">Bitte melde dich mit deiner MQ-ID an.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="forgot-header"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <h1 className="text-2xl font-bold text-slate-900 mb-2">Passwort vergessen?</h1>
                  <p className="text-slate-500 text-sm">Kein Problem. Wir senden dir einen Link.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            {view === 'login' ? (
              <motion.form 
                key="login-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleLoginSubmit} 
                className="space-y-5"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-slate-500 ml-1">E-Mail / Benutzername</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-[#004e82] transition-colors" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="name@mq-connect.de"
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white/50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium placeholder:text-slate-300"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-xs font-bold uppercase text-slate-500">Passwort</label>
                    <button 
                      type="button" 
                      className="text-xs font-semibold text-[#004e82] hover:underline" 
                      onClick={() => setView('forgot')}
                    >
                      Vergessen?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-[#004e82] transition-colors" />
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl border-2 border-slate-200 bg-white/50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium placeholder:text-slate-300"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Error / Success Messages */}
                {status === 'error' && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-3 flex items-start gap-3 text-sm text-red-600 animate-in slide-in-from-top-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Zugangsdaten ungültig oder Account gesperrt.</span>
                  </div>
                )}

                {status === 'success' && (
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-start gap-3 text-sm text-green-600 animate-in slide-in-from-top-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                    <span>Anmeldung erfolgreich! Weiterleitung...</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  fullWidth 
                  size="lg" 
                  isLoading={isLoading}
                  className="mt-6 shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 py-4 text-base"
                >
                  {!isLoading && <span className="flex items-center">Anmelden <ArrowRight className="w-4 h-4 ml-2" /></span>}
                  {isLoading && "Prüfe Daten..."}
                </Button>
              </motion.form>
            ) : (
              // Forgot Password View
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {resetStatus === 'success' ? (
                   <div className="text-center py-6">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Send className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">E-Mail versendet!</h3>
                      <p className="text-slate-600 text-sm mb-6">
                        Wir haben eine Anleitung zum Zurücksetzen des Passworts an <strong>{resetEmail}</strong> gesendet.
                      </p>
                      <Button variant="outline" fullWidth onClick={() => { setView('login'); setResetStatus('idle'); setResetEmail(''); }}>
                        Zurück zum Login
                      </Button>
                   </div>
                ) : (
                  <form onSubmit={handleResetSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase text-slate-500 ml-1">Deine E-Mail Adresse</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5 group-focus-within:text-[#004e82] transition-colors" />
                        <input 
                          type="email" 
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          required
                          placeholder="name@mq-connect.de"
                          className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-200 bg-white/50 focus:bg-white focus:border-[#004e82] outline-none transition-all font-medium placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      fullWidth 
                      size="lg" 
                      isLoading={resetStatus === 'loading'}
                      className="mt-6 shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 py-4 text-base"
                    >
                      Link anfordern
                    </Button>

                    <button 
                      type="button" 
                      onClick={() => setView('login')}
                      className="w-full py-2 text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-2 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Zurück zum Login
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Text */}
          {view === 'login' && (
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-400">
                Probleme beim Login? <Link to="/kontakt" className="text-slate-600 font-bold hover:text-[#004e82] underline decoration-slate-300">Support kontaktieren</Link>
              </p>
            </div>
          )}

        </Card>
      </motion.div>
    </div>
  );
};