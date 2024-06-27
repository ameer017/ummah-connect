import React from 'react';
import ReactDOM from 'react-dom';
import useRedirectLoggedOutUser from '../UseRedirect/UseRedirectLoggedOutUser';

const Modal = ({ onClose, children }) => {
  useRedirectLoggedOutUser("/login")
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <button onClick={onClose} className="text-right text-xl font-bold mb-4">
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
