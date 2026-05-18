import Card from '../ui/Card.jsx';

export const DIFFICULTIES = [
  { id: 'Screening Call', desc: 'General background and high-level experience.' },
  { id: 'Behavioral', desc: 'Deep dive into past experiences using STAR method.' },
  { id: 'Culture Fit', desc: 'Values, conflict resolution, and working style.' },
];

export default function DifficultySelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {DIFFICULTIES.map((d) => (
        <Card
          key={d.id}
          hover={true}
          onClick={() => onSelect(d.id)}
          className={`
            cursor-pointer flex flex-col p-4 transition-all
            ${selected === d.id ? 'border-pen bg-erased shadow-[6px_6px_0px_0px_#2d5da1] -translate-y-1' : 'border-pencil hover:border-marker'}
          `}
        >
          <span className="font-heading text-xl text-pencil mb-2">{d.id}</span>
          <span className="font-body text-sm text-pencil/70">{d.desc}</span>
        </Card>
      ))}
    </div>
  );
}
