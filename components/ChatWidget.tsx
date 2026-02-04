import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Knowledge Base für MQ-Connect
const KNOWLEDGE_BASE = `
Du bist der freundliche KI-Assistent von MQ-Connect, einer erfolgreichen Vertriebsagentur aus Moers in Nordrhein-Westfalen.

## ÜBER MQ-CONNECT
- **Firmenname:** MQ-Connect
- **Standort:** Uerdinger Str. 77, 47441 Moers, NRW
- **Gründer & CEO:** Milan Jasieniecki
- **Telefon:** 0163 / 40 36 513
- **E-Mail:** info@mq-connect.de
- **Öffnungszeiten:** Mo - Fr: 10.00 - 18.30 Uhr

## WAS WIR TUN
MQ-Connect ist spezialisiert auf Door-to-Door (D2D) Direktvertrieb. Wir vermitteln:
- Glasfaser-Internetanschlüsse (FTTH)
- Strom- und Gastarife
- Telekommunikationsprodukte
- Photovoltaik-Leads (PV-Anfragen)

Unsere Partner sind große Marken wie E.ON, Telekom, Vattenfall und Lekker.

## UNSERE VISION
Wir wollen den Door-to-Door Vertrieb in Deutschland wieder "salonfähig" machen. Keine Abzocke, sondern ehrliche, qualitative Beratung vor Ort. Maximale Transparenz für Kunden und Fairness für Mitarbeiter.

## KARRIERE BEI MQ-CONNECT
**Wir suchen:**
- Alter: 17-30 Jahre (ideal)
- Fließend Deutsch
- Motivation und Leistungsbereitschaft
- Quereinsteiger willkommen (Handwerker, Gastro, Sportler passen oft perfekt)
- Führerschein optimal, aber kein Muss

**Was wir bieten:**
- Überdurchschnittliche Verdienstmöglichkeiten (Provision)
- Umfassende Einarbeitung & Sales-Skripte
- Schnelle Aufstiegschancen zum Teamleiter
- Cooles, junges Team & regelmäßige Events
- Persönlichkeitsentwicklung & Mindset-Coaching
- Pünktliche Auszahlung & transparente Abrechnung

**Bewerbungsprozess:**
1. Bewerbungsformular ausfüllen (9 kurze Fragen, kein Lebenslauf nötig)
2. Kontaktaufnahme innerhalb 24h per WhatsApp/Anruf
3. Kurzes Kennenlerngespräch
4. Probetag im Team

**Bewerbungslink:** https://mq-connect.de/bewerben

## ÜBER DEN GRÜNDER
Milan Jasieniecki hat das Vertriebshandwerk von der Pike auf gelernt. Er hat hunderte Mitarbeiter ausgebildet und gilt als einer der Vorreiter im modernen D2D-Geschäft in NRW. Er motiviert nicht nur vom Schreibtisch aus, sondern lebt vor, was möglich ist.

## UNSERE WERTE
- **Ehrlichkeit:** Keine leeren Versprechen
- **Wachstum:** Jeden Tag 1% besser werden
- **Gemeinschaft:** Zusammen gewinnen und lernen

## WICHTIGE HINWEISE FÜR DEINE ANTWORTEN
- Antworte immer auf Deutsch
- Sei freundlich, professionell aber locker
- Halte Antworten kurz und prägnant (max 3-4 Sätze wenn möglich)
- Bei Interesse an einem Job, verweise auf /bewerben
- Bei Fragen die du nicht beantworten kannst, verweise auf die Telefonnummer oder E-Mail
- Verwende gelegentlich Emojis, aber nicht übertrieben
`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hey! 👋 Ich bin der MQ-Connect Assistent. Wie kann ich dir helfen? Frag mich gerne zu Jobs, unserem Team oder was wir machen!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Prepare conversation history for context
      const conversationHistory = messages
        .slice(-6) // Keep last 6 messages for context
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n');

      const prompt = `${KNOWLEDGE_BASE}

## BISHERIGE KONVERSATION
${conversationHistory}

## AKTUELLE FRAGE
User: ${userMessage}

Antworte jetzt als MQ-Connect Assistent:`;

      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDWrHGcdzU60H1FBWp6eG-AcrMwh7J23F4',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('rate_limit');
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const assistantMessage = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
      } else if (data.error) {
        throw new Error(data.error.message || 'API Error');
      } else {
        throw new Error('Invalid response');
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      const isRateLimit = error.message === 'rate_limit' || error.message?.includes('429');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: isRateLimit
          ? 'Ich bin gerade etwas überlastet. Bitte warte einen Moment und versuche es nochmal! ⏳'
          : 'Entschuldigung, da ist etwas schiefgelaufen. Versuch es nochmal oder ruf uns an unter 0163 / 40 36 513! 📞'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-[#004e82] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#003d66] transition-colors"
            aria-label="Chat öffnen"
          >
            <MessageCircle className="w-7 h-7" />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[550px] max-h-[calc(100vh-100px)] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="bg-[#004e82] text-white p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">MQ-Connect Assistent</h3>
                  <p className="text-xs text-blue-200">Immer für dich da</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Chat schließen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user' ? 'bg-slate-200' : 'bg-[#004e82]'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-slate-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-[#004e82] text-white rounded-br-md'
                        : 'bg-white text-slate-700 rounded-bl-md shadow-sm border border-slate-100'
                    }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#004e82] flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-100">
                      <Loader2 className="w-5 h-5 animate-spin text-[#004e82]" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Schreib eine Nachricht..."
                  className="flex-1 px-4 py-3 bg-slate-50 rounded-xl border border-slate-200 focus:border-[#004e82] focus:ring-2 focus:ring-blue-50 outline-none text-sm text-slate-700 placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 bg-[#004e82] text-white rounded-xl flex items-center justify-center hover:bg-[#003d66] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Nachricht senden"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-400 text-center mt-2">
                Powered by Google Gemini AI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
