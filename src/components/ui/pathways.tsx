import React, { useState } from 'react';

// Definicja typu dla danych punktu (bez zmian)
interface PathwayPoint {
  id: number;
  color: 'pink' | 'purple' | 'orange';
  text: string;
  style: React.CSSProperties; // Style do pozycjonowania (top, left, ew. height)
}

// Dane dla punktów - poprawione duplikaty 'top' (bez zmian)
const pointsData: PathwayPoint[] = [
  // Linia pozioma
  { id: 1, color: 'pink', text: 'Losowy tekst dla punktu 1 (różowy)', style: { top: '48%', left: '15%' } },
  { id: 2, color: 'purple', text: 'Losowy tekst dla punktu 2 (fioletowy)', style: { top: '48%', left: '35%' } },
  { id: 3, color: 'purple', text: 'Losowy tekst dla punktu 3 (fioletowy)', style: { left: '45%', height: '8%', top: '46%' } }, // Wyższy punkt
  { id: 4, color: 'purple', text: 'Losowy tekst dla punktu 4 (fioletowy)', style: { top: '48%', left: '65%' } },
  { id: 5, color: 'purple', text: 'Losowy tekst dla punktu 5 (fioletowy)', style: { left: '80%', height: '8%', top: '46%' } }, // Wyższy punkt

  // Górna gałąź
  { id: 6, color: 'orange', text: 'Losowy tekst dla punktu 6 (pomarańczowy)', style: { top: '28%', left: '30%' } },
  { id: 7, color: 'orange', text: 'Losowy tekst dla punktu 7 (pomarańczowy)', style: { left: '45%', height: '8%', top: '16%' } }, // Wyższy punkt
  { id: 8, color: 'orange', text: 'Losowy tekst dla punktu 8 (pomarańczowy)', style: { top: '18%', left: '60%' } },
  { id: 9, color: 'orange', text: 'Losowy tekst dla punktu 9 (pomarańczowy)', style: { top: '18%', left: '75%' } },

  // Dolna gałąź
  { id: 10, color: 'orange', text: 'Losowy tekst dla punktu 10 (pomarańczowy)', style: { top: '68%', left: '30%' } },
  { id: 11, color: 'orange', text: 'Losowy tekst dla punktu 11 (pomarańczowy)', style: { left: '45%', height: '8%', top: '76%' } }, // Wyższy punkt
  { id: 12, color: 'orange', text: 'Losowy tekst dla punktu 12 (pomarańczowy)', style: { top: '78%', left: '60%' } },
  { id: 13, color: 'orange', text: 'Losowy tekst dla punktu 13 (pomarańczowy)', style: { top: '78%', left: '75%' } },
];

// Mapowanie kolorów na klasy Tailwind (używamy wartości arbitralnych dla dokładności)
const colorClasses: Record<'pink' | 'purple' | 'orange', string> = {
  pink: 'bg-[#E54F6D]',
  purple: 'bg-[#A050A0]',
  orange: 'bg-[#F8A055]',
};

const Pathways: React.FC = () => {
  const [tooltip, setTooltip] = useState<{ visible: boolean; content: string; x: number; y: number } | null>(null);

  // Funkcje handleMouseEnter i handleMouseLeave pozostają bez zmian
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, text: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      content: text,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY - 10, // Przesunięcie w górę
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    // Kontener główny - używamy klas Tailwind + wartości arbitralnych dla wymiarów
    // Kolor tła ustawiony na sztywno jak w CSS, dopasuj ew. do zmiennych theme
    <div className="relative w-[600px] h-[300px] bg-[#f8f8f4] overflow-hidden mx-auto my-5 border border-gray-200 rounded">
      {/* --- Ścieżki (segmenty) --- */}
      {/* Używamy klas Tailwind + inline style dla pozycjonowania i wymiarów */}
      {/* Kolor tła dopasowany do ciemnego ze zdjęcia - np. gray-900 */}
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '45%', left: '10%', width: '80%', height: '10%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '25%', left: '43%', width: '4%', height: '20%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '55%', left: '43%', width: '4%', height: '20%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '10%', left: '43%', width: '4%', height: '15%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '85%', left: '43%', width: '4%', height: '15%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '45%', left: '78%', width: '4%', height: '20%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '35%', left: '78%', width: '4%', height: '10%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '15%', left: '45%', width: '35%', height: '10%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '25%', left: '28%', width: '15%', height: '10%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '75%', left: '45%', width: '35%', height: '10%' }}></div>
      <div className="absolute bg-gray-900 rounded-sm" style={{ top: '65%', left: '28%', width: '15%', height: '10%' }}></div>

      {/* --- Punkty --- */}
      {pointsData.map((point) => (
        <div
          key={point.id}
          // Klasy Tailwind dla stylu, kształtu, interakcji + dynamiczna klasa koloru
          className={`absolute rounded-full cursor-pointer z-10 transition-transform duration-200 ease-in-out hover:scale-110 ${colorClasses[point.color]}`}
          // Pozycjonowanie z 'point.style' + procentowe wymiary z poprzedniej wersji CSS
          style={{
             ...point.style, // Rozpakowuje top, left, ew. height
             width: '2%',   // Dodajemy procentową szerokość
             height: point.style.height || '6%', // Używamy height z danych lub domyślne 6%
          }}
          onMouseEnter={(e) => handleMouseEnter(e, point.text)}
          onMouseLeave={handleMouseLeave}
          aria-label={`Punkt ${point.id}`}
        ></div>
      ))}

      {/* --- Tooltip --- */}
      {tooltip?.visible && (
        <div
          // Klasy Tailwind dla wyglądu tooltipa
          className="absolute bg-black/80 text-white px-2.5 py-1 rounded text-sm whitespace-nowrap z-50 pointer-events-none"
          // Pozycjonowanie i transformacja ustawiane dynamicznie przez JS
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%)',
          }}
          role="tooltip"
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default Pathways;