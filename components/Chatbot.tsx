import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { CloseIcon, RefreshIcon, VoiceOptionsIcon } from './icons/MenuIcons';
import { SendIcon, ChatIcon, MicrophoneIcon } from './icons/FeatureIcons';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const initialMessage: Message = {
  id: 'initial-message',
  text: "Hello! I'm the Vehga AI assistant. How can I help you today?\n(నేను తెలుగులో కూడా మాట్లాడగలను. मैं हिंदी में भी बात कर सकता हूँ।)",
  sender: 'bot',
};

const SPEECH_LANGUAGES = [
  { code: 'en-IN', name: 'English' },
  { code: 'te-IN', name: 'తెలుగు' },
  { code: 'hi-IN', name: 'हिन्दी' },
];

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1.5 py-2 px-4">
      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
    </div>
);

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState<Chat | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<string>('en-IN');
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const initializeChatSession = () => {
    try {
      if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        return;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chatInstance = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: `You are "Vehga AI," a highly informed customer support specialist for Vehga Inspections Private Limited. Your main goal is to be helpful, accurate, and concise, using the detailed information provided below.

**Knowledge Base: Vehga Inspections Private Limited**
* **Company:** A tech-enabled vehicle inspection and valuation firm with over 60 years of combined experience.
* **Company Values:**
    * **Precision & Integrity:** We are committed to delivering accurate, compliant, and trustworthy reports.
    * **Technological Innovation:** We leverage modern apps and tools for fast and transparent results.
    * **Client Focus:** We are dedicated to providing timely, service-oriented solutions that meet client needs.
    * **Deep Expertise:** Our work is built on over 60 years of combined industry experience.
* **Operational Areas:**
    * Our primary operations are centered in **Andhra Pradesh**.
    * We have the capacity and network to serve clients across **South India**. For inquiries about service in a specific location, it's best to use the contact form.
* **Location:** Our head office is located at: D.No: 16-23-3/8, Pallamraju Nagar, Kakinada, Andhra Pradesh - 533005.
* **Leadership Team:**
    * N.V. Pradeep Kishore Vemula: Managing Partner
    * Mahesh Garikina: Managing Partner
    * Kare Vasu: Head of Operations
* **Core Services:**
    1.  **Financing Valuations:** For lenders on secured loans.
    2.  **Insurance Inspection & Valuations:** For insurance companies for premiums and claims.
    3.  **Asset Disposal Valuations:** For businesses and individuals selling vehicles.
* **Vehicle Expertise:** We inspect a wide range of vehicles: Two Wheelers, Three Wheelers, Four Wheelers, Farm Equipment, Commercial Vehicles, and Construction Equipment.
* **Our Process (How It Works):**
    1.  **Submit a Request:** Client contacts us to start.
    2.  **On-Site Inspection:** Our surveyor inspects the vehicle.
    3.  **Receive Detailed Report:** Client gets a comprehensive valuation report.
* **Contact & Escalation:** For general inquiries, users can use the contact page. For issues, our escalation matrix is:
    * First Level: Mr Jagadish
    * Second Level: Mr Mahesh Garikina
    * Nodal Officer: Mr N V Pradeep Kishore Vemula

**Personality & Tone:**
* **Professional & Friendly:** Be polite and approachable.
* **Efficient:** Get straight to the point.

**Core Instructions:**
1.  **Multilingual Support:** You can understand and respond in English, Telugu, and Hindi. If a user asks a question in Telugu or Hindi, respond fluently in that same language while still following all other instructions.
2.  **Prioritize Brevity:** Your answers MUST be short and direct, ideally 1-3 sentences. Do not provide long paragraphs.
3.  **Use Your Knowledge Base:** ALWAYS use the information from the "Knowledge Base" section to answer questions about the company's location, services, leadership, etc. Never state that the company has no office or that you don't have this information.
4.  **Answer First, Then Ask:** First, directly answer the user's question using your knowledge base. Then, immediately ask a follow-up question to offer more details or guide them.
    * **Example 1:** If user asks "Where is your office?", respond: "Our office is in Kakinada, Andhra Pradesh. Do you need the full address?"
    * **Example 2:** If user asks "Who is in charge?", respond: "Our Managing Partners are N.V. Pradeep Kishore Vemula and Mahesh Garikina. Are you trying to reach someone specific?"
5.  **Guide the Conversation:** Actively suggest next steps. If a user is vague, help them narrow down their query. For example: "I can help with that. Are you interested in valuations for a personal vehicle or for a business?"
6.  **Lead to Action:** When relevant, guide users to the contact page for a quote. For instance: "For specific pricing details, your best bet is to request a formal quote. I can point you to our contact page if you'd like."`,
        },
      });
      setChat(chatInstance);
    } catch (error) {
      console.error("Failed to initialize Generative AI:", error);
      setMessages(prev => [...prev, {id: 'error-init', text: "Sorry, I can't connect to the AI service right now.", sender: 'bot'}]);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading || !chat) return;

    const userMessage: Message = { id: Date.now().toString(), text: messageText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput(''); // Clear input after sending
    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await chat.sendMessage({ message: messageText });
      const botMessage: Message = { id: Date.now().toString() + '-bot', text: response.text, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { id: Date.now().toString() + '-error', text: 'Sorry, I encountered an error. Please try again.', sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessageRef = useRef(sendMessage);
  useEffect(() => {
    sendMessageRef.current = sendMessage;
  });


  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setIsSpeechSupported(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessageRef.current(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        if (event.error === 'not-allowed') {
          setSpeechError("Microphone access is required. Please allow microphone access in your browser settings to use this feature.");
        } else if (event.error === 'no-speech') {
          setSpeechError("Sorry, I didn't catch that. Please try again.");
        } else {
          setSpeechError("Something went wrong with voice input. Please try again.");
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported by this browser.");
      setIsSpeechSupported(false);
    }
    
    // Updated local storage key to match new branding consistency
    const savedLang = localStorage.getItem('vehga-chat-voice-lang');
    if (savedLang) {
      setCurrentLanguage(savedLang);
    }

    initializeChatSession();
  }, []);
  
  useEffect(() => {
    if (input) {
      setSpeechError(null);
    }
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClearChat = () => {
    initializeChatSession();
    setMessages([initialMessage]);
  };
  
  const handleLangSelect = (langCode: string) => {
    // Updated local storage key
    localStorage.setItem('vehga-chat-voice-lang', langCode);
    setCurrentLanguage(langCode);
    setShowLangPicker(false);
  };

  const handleMicClick = async () => {
    if (!isSpeechSupported || !recognitionRef.current || isListening) return;
    
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setSpeechError("Your browser does not support microphone access.");
        return;
    }

    setSpeechError(null);
    
    try {
      // Request microphone permission. This will prompt the user if not already granted.
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // We don't need to keep the stream active. The SpeechRecognition API handles its own stream.
      // Stopping the tracks is good practice to release the microphone.
      stream.getTracks().forEach(track => track.stop());

      // Permission granted, proceed with recognition
      recognitionRef.current.lang = currentLanguage;
      setInput(''); // Clear any text before listening
      recognitionRef.current.start();
      setIsListening(true);
    } catch (err) {
      console.error("Error requesting microphone permission or starting recognition:", err);
      if (err instanceof DOMException && (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError')) {
          setSpeechError("Microphone access denied. Please allow microphone access in your browser settings.");
      } else {
          setSpeechError("Could not access microphone. Please check your connection and settings.");
      }
      setIsListening(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-heading"
      className={`fixed inset-x-0 bottom-0 top-16 sm:top-auto sm:inset-auto sm:bottom-8 sm:right-8 z-50 w-full max-w-md sm:h-[80vh] sm:max-h-[650px] transform transition-all duration-400 ease-in-out ${
        isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="bg-white shadow-2xl rounded-2xl w-full h-full flex flex-col overflow-hidden"
      >
        {/* Header */}
        <header className="relative flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-2xl flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-orange to-orange-400 flex items-center justify-center text-white">
                <div className="w-6 h-6"><ChatIcon /></div>
              </div>
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white animate-dot-pulse"></span>
            </div>
            <div>
              <h2 id="chat-heading" className="text-lg font-bold text-primary-dark">Vehga AI</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>
          <div className="flex items-center">
            {isSpeechSupported && (
              <button
                onClick={() => setShowLangPicker(true)}
                title="Change voice input language"
                className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors mr-1"
                aria-label="Change voice input language"
              >
                <VoiceOptionsIcon />
              </button>
            )}
            <button
              onClick={handleClearChat}
              title="Clear Chat"
              className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors mr-1"
              aria-label="Clear chat history"
            >
              <RefreshIcon />
            </button>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-gray-800 rounded-full hover:bg-gray-200 transition-colors" aria-label="Close chat">
              <CloseIcon />
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 chatbot-messages-container bg-gray-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`animate-message-fade-in flex items-end gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-orange-400 flex items-center justify-center text-white flex-shrink-0">
                  <div className="w-5 h-5"><ChatIcon /></div>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-accent-orange text-white rounded-br-md'
                    : msg.id === 'initial-message'
                    ? 'bg-white border border-gray-200 text-primary-dark rounded-bl-md'
                    : 'bg-white text-primary-dark rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="animate-message-fade-in flex items-end gap-2.5 justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-orange to-orange-400 flex items-center justify-center text-white flex-shrink-0">
                  <div className="w-5 h-5"><ChatIcon /></div>
              </div>
              <div className="bg-white rounded-2xl rounded-bl-md shadow-sm">
                  <TypingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="relative p-3 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
          {showLangPicker && (
            <div 
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm animate-fadeIn"
              onClick={() => setShowLangPicker(false)}
            >
              <div className="bg-white p-6 rounded-xl shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-bold text-center text-primary-dark">Choose a language to speak</h3>
                <div className="flex justify-center gap-3">
                  {SPEECH_LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLangSelect(lang.code)}
                      className="px-5 py-2.5 font-semibold text-primary-dark bg-gray-200 rounded-lg hover:bg-accent-orange hover:text-white transition-all transform hover:scale-105"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-center text-gray-500 pt-2">We'll remember your choice for next time.</p>
              </div>
            </div>
          )}
          {speechError && <p className="text-xs text-center font-semibold text-red-500 pb-2 animate-fadeIn">{speechError}</p>}
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
             <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask me anything..."}
              className="flex-1 bg-gray-100 border-2 border-transparent rounded-full py-2.5 px-5 text-primary-dark placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-orange/70 focus:border-transparent transition-all"
              disabled={isLoading || isListening}
            />
            {isSpeechSupported && (
              <button
                  type="button"
                  onClick={handleMicClick}
                  title={isListening ? "Stop listening" : "Start voice input"}
                  className={`w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-accent-orange ${
                      isListening ? 'text-white bg-accent-red animate-pulse' : 'text-gray-500 bg-gray-100 hover:text-accent-orange'
                  }`}
                  aria-label={isListening ? "Listening..." : "Start voice input"}
                  disabled={isLoading}
              >
                  <div className="w-5 h-5"><MicrophoneIcon /></div>
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-accent-orange text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-orange-600 transition-all transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-orange"
              aria-label="Send message"
            >
              <div className="w-5 h-5"><SendIcon /></div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;