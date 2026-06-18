export default function UpdateClassModal({ isOpen, onClose, classData }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#111111] w-full max-w-lg rounded-3xl p-8 border border-white/10">
        <h2 className="text-xl font-bold mb-6">
          Update Class: {classData?.name}
        </h2>
        <form className="space-y-4">
          <input
            defaultValue={classData?.name}
            className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-white"
          />
          <input
            defaultValue={classData?.price}
            type="number"
            className="w-full bg-white/5 p-3 rounded-xl border border-white/10 text-white"
          />
          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-white/10"
            >
              Cancel
            </button>
            <button className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
