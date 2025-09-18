'use client';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div
        className="w-screen h-screen bg-white flex flex-col items-center justify-center relative"
        style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '4px' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-8 text-3xl font-bold text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          &times;
        </button>
        <div className="w-full h-full flex flex-col items-center justify-center px-8">{children}</div>
      </div>
    </div>
  );
}
