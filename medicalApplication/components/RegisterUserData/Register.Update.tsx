export const getUpdatedInfo = (afiliado: { id: number }, formData: any) => {
  return {
    userId: afiliado.id, // ID del afiliado
    userDataId: "",
    birthDate: formData.birthDate.toISOString().split("T")[0], // Formatear la fecha correctamente
    weight: formData.weight,
    height: formData.height,
    bloodType: formData.bloodType,
    medicationAllergyUsers: formData.medicationAllergies.map(
      (allergy: { allergy: string }) => ({
        allergy: allergy.allergy,
      })
    ),
    otherAllergiesUsers: formData.otherAllergies.map(
      (allergy: { allergy: string }) => ({
        allergy: allergy.allergy,
      })
    ),
    chronicDiseasesUsers: formData.chronicDiseases.map(
      (disease: {
        disease: string;
        doctorEmail: string;
        medicalCenter: string;
        medicalTreatmentUser: any[];
      }) => ({
        disease: disease.disease,
        doctorEmail: disease.doctorEmail,
        medicalCenter: disease.medicalCenter,
        medicalTreatmentUser: disease.medicalTreatmentUser.map(
          (treatment: { medication: string; dosage: string }) => ({
            medication: treatment.medication,
            dosage: treatment.dosage,
          })
        ),
      })
    ),
  };
};
