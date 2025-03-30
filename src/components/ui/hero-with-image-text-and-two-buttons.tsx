import React, { useState, useEffect, useRef, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialAvatarsStrip } from "@/components/ui/testimonial-avatars-strip";
import { AIVoiceInputDemo } from "@/components/ui/ai-voice-input-demo"; // Upewnij się, że ścieżka jest poprawna
import { useIsMobile } from "@/hooks/use-mobile"; // Upewnij się, że ścieżka jest poprawna
import { cn } from "@/lib/utils"; // Upewnij się, że ścieżka jest poprawna

// --- POPRAWIONE KLUCZE VAPI ---
const VAPI_PUBLIC_KEY = 'dabe64ae-2979-4850-b378-8bb7c696b2e5';
const VAPI_ASSISTANT_ID = '5d7d0477-c6a0-407e-8f31-6ba810a90d93';
// -----------------------------

// Typ dla wiadomości w czacie (bez zmian)
interface ChatMessage {
  id: string;
  sender: 'ai';
  text: string;
  isFinal: boolean;
}

// Usunięto WordStreamState i WORD_ANIMATION_INTERVAL_MS

function Hero() {
  const isMobile = useIsMobile();
  const vapiRef = useRef<Vapi | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState('idle');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const chatContentRef = useRef<HTMLDivElement>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);

  // Usunięto stan wordStream i wordStreamRef

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }
    }, 50); // Krótsze opóźnienie może być lepsze
  }, []);

  // --- Logika Inicjalizacji Vapi ---
  useEffect(() => {
    if (vapiRef.current) return;

    console.log('[VAPI] Initializing...');
    const vapiInstance = new Vapi(VAPI_PUBLIC_KEY);
    vapiRef.current = vapiInstance;
    setIsReady(true);

    // --- Handlery Zdarzeń Vapi ---
    vapiInstance.on('call-start', () => {
      console.log('[VAPI] Event: call-start');
      setIsActive(true); setIsLoading(false); setCallStatus('active'); setChatMessages([]); currentAssistantMessageIdRef.current = null;
    });
    vapiInstance.on('call-end', () => {
      console.log('[VAPI] Event: call-end');
      setIsActive(false); setIsRecording(false); setIsLoading(false); setCallStatus('ended'); currentAssistantMessageIdRef.current = null;
      setTimeout(() => setCallStatus('idle'), 1500);
    });
    vapiInstance.on('speech-start', () => { console.log('[VAPI] Event: speech-start'); setIsRecording(true); });
    vapiInstance.on('speech-end', () => { console.log('[VAPI] Event: speech-end'); setIsRecording(false); });

    vapiInstance.on('message', (message) => {
      // Bardzo szczegółowe logowanie KAŻDEJ wiadomości od Vapi
      console.log('[VAPI] Event: message', JSON.stringify(message, null, 2));

      // --- Obsługa Transkrypcji Asystenta (Uproszczona) ---
      if (message.type === 'transcript' && message.role === 'assistant') {
        const transcriptText = message.transcript?.trim() ?? '';
        const isFinalTranscript = message.transcriptType === 'final';

        // Logowanie specyficzne dla transkrypcji
        console.log(`[VAPI Transcript] Final: ${isFinalTranscript}, Length: ${transcriptText.length}, Text: "${transcriptText}"`);

        // Ignoruj całkowicie puste transkrypcje, chyba że są finalne (co może oznaczać koniec zdania)
        if (!transcriptText && !isFinalTranscript) {
            console.log('[VAPI Transcript] Ignoring empty non-final transcript.');
            return;
        }

        // Logika aktualizacji stanu chatMessages
        setChatMessages(prevMessages => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          let updatedMessages = [...prevMessages];
          let messageIdToUpdate: string | null = null;

          // Sprawdź, czy ostatnia wiadomość AI jest tą, którą powinniśmy aktualizować
          if (lastMessage?.sender === 'ai' && (!lastMessage.isFinal || lastMessage.id === currentAssistantMessageIdRef.current)) {
             messageIdToUpdate = lastMessage.id;
             // Aktualizuj istniejącą wiadomość
             updatedMessages = prevMessages.map(msg =>
               msg.id === messageIdToUpdate
                 ? { ...msg, text: transcriptText, isFinal: isFinalTranscript }
                 : msg
             );
             console.log(`[Chat Update] Updating message ID: ${messageIdToUpdate}`);
             if (!isFinalTranscript) {
                 currentAssistantMessageIdRef.current = messageIdToUpdate; // Nadal śledź, jeśli nie finalna
             } else if (currentAssistantMessageIdRef.current === messageIdToUpdate) {
                 currentAssistantMessageIdRef.current = null; // Przestań śledzić finalną
             }
          } else {
             // Stwórz nową wiadomość, tylko jeśli tekst nie jest pusty LUB jest to finalna (pusta) transkrypcja
             if (transcriptText || isFinalTranscript) {
                 messageIdToUpdate = `ai-${Date.now()}`;
                 const newMessage: ChatMessage = {
                   id: messageIdToUpdate,
                   sender: 'ai',
                   text: transcriptText,
                   isFinal: isFinalTranscript
                 };
                 updatedMessages.push(newMessage);
                 console.log(`[Chat Update] Adding new message ID: ${messageIdToUpdate}`);
                 if (!isFinalTranscript) {
                    currentAssistantMessageIdRef.current = messageIdToUpdate; // Śledź nową, jeśli nie finalna
                 } else {
                    currentAssistantMessageIdRef.current = null; // Nie ma potrzeby śledzić finalnej od razu
                 }
             } else {
                 console.log('[Chat Update] Ignoring creation of empty non-final message.');
                 return prevMessages; // Nie dodawaj pustej nie-finalnej wiadomości
             }
          }

          // Zawsze przewijaj po aktualizacji (jeśli były zmiany)
          if (messageIdToUpdate) {
              // Opóźnienie scrollToBottom może nie być już potrzebne lub może być krótsze
              setTimeout(scrollToBottom, 0);
          }

          return updatedMessages;
        });
      }
       // Można dodać obsługę innych typów wiadomości, np. 'assistant-message'
      else if (message.type === 'assistant-message') {
           console.warn('[VAPI] Received assistant-message (currently unhandled):', message);
      }
    });

    vapiInstance.on('error', (error) => {
      console.error('[VAPI] Event: error', error);
      setIsLoading(false); setIsActive(false); setCallStatus('error'); currentAssistantMessageIdRef.current = null;
    });

    // Cleanup
    return () => {
      console.log('[VAPI] Cleanup: Component unmounting...');
      const currentVapiInstance = vapiRef.current;
      const wasActive = isActive; // Bezpieczniej jest odczytać stan przed czyszczeniem
      if (currentVapiInstance && wasActive) {
        console.log('[VAPI] Cleanup: Stopping active call...');
        currentVapiInstance.stop();
      }
      vapiRef.current = null;
      setIsReady(false);
      currentAssistantMessageIdRef.current = null;
      console.log('[VAPI] Cleanup finished.');
    };
  // Tylko `scrollToBottom` jako zależność, aby uniknąć re-inicjalizacji Vapi
  }, [scrollToBottom]);

  // Usunięto useEffect dla animacji wordStream

  // Handler Kliknięcia Mikrofonu (bez zmian w logice, dodano logi)
  const handleMicClick = () => {
    if (!vapiRef.current || !isReady) {
        console.warn('[MIC CLICK] Ignored: Vapi not ready or instance missing.', { isReady, hasVapi: !!vapiRef.current });
        return;
    }
    // Dodatkowe zabezpieczenie przed klikaniem podczas ładowania/kończenia
    if (isLoading || callStatus === 'connecting' || callStatus === 'ending') {
        console.warn('[MIC CLICK] Ignored: Call in progress.', { isLoading, callStatus });
        return;
    }

    if (isActive) {
      console.log('[MIC CLICK] Stopping call...');
      setIsLoading(true); setCallStatus('ending');
      vapiRef.current.stop();
    } else {
      console.log('[MIC CLICK] Starting call...');
      setIsLoading(true); setCallStatus('connecting');
      vapiRef.current.start(VAPI_ASSISTANT_ID)
        .then(() => {
            console.log('[VAPI Start] Call initiated successfully (async).');
        })
        .catch(error => {
            console.error("[VAPI Start] Error:", error);
            setIsLoading(false); setCallStatus('error');
            // Reset stanu wiadomości może być potrzebny
            // setChatMessages([]);
            // currentAssistantMessageIdRef.current = null;
        });
    }
  };

  // Tekst statusu po szwedzku (bez zmian)
  const getStatusText = (): string => {
     if (isLoading && callStatus === 'connecting') return "Ansluter...";
     if (isLoading && callStatus === 'ending') return "Avslutar...";
     if (isActive) return isRecording ? "Inspelning..." : "Ansluten";
     if (callStatus === 'error') return "Anslutningsfel";
     if (callStatus === 'ended') return "Samtalet avslutat";
     return "Klicka för att starta samtal";
  };

  // --- JSX (usunięto odniesienia do wordStream) ---
  return (
    <div className="w-full py-20 lg:py-40 overflow-hidden">
      <div className="mobile-container mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center lg:grid-cols-2">

          {/* Lewa Kolumna (bez zmian) */}
          <div className="flex flex-col items-center">
              {/* ... Twoja lewa kolumna ... */}
               <div className="flex gap-4 flex-col max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl lg:text-7xl tracking-tighter text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 pb-2">
                  AI-lösningar för svenska företag
                </h1>
                <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md mx-auto text-center mt-2">
                  Vi är experter på AI-drivna samtalsagenter på svenska. Vår teknik effektiviserar
                  försäljning, kundtjänst och rekrytering med upp till <span className="font-bold text-white">70% kostnadsbesparing</span>.
                </p>
              </div>
              <div className={`flex ${isMobile ? 'flex-col w-full max-w-xs mx-auto' : 'flex-row'} gap-4 mt-6 justify-center`}>
                <Button size="lg" className="gap-4 hover:scale-105 transition-all duration-300" variant="outline">
                  Boka Demo <PhoneCall className="w-4 h-4" />
                </Button>
                <Button size="lg" className="gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300">
                  Kom igång nu <MoveRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="mt-8 w-full max-w-md">
                <TestimonialAvatarsStrip />
              </div>
          </div>

          {/* Prawa Kolumna */}
          <div className="bg-background border-2 border-muted rounded-lg aspect-square flex flex-col overflow-hidden p-4 max-w-full relative">
             {/* Czat */}
             <div
               ref={chatContentRef}
               className="flex-grow overflow-y-auto flex flex-col gap-2 mb-24 scroll-smooth"
             >
               {chatMessages.length === 0 && !isActive && !isLoading && callStatus !== 'ended' && callStatus !== 'error' && (
                 <p className="text-muted-foreground text-center my-auto text-sm px-4">
                    Starta en konversation med vår röstassistent genom att klicka på mikrofonen nedan.
                 </p>
               )}
               {chatMessages.map((msg) => (
                 <div
                   key={msg.id}
                   className={cn(
                       "p-2 px-3 rounded-lg max-w-[85%] break-words text-sm shadow-sm self-start bg-secondary text-secondary-foreground transition-opacity duration-300",
                       // Przygaś lekko wiadomości, które nie są jeszcze finalne
                       !msg.isFinal ? "opacity-80" : "opacity-100"
                   )}
                 >
                   {msg.text}
                   {/* Prosty wskaźnik dla nie-finalnych wiadomości */}
                   {!msg.isFinal && <span className="inline-block w-1 h-1 bg-current rounded-full ml-1 opacity-50 align-middle" />}
                 </div>
               ))}
             </div>

             {/* Kontener Mikrofonu (bez zmian) */}
             <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4 pt-2 bg-gradient-to-t from-background via-background to-transparent">
               <AIVoiceInputDemo
                 onClick={handleMicClick}
                 isActive={isActive}
                 isRecording={isRecording}
                 isLoading={isLoading}
                 disabled={!isReady || isLoading || callStatus === 'connecting' || callStatus === 'ending'}
                 statusText={getStatusText()}
               />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };