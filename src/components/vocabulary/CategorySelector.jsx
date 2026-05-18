import Card from '../ui/Card.jsx';
import { CATEGORIES } from '../../data/vocabulary.js';

export default function CategorySelector({ selected, onSelect }) {
  const options = ['All Categories', ...CATEGORIES];

  const icons = {
    'All Categories': '🗂️',
    'Meetings': '🤝',
    'Email / Async': '📧',
    'Feedback Culture': '🌱',
    'Remote Work Tools': '🛠️'
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {options.map((cat) => (
        <Card
          key={cat}
          variant="postit"
          hover={true}
          onClick={() => onSelect(cat)}
          className={`
            cursor-pointer flex flex-col items-center justify-center p-4 min-h-[120px] transition-all
            ${selected === cat ? 'border-marker shadow-[6px_6px_0px_0px_#ff4d4d] -translate-y-1' : 'border-pencil hover:border-pen'}
          `}
        >
          <div className="text-3xl mb-2">{icons[cat] || '📌'}</div>
          <span className="font-heading text-lg text-pencil text-center">{cat}</span>
        </Card>
      ))}
    </div>
  );
}
