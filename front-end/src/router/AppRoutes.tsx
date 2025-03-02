import React from "react";
import { Routes, Route } from "react-router-dom";
import AlunoPage from "../pages/AlunoPage";
import MatriculaPage from "../pages/MatriculaPage";
import CursoPage from "../pages/CursoPage";
import ListagemFiltrosPage from "../pages/ListagemFiltrosPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/alunos" element={<AlunoPage />} />
      <Route path="/matricula" element={<MatriculaPage />} />
      <Route path="/curso" element={<CursoPage />} />
      <Route path="/listagem" element={<ListagemFiltrosPage />} />
    </Routes>
  );
};

export default AppRoutes;
