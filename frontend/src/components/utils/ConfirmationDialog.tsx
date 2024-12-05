import React from 'react';

interface ConfirmationDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    message,
    onConfirm,
    onCancel,
  }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-slate-800 p-6 rounded-md shadow-lg max-w-sm">
          <p className="text-center text-lg">{message}</p>
          <div className="mt-4 flex justify-between">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={onCancel}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationDialog;