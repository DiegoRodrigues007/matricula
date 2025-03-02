import React, { useState } from "react";
import "./Alert.css";

export interface AlertProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type = "info", onClose }) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  const tipoAlerta =
    type === "success" ? "sucesso" : type === "error" ? "erro" : type === "warning" ? "aviso" : "info";

  return (
    <div className={`alerta alerta-${tipoAlerta}`}>
      <span className="mensagem-alerta">{message}</span>
      <button className="botao-fechar" onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
