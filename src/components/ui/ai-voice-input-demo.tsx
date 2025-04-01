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
    <div className={cn("w-full py-6 flex flex-col items-center gap-4", className)}> {/* Zwiększono odstępy dla lepszej estetyki */}
      {/* Przycisk - teraz bardziej elegancki */}
      <button
      className={cn(
        "group relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg", // Dodano cień dla przycisku
        "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:opacity-90", // Gradientowe tło
        isActive && "from-red-500 via-red-600 to-red-700 hover:opacity-90", // Czerwony gradient gdy aktywny
        disabled && "opacity-50 cursor-not-allowed" // Styl dla wyłączonego
      )}
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      aria-label={isLoading ? "Ansluter..." : isActive ? "Avsluta samtal" : "Starta samtal"} // Dynamiczna etykieta
      >
      <div
        className={cn(
        "absolute w-24 h-24 rounded-full border-4 border-white/30",
        "transition-transform",
        isActive ? "animate-spin-fast" : "animate-spin-slow"
        )}
      />
      {getIcon()}
      </button>

      {/* Wizualizer - bardziej dynamiczny */}
      <div className="h-6 w-72 flex items-center justify-center gap-1"> {/* Zwiększono wysokość i szerokość */}
      {[...Array(visualizerBars)].map((_, i) => (
        <div
        key={i}
        className={cn(
          "w-1 rounded-full transition-all duration-300",
          (isActive || isRecording) // Animuj, gdy połączenie jest aktywne LUB nagrywa
          ? "bg-gradient-to-t from-blue-400 via-purple-400 to-pink-400 animate-pulse" // Gradientowy styl animacji
          : "bg-white/10 h-2" // Styl nieaktywny
        )}
        style={
          (isActive || isRecording) && isClient // Animuj tylko po stronie klienta
          ? {
            height: `${20 + Math.random() * 80}%`, // Większa wysokość animacji
            animationDelay: `${i * 0.03}s`,
            animationDuration: '1.2s' // Szybsza animacja
            }
          : { height: '0.5rem' } // Minimalna wysokość w stanie nieaktywnym
        }
        />
      ))}
      </div>

      {/* Tekst Statusu - bardziej widoczny */}
      <p className="h-6 text-sm text-white/80 mt-2 font-medium text-center"> {/* Zwiększono rozmiar tekstu i dodano wyrównanie */}
      {statusText}
      </p>
    </div>
  );
}