import React from "react";

interface CustomButtonProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  open,
  onClose,
  children,
}) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-pretendard"
      onClick={onClose}
    >
      <div
        className="bg-[#FCFCEE] rounded-[24px] p-6 w-[340px] max-w-[90vw] shadow-xl border border-gray-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default CustomButton;
