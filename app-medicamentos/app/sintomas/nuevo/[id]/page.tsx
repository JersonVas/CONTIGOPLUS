"use client";
import FormSintomas from "../../../components/sintomas/form-sintomas";
import { useParams } from "next/navigation";

export default function NuevoMedicamento() {
  const { id } = useParams();

  return(
    <main className="section-main">
      <h5> Sintomas </h5>
      <FormSintomas id={id} />;
    </main>
  )
}
