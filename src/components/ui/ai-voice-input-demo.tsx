// src/components/ui/ai-voice-input-demo.tsx
"use client"; // Zachowaj, jeśli jest potrzebne

import React, { useState, useEffect } from "react"; // Dodano importy React
import { Mic, Loader2, Square } from "lucide-react"; // Dodano ikonę Square dla stanu aktywnego
import { cn } from "@/lib/utils";

// Nowy interfejs propsów - sterowany z zewnątrz
interface AIVoiceInputDemoProps {
  onClick: () => void;        // Funkcja wywoływana przy kliknięciu
  isActive?: boolean;       // Czy połączenie Vapi jest aktywne
  isRecording?: boolean;    // Czy Vapi nagrywa (dla animacji wizualizera)
  isLoading?: boolean;      // Czy Vapi się łączy/rozłącza
  disabled?: boolean;       // Czy przycisk jest wyłączony
  statusText?: string;      // Tekst statusu do wyświetlenia (np. "Ansluter...", "Inspelning...")
  className?: string;
  visualizerBars?: number;  // Zachowujemy dla wizualizera
}

export function AIVoiceInputDemo({
  onClick,
  isActive = false, // Domyślne wartości
  isRecording = false,
  isLoading = false,
  disabled = false,
  statusText = "Klicka för att starta samtal", // Domyślny tekst po szwedzku
  className,
  visualizerBars = 48, // Zachowujemy wizualizer
}: AIVoiceInputDemoProps) {
  // Usunięto wewnętrzne stany: submitted, time, isDemo, isClient, lastTimeRef
  // Usunięto wewnętrzne useEffect dla timera i demo

  const [isClient, setIsClient] = useState(false); // Zachowujemy, aby uniknąć hydration mismatch dla animacji
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Wybierz ikonę na podstawie stanu Vapi
  const getIcon = () => {
    if (isLoading) return <Loader2 className="w-6 h-6 animate-spin" />;
    // Jeśli aktywne, pokaż ikonę kwadratu do zatrzymania
    if (isActive) return <Square className="w-6 h-6 text-white/70" fill="currentColor" />; // Używamy kwadratu
    // Domyślnie ikona mikrofonu
    return <Mic className="w-6 h-6 text-white/70" />;
  };

  return (
    <div className={cn("w-full py-4 flex flex-col items-center gap-2", className)}> {/* Dodano flex-col i gap */}
      {/* Przycisk - teraz sterowany przez zewnętrzne propsy */}
      <button
        className={cn(
          "group w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300", // Zmieniono na bardziej neutralne tło, usunięto warunek submitted
          "bg-white/5 hover:bg-white/10", // Lekkie tło
          isActive && "bg-red-500/20 hover:bg-red-500/30", // Czerwona poświata gdy aktywny
          disabled && "opacity-50 cursor-not-allowed" // Styl dla wyłączonego
        )}
        type="button"
        onClick={onClick}
        disabled={disabled || isLoading}
        aria-label={isLoading ? "Ansluter..." : isActive ? "Avsluta samtal" : "Starta samtal"} // Dynamiczna etykieta
      >
        {getIcon()}
      </button>

      {/* Timer - Usunięty, bo nie jest już relevantny */}
      {/* <span className="font-mono text-sm ...">{formatTime(time)}</span> */}

      {/* Wizualizer - animowany, gdy połączenie jest aktywne LUB gdy nagrywa */}
      <div className="h-4 w-64 flex items-center justify-center gap-0.5">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-0.5 rounded-full transition-all duration-300",
              (isActive || isRecording) // Animuj, gdy połączenie jest aktywne LUB nagrywa
                ? "bg-white/50 animate-pulse" // Styl animacji pulsującej
                : "bg-white/10 h-1" // Styl nieaktywny
            )}
            style={
              (isActive || isRecording) && isClient // Animuj tylko po stronie klienta
                ? {
                    height: `${10 + Math.random() * 60}%`, // Mniejsza wysokość animacji
                    animationDelay: `${i * 0.05}s`,
                    animationDuration: '1.5s' // Wolniejsza animacja
                  }
                : { height: '0.25rem' } // Zapewnij minimalną wysokość w stanie nieaktywnym
            }
          />
        ))}
      </div>

      {/* Tekst Statusu - teraz pobierany z propsów */}
      <p className="h-4 text-xs text-white/70 mt-1"> {/* Dodano mt-1 */}
        {statusText}
      </p>
    </div>
  );
}