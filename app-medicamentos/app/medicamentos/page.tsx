"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import CardMedicamentos from "../components/medicamentos/card-medicamentos";
import { format } from 'date-fns';

export default function Medicamentos() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/medicamentos")
      .then((res) => res.json())
      .then((data) => mostrarRegistros(data))
      .catch((err) => console.error("Error al cargar medicamentos:", err));
  }, []);
  const mostrarRegistros = (data: any) => {
    console.log(data);
    setData(
      data.map((e: any) => {
        return {
          ...e,
          fecha_registro: format(new Date(e.fecha_registro), "dd/MM/yyyy"),
        };
      })
    );
  };

  return (
    <main className="section-main">
      <div className="title-list">
        <h5> Lista de medicamentos </h5>
        <a className="btn-link" href="medicamentos/nuevo">
          <FontAwesomeIcon icon={faPlus} size="sm" /> Agregar Medicamento{" "}
        </a>
      </div>
      {data.map((e, index) => (
        <CardMedicamentos data={e} key={index} />
      ))}
    </main>
  );

}
