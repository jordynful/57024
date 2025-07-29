'use client';
// Dialogue window component
export function Dialogue({ dialogue, setDialogue, type }) {
  if (!dialogue.open) return null;

  if (type === 'info') {
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

 if (type === 'proximity') {
    return (
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-sm p-4 rounded-md shadow-md max-w-sm text-center">
        <p className="text-base text-gray-800">{dialogue.content}</p>
        <p className="text-sm text-gray-600 mt-2 italic">Press F to interact</p>
      </div>
    );
  }

  return null;
}
