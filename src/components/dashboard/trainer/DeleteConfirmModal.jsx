export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="bg-[#111111] w-full max-w-sm rounded-3xl p-8 text-center border border-white/10">
        <h2 className="text-xl font-bold mb-2">Are you sure?</h2>
        <p className="text-white/50 mb-8 text-sm">
          This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
