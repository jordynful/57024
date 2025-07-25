'use client';
// Dialogue window component
export function Dialogue({ dialogue, setDialogue }) {
  if (!dialogue.open) return null;
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-md">
      <p className="text-lg">{dialogue.content}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setDialogue({ open: false, content: '' })}
      >
        Close
      </button>
    </div>
  );
}
