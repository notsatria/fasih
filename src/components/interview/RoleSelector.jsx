import Card from '../ui/Card.jsx';

export const ROLES = [
  { id: 'Software Engineer', icon: '💻' },
  { id: 'Product Manager', icon: '📊' },
  { id: 'Designer', icon: '🎨' },
  { id: 'Marketing', icon: '📣' },
  { id: 'Data Analyst', icon: '📈' },
  { id: 'General', icon: '👔' },
];

export default function RoleSelector({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {ROLES.map((r) => (
        <Card
          key={r.id}
          variant="postit"
          hover={true}
          onClick={() => onSelect(r.id)}
          className={`
            cursor-pointer flex flex-col items-center justify-center p-4 min-h-[120px] transition-all
            ${selected === r.id ? 'border-marker shadow-[6px_6px_0px_0px_#ff4d4d] -translate-y-1' : 'border-pencil hover:border-pen'}
          `}
        >
          <div className="w-12 h-12 rounded-full border-[2px] border-pencil flex items-center justify-center bg-white text-2xl mb-2">
            {r.icon}
          </div>
          <span className="font-heading text-lg text-pencil text-center">{r.id}</span>
        </Card>
      ))}
    </div>
  );
}
