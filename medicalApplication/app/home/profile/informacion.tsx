// RegistrationForm.tsx
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useLocalSearchParams } from "expo-router"; // Importar useLocalSearchParams
import RegisterDataForm from "@/components/RegisterUserData/InformacionMedica/InformacionMedicaForm";
import { Afiliado } from "@/utils/types";

const RegistrationForm = () => {
  const { afiliado } = useLocalSearchParams(); // Accedemos al parámetro afiliado directamente
  const [afiliadoData, setAfiliadoData] = useState<Afiliado | null>(null);

  useEffect(() => {
    if (afiliado) {
      // Decodificamos y parseamos el parámetro afiliado
      setAfiliadoData(JSON.parse(decodeURIComponent(afiliado as string)));
    }
  }, [afiliado]);

  if (!afiliadoData) {
    return <Text>Cargando...</Text>; // O un componente de carga
  }

  return (
    <View style={styles.container}>
      <RegisterDataForm afiliado={afiliadoData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default RegistrationForm;
