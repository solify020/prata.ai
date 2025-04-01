// src/components/ui/ai-voice-input-demo.tsx
"use client"; // Zachowaj, jeśli jest potrzebne

import React, { useState, useEffect } from "react"; // Dodano importy React
import { Mic, Loader2, Square } from "lucide-react"; // Dodano ikonę Square dla stanu aktywnego
import { cn } from "@/lib/utils";
import Recording from './recording.gif'

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
    if (isLoading) return <Loader2 className="w-12 h-12 animate-spin" />;
    // Jeśli aktywne, pokaż ikonę kwadratu do zatrzymania
    if (isActive) return <img src={Recording} className="w-full h-full text-white/70" />; // Używamy kwadratu
    // Domyślnie ikona mikrofonu
    return <Mic className="w-12 h-12 text-white/70" />;
  };

  return (
    <div className={cn("w-full py-4 flex flex-col items-center gap-2", className)}> {/* Dodano flex-col i gap */}
      {/* Przycisk - teraz sterowany przez zewnętrzne propsy */}
      <button
        className={cn(
          "group w-24 h-24 rounded-xl flex items-center justify-center transition-all duration-300", // Zmieniono na bardziej neutralne tło, usunięto warunek submitte
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
      <div className="h-6 w-64 flex items-center justify-center gap-1">
        {[...Array(visualizerBars)].map((_, i) => (
          <div
        key={i}
        className={cn(
          "w-1 rounded-full transition-all duration-500 ease-in-out",
          (isActive || isRecording)
            ? "bg-gradient-to-t from-blue-500 via-purple-500 to-pink-500 animate-bounce"
            : "bg-gradient-to-t from-gray-500 via-gray-400 to-gray-300" // Piękny gradient dla nieaktywnych
        )}
        style={
          (isActive || isRecording) && isClient
            ? {
            height: `${20 + Math.random() * 80}%`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: '1.2s',
          }
            : { height: '0.5rem' }
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