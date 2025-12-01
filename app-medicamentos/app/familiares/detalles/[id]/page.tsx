"use client";
import DetallesFamiliar from "../../../components/familiares/detalles-familiar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetalleFamiliar() {
  const { id } = useParams();
  const [familiar, setFamiliar] = useState(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/familiares/single/` + id)
      .then((res) => res.json())
      .then((data) => setFamiliar(data))
      .catch((err) => console.error("Error al cargar familiares:", err));
  }, [id]);

  return (
    <main className="section-main">
      <DetallesFamiliar fam={familiar}  />
    </main>
  );
}

