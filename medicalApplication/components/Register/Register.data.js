import * as Yup from "yup";

// Esquema de validación con Yup
export const validationSchema = Yup.object().shape({
  document: Yup.string()
    .required("El documento es obligatorio")
    .matches(
      /^[\d-]+$/,
      "El documento debe ser numérico y puede contener guiones"
    )
    .min(6, "El documento debe tener al menos 6 caracteres")
    .max(12, "El documento no puede tener más de 12 caracteres"),
  name: Yup.string()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),
  password: Yup.string()
    .required("La contraseña es obligatoria")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// Valores iniciales del formulario (sin pseudónimo)
export const initialValues = {
  document: "",
  name: "",
  password: "",
};
