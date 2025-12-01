"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
export default function Historial() {
  return (
    <main className="section-main">
      <div className="title-list">
        <h5> Historial Clinico </h5>
      </div>
      <div className="card-alert">
        <div className="card-text">
          <label htmlFor=""> Informacion de Emergencia </label>
        </div>
        <div className="card-body">
          <div>
            <label htmlFor="">Tipo de Sangre</label> <br /> <span> O+ </span>
          </div>
          <div>
            <label htmlFor="">Alergias</label> <br /> <span> Penicilina </span>
          </div>
          <div>
            <label htmlFor="">Condiciones</label> <br />{" "}
            <span> Hipertension </span>
          </div>
          <div>
            <label htmlFor="">Medicamentos</label> <br />{" "}
            <span> Hibuprofeno </span>
          </div>
        </div>
      </div>
      <div className="container-cards">
        <div className="card-historial">
          <div className="card-icon">
            <span></span>
            <div></div>
          </div>
          <div className="card-content">
            <div className="card-content-title">
              <h5> Fiebre </h5>
              <span> SINTOMA </span>
            </div>
            <small> Fecha 20/10/2025</small>
            <p> Descripcion </p>
          </div>
        </div>
        <div className="card-historial">
          <div className="card-icon">
            <span></span>
            <div></div>
          </div>
          <div className="card-content">
            <div className="card-content-title">
              <h5> Fiebre </h5>
              <span> SINTOMA </span>
            </div>
            <small> Fecha 20/10/2025</small>
            <p> Descripcion </p>
          </div>
        </div>
      </div>
    </main>
  );
}
