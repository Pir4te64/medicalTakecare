// hooks/useUserData.ts
import { useEffect } from "react";
import { getUserData } from "../Register.fetch";
import { useRegisterStore } from "../ChronicDiseaseInput/useRegisterStore";

export const useUserData = (
  afiliadoId: number,
  setIsDataLoaded: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { setField } = useRegisterStore();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData(afiliadoId);

        if (response.success && response.body) {
          const {
            birthDate,
            weight,
            height,
            bloodType,
            medicationAllergyUsers,
            otherAllergiesUsers,
            chronicDiseasesUsers,
          } = response.body;

          setField(
            "birthDate",
            new Date(birthDate[0], birthDate[1] - 1, birthDate[2])
          );
          setField("weight", weight || "");
          setField("height", height || "");
          setField("bloodType", bloodType || "");
          setField("medicationAllergies", medicationAllergyUsers || []);
          setField("otherAllergies", otherAllergiesUsers || []);
          setField("chronicDiseases", chronicDiseasesUsers || []);

          // Actualiza el estado cuando los datos se han cargado correctamente
          setIsDataLoaded(true);
        }
      } catch (error) {
        setIsDataLoaded(false); // En caso de error, no marcamos como cargado
      }
    };

    fetchUserData();
  }, [afiliadoId, setField, setIsDataLoaded]);
};
