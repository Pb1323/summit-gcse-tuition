type QuestionNavigatorProps = {
  ids: string[];
  current: number;
  answers: Record<string, string>;
  flagged: Set<string>;
  onGo: (index: number) => void;
};

export function QuestionNavigator({ ids, current, answers, flagged, onGo }: QuestionNavigatorProps) {
  return (
    <div className="grid grid-cols-6 gap-2">
      {ids.map((id, index) => {
        const answered = Boolean(answers[id]?.trim());
        const isFlagged = flagged.has(id);
        return (
          <button
            key={id}
            onClick={() => onGo(index)}
            className={`rounded-xl p-2 text-sm font-bold ${
              current === index
                ? 'bg-royal text-white'
                : answered
                  ? 'bg-green-100 text-green-800'
                  : isFlagged
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-mist'
            }`}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
