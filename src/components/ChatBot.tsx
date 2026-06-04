import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, ChevronRight } from 'lucide-react';
import { useLanguage } from '../i18n/context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function ChatBot() {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Reset conversation when language changes so starters refresh
  useEffect(() => {
    setMessages([]);
    setError(null);
  }, [lang]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;
    const next: Message[] = [...messages, { role: 'user', content }];
    setMessages(next);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next, lang }),
      });
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      setMessages([...next, { role: 'assistant', content: data.content }]);
    } catch {
      setError(t.chatbot.error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="w-[calc(100vw-3rem)] sm:w-[440px] max-h-[75vh] sm:max-h-[620px] bg-white rounded-2xl border border-slate-200 shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
              <div>
                <p className="font-serif text-base font-medium text-slate-900">
                  {t.chatbot.panelTitle}
                </p>
                <p className="text-[10px] text-slate-400 tracking-widest uppercase mt-0.5">
                  {t.chatbot.panelSubtitle}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100"
                aria-label={t.chatbot.closeLabel}
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 min-h-0 custom-scrollbar">
              {messages.length === 0 && (
                <div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    {t.chatbot.intro}
                  </p>
                  <div className="space-y-2">
                    {t.chatbot.starters.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-xs text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-2.5 transition-colors flex items-center justify-between gap-2 group"
                      >
                        <span>{q}</span>
                        <ChevronRight
                          size={12}
                          className="text-slate-400 group-hover:text-blue-600 transition-colors shrink-0"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] text-sm leading-relaxed rounded-xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-100 rounded-xl rounded-bl-sm px-4 py-3.5">
                    <div className="flex gap-1 items-center">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 bg-slate-400 rounded-full block"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.4,
                            repeat: Infinity,
                            delay: i * 0.2,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-xs text-slate-400 italic text-center py-1">{error}</p>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-slate-100 flex gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chatbot.placeholder}
                disabled={isLoading}
                className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300 focus:ring-1 focus:ring-blue-100 transition-colors disabled:opacity-50 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send"
                className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher pill */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-3 border shadow-lg rounded-full px-6 py-3.5 text-base font-semibold transition-all duration-200 ${
          isOpen
            ? 'bg-blue-600 text-white border-blue-600 shadow-blue-300'
            : 'bg-white text-slate-700 border-slate-300 hover:border-blue-400 hover:text-blue-600 hover:shadow-xl'
        }`}
      >
        <MessageCircle size={19} className={isOpen ? 'text-white' : 'text-blue-600'} />
        <span>{t.chatbot.launcherLabel}</span>
      </motion.button>
    </div>
  );
}
