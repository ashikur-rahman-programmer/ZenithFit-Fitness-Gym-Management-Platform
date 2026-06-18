export default function ViewAttendeesModal({ isOpen, onClose, attendees }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#111111] w-full max-w-md rounded-3xl p-8 border border-white/10">
        <h2 className="text-xl font-bold mb-6">Enrolled Students</h2>
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {attendees?.map((student, i) => (
            <div
              key={i}
              className="p-3 bg-white/5 rounded-xl flex justify-between items-center"
            >
              <span>{student.name}</span>
              <span className="text-xs text-white/50">{student.email}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-8 w-full py-3 rounded-xl bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}
