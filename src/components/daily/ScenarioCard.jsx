import Card from '../ui/Card.jsx';
import Badge from '../ui/Badge.jsx';

export default function ScenarioCard({ scenario, timeLimit, vocabHints }) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const todayStr = new Date().toLocaleDateString('en-US', options);

  return (
    <Card decoration="tape" className="relative mt-8">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="category">Today's Challenge</Badge>
        <Badge variant="warning">{timeLimit} Seconds</Badge>
      </div>

      <p className="font-body text-pencil/70 text-sm mb-2">{todayStr}</p>
      
      <p className="font-heading text-3xl text-pencil leading-relaxed mb-6">
        "{scenario}"
      </p>

      <div className="border-t-2 border-dashed border-pencil/30 pt-4">
        <p className="font-body text-pencil/70 text-sm mb-3">Recommended Vocabulary:</p>
        <div className="flex flex-wrap gap-2">
          {vocabHints.map(hint => (
            <Badge key={hint} variant="neutral" className="bg-white">{hint}</Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
