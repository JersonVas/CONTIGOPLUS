"use client";
import FormMedicamentos from "../../../components/medicamentos/form-medicamentos";
import { useParams } from 'next/navigation';

export default function NuevoMedicamento() {
    const { id } = useParams();
  return (
    <FormMedicamentos id={id}  />
  );
}