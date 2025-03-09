// Función para formatear la fecha a dd/mm/yyyy
export const parseDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 3)
    return "Fecha no disponible";
  const [year, month, day] = dateArray;
  return `${day}/${month}`;
};

// Agrupa los datos por "test"
export const groupByTest = (data) => {
  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.test]) {
      grouped[item.test] = [];
    }
    grouped[item.test].push(item);
  });
  return Object.entries(grouped).map(([test, records]) => ({ test, records }));
};
