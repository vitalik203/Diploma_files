import React from "react";
import "./Main.scss";

//Multylanguage
import ua from "../translations/ua.json";
import en from "../translations/en.json";

interface MyComponentProps {
  isOpen: any;
  onClose: any;
  title: string;
  children: any;
  language: string;
}

const Modal_window: React.FC<MyComponentProps> = ({
  isOpen,
  onClose,
  title,
  children,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose} className="modal-close-button">
            ✕
          </button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button onClick={onClose} className="modal-button">
            {language === "en"
              ? en.main.login.modalWindow.close
              : ua.main.login.modalWindow.close}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal_window;
