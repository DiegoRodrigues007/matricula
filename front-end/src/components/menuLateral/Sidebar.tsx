import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaClipboardList,
  FaBook,
  FaUser,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {!isOpen && (
        <button className="botao-toggle-lateral" onClick={toggleSidebar}>
          <FaBars />
        </button>
      )}

      {isOpen && (
        <div className="fundo-overlay" onClick={toggleSidebar}></div>
      )}

      <div className={`container-lateral ${isOpen ? "aberto" : ""}`}>
        <div className="cabecalho-lateral">
          <h2>Menu</h2>
          <button className="botao-fechar" onClick={toggleSidebar}>
            <FaTimes />
          </button>
        </div>

        <nav className="menu-lateral">
          <ul>
            <li>
              <Link to="/matricula" onClick={handleLinkClick}>
                <FaClipboardList className="icone-menu" />
                Matrícula
              </Link>
            </li>
            <li>
              <Link to="/curso" onClick={handleLinkClick}>
                <FaBook className="icone-menu" />
                Curso
              </Link>
            </li>
            <li>
              <Link to="/alunos" onClick={handleLinkClick}>
                <FaUser className="icone-menu" />
                Alunos
              </Link>
            </li>
            <li>
              <Link to="/listagem" onClick={handleLinkClick}>
                <FaUser className="icone-menu" />
                Listagem e Filtros
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
