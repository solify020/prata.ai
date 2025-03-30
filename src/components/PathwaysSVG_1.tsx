import React, { useState } from 'react';

// Typ dla stanu tooltipa
interface TooltipState {
  visible: boolean;
  content: string;
  x: number;
  y: number;
}

// Typ dla danych kwadratu
interface SvgSquare {
  id: number | string;
  x: number;
  y: number;
  size: number;
  color: string;
  text: string;
}

// --- VIEWBOX: 0 0 1000 500 ---
// --- KOREKTA: WIĘKSZE KOŁA, PEŁNA LINIA GŁÓWNA, WIĘKSZY ODSTĘP ---

const pathThickness = 50;
const squareSize = 50;
const innerCircleRadius = 12; // ZMIANA: Powiększony promień wewnętrznego koła
const pathColor = "#222";
const innerCircleColor = "#000";
const spacingShiftX = 50; // Dodatkowy odstęp dla prawej strony

// Dane dla kwadratów: Zaktualizowano x dla kwadratów 4 i 5
const squaresData: SvgSquare[] = [
  // Główna linia pozioma (y=225)
  { id: 1, x: 150 - squareSize / 2, y: 225, size: squareSize, color: '#E54F6D', text: 'Info Kwadrat 1' },
  { id: 2, x: 450 - squareSize / 2, y: 225, size: squareSize, color: '#A050A0', text: 'Info Kwadrat 2' },
  { id: 'new1', x: 570 - squareSize / 2, y: 225, size: squareSize, color: '#A050A0', text: 'Info Nowy Kwadrat 1' },
  // ZMIANA: Przesunięcie kwadratu 4 w prawo
  { id: 4, x: (690 - squareSize / 2) + spacingShiftX, y: 225, size: squareSize, color: '#A050A0', text: 'Info Kwadrat 4' },
  // ZMIANA: Przesunięcie kwadratu 5 w prawo
  { id: 5, x: (850 - squareSize / 2) + spacingShiftX, y: 225, size: squareSize, color: '#A050A0', text: 'Info Kwadrat 5' },

  // Górna gałąź (y=100) - Bez zmian pozycji
  { id: 6, x: 490 - squareSize / 2, y: 100, size: squareSize, color: '#F8A055', text: 'Info Kwadrat 6' },
  { id: 8, x: 685 - squareSize / 2, y: 100, size: squareSize, color: '#F8A055', text: 'Info Kwadrat 8' },
  { id: 9, x: 755 - squareSize / 2, y: 100, size: squareSize, color: '#F8A055', text: 'Info Kwadrat 9' },

  // Dolna gałąź (y=350) - Bez zmian pozycji
  { id: 10, x: 490 - squareSize / 2, y: 350, size: squareSize, color: '#F8A055', text: 'Info Kwadrat 10' },
  { id: 12, x: 685 - squareSize / 2, y: 350, size: squareSize, color: '#F8A055', text: 'Info Kwadrat 12' },
  { id: 13, x: 755 - squareSize / 2, y: 350, size: squareSize, color: '#F8A055', text: 'Info Kwadrat 13' },
];


// Definicje segmentów ścieżek (rect) - Zmiany w głównej linii i prawym końcu
const pathSegments = [
  // --- Lewa Struktura (Odbita) - Bez zmian ---
  { x: 325, y: 150, width: pathThickness, height: 75 },
  { x: 325, y: 275, width: pathThickness, height: 75 },
  { x: 375, y: 100, width: 230, height: pathThickness },
  { x: 375, y: 350, width: 230, height: pathThickness },
  { x: 605, y: 50, width: pathThickness, height: 50 },
  { x: 605, y: 400, width: pathThickness, height: 50 },

  // --- Główna Linia i Prawa Struktura ---
  // Główna pozioma (y=225 -> 275) - ZMIANA: Pełna szerokość (0-1000) i dostosowane segmenty
  { x: 0, y: 225, width: 325, height: pathThickness },    // Od startu (x=0) do lewego V-Conn
  { x: 375, y: 225, width: 500, height: pathThickness },  // Między lewym V-Conn a przesuniętym prawym V-End (x=875)
  { x: 925, y: 225, width: 75, height: pathThickness },   // Od końca przesuniętego V-End do końca SVG (x=1000)

  // Prawe poziome gałęzie (pozostają, ale nie są połączone) - Bez zmian
  { x: 595, y: 100, width: 180, height: pathThickness }, // H-Góra
  { x: 595, y: 350, width: 180, height: pathThickness }, // H-Dół

  // ZMIANA: Prawy skrajny V-End (dla punktu 5) przesunięty w prawo
  { x: 825 + spacingShiftX, y: 175, width: pathThickness, height: 45 },
  { x: 825 + spacingShiftX, y: 280, width: pathThickness, height: 45 },
];


// --- Komponent React ---
const PathwaysSVG: React.FC = () => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Handler dla grupy (kwadrat + koło)
  const handleMouseEnter = (event: React.MouseEvent<SVGElement>, square: SvgSquare) => {
    const rect = event.currentTarget.getBoundingClientRect();
    console.log("aoiudshioahoishdfioa");
    
    setTooltip({
      visible: true,
      content: square.text,
      x: rect.left + window.scrollX + rect.width / 2,
      y: rect.top + window.scrollY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    // Kontener
    <div className="w-full max-w-5xl mx-auto my-12 px-2 sm:px-4">
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        aria-labelledby="pathwaysTitle"
        role="graphics-document"
      >
        <title id="pathwaysTitle">Diagram ścieżek - finalne poprawki</title>
        {/* Grupa dla ścieżek */}
        <g fill={pathColor}>
            {pathSegments.map((seg, index) => (
            <rect
                key={`path-${index}`}
                x={seg.x}
                y={seg.y}
                width={seg.width}
                height={seg.height}
            />
            ))}
        </g>

        {/* Grupa dla KWADRATÓW z wewnętrznymi KOŁAMI */}
        <g>
            {squaresData.map((square) => {
              const circleCx = square.x + square.size / 2;
              const circleCy = square.y + square.size / 2;

              return (
                <g
                  key={square.id}
                  className="cursor-pointer transition-opacity duration-150 ease-in-out hover:opacity-80"
                  onMouseEnter={(e) => handleMouseEnter(e, square)}
                  onMouseLeave={handleMouseLeave}
                  aria-label={square.text}
                >
                  {/* Kwadrat (tło kolorowe) */}
                  <rect
                    x={square.x}
                    y={square.y}
                    width={square.size}
                    height={square.size}
                    fill={square.color}
                  />
                  {/* Wewnętrzne czarne koło */}
                  <circle
                    cx={circleCx}
                    cy={circleCy}
                    r={innerCircleRadius} // ZMIANA: Użycie powiększonego promienia
                    fill={innerCircleColor}
                  />
                </g>
              );
             })}
        </g>
      </svg>

      {/* Tooltip HTML (bez zmian) */}
      {tooltip?.visible && (
        <div
          className="fixed bg-black/80 text-white px-3 py-1.5 rounded shadow-lg text-xs whitespace-nowrap z-[9999] pointer-events-none"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: 'translateX(-50%) translateY(-110%)',
          }}
          role="tooltip"
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default PathwaysSVG;