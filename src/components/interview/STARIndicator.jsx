import Badge from '../ui/Badge.jsx';

const STAR_LETTERS = [
  { id: 'situation', label: 'S', desc: 'Situation' },
  { id: 'task', label: 'T', desc: 'Task' },
  { id: 'action', label: 'A', desc: 'Action' },
  { id: 'result', label: 'R', desc: 'Result' },
];

export default function STARIndicator({ starResult }) {
  // starResult is { situation: 'detected'|'partial'|'missing', ... }
  // If null, show all neutral
  
  const getVariant = (status) => {
    if (status === 'detected') return 'star-detected'; // Green
    if (status === 'partial') return 'star-partial';   // Amber
    if (status === 'missing') return 'star-missing';   // Grey/Erased
    return 'neutral';
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="font-heading text-xl text-pencil mb-2">STAR Method Checklist</h3>
      <div className="flex gap-2">
        {STAR_LETTERS.map(star => (
          <div key={star.id} className="flex flex-col items-center group cursor-help relative">
            <Badge 
              variant={starResult ? getVariant(starResult[star.id]) : 'neutral'}
              size="lg"
              className="w-10 h-10 text-xl font-heading flex items-center justify-center"
            >
              {star.label}
            </Badge>
            <span className="font-body text-xs text-pencil/60 mt-1">{star.desc}</span>
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-32 p-2 bg-paper border-2 border-pencil wobbly-sm text-center text-sm font-body z-10 shadow-hard-sm">
              {starResult ? `Status: ${starResult[star.id]}` : `Use to explain ${star.desc}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
