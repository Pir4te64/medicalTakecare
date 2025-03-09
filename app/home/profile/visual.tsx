import getInfo from "@/components/DetalleInformes/Detalles.GetInfo";
import { getHistorialByUser } from "@/components/HistorialMedico/getHistorialByUser";
import { Afiliado } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

const Visual = () => {
  const { afiliado } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  let afiliadoData: Afiliado | null = null;
  try {
    afiliadoData = afiliado ? JSON.parse(afiliado as string) : null;
  } catch (error) {
    console.error("Error al parsear afiliado:", error);
  }

  useEffect(() => {
    // Verifica que se tenga afiliadoData y un id válido
    if (afiliadoData && afiliadoData.id) {
      getInfo(afiliadoData.id)
        .then((response) => {
          if (response && response.success) {
            const userDataId = response.data.body.userDataId;
            setData(userDataId);
            // Llamada a getHistorialByUser y mostrar el resultado en consola
            getHistorialByUser(userDataId)
              .then((historialData) => {
                console.log("Historial Data:", historialData);
              })
              .catch((err) => {
                console.error("Error al obtener el historial:", err);
              });
          } else {
            setError("No se encontró información del afiliado.");
          }
        })
        .catch((err) => {
          console.error(err);
          setError("Error al obtener la información.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [afiliadoData]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size='large' color='#0066cc' />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View>
        <Text>No se encontró información del afiliado.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Visual</Text>
      {/* Aquí se muestra el userDataId obtenido */}
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
};

export default Visual;
