export const Label = ({text}: { text: string }) => {
    return (
      <div className="px-4 text-center py-2 bg-neutral-700 text-white rounded text-purple-400 border-2 border-purple-400">
        {text}
      </div>
    );
  };