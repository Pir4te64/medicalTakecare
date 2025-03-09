import getInfo from "@/components/DetalleInformes/Detalles.GetInfo";
import { getHistorialByUser } from "@/components/HistorialMedico/getHistorialByUser";
import MyLineChart from "@/components/Visual/MyLineChart";
import FilterBar from "@/components/Visual/VIsualCalendarioSelector";
import { Afiliado } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";

const Visual = () => {
  const { afiliado } = useLocalSearchParams();
  const [data, setData] = useState<any>(null);
  const [historial, setHistorial] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Estados para los filtros de fechas
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  let afiliadoData: Afiliado | null = null;
  try {
    afiliadoData = afiliado ? JSON.parse(afiliado as string) : null;
  } catch (error) {
    console.error("Error al parsear afiliado:", error);
  }

  useEffect(() => {
    if (afiliadoData && afiliadoData.id) {
      getInfo(afiliadoData.id)
        .then((response) => {
          if (response && response.success) {
            const userDataId = response.data.body.userDataId;
            setData(userDataId);
            getHistorialByUser(userDataId)
              .then((historialData) => {
                console.log("Historial Data:", historialData);
                setHistorial(historialData);
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
  }, [afiliadoData?.id]);

  // Handler para limpiar los filtros
  const handleClearFilters = () => {
    setFechaDesde("");
    setFechaHasta("");
  };

  // Filtrar el historial según las fechas (se asume formato "YYYY-MM-DD")
  const filteredHistorial = historial.filter((item) => {
    if (fechaDesde && item.date < fechaDesde) return false;
    if (fechaHasta && item.date > fechaHasta) return false;
    return true;
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color='#0066cc' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>No se encontró información del afiliado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Visual</Text>

        {/* Aquí usamos nuestro componente FilterBar */}
        <FilterBar
          fechaDesde={fechaDesde}
          fechaHasta={fechaHasta}
          setFechaDesde={setFechaDesde}
          setFechaHasta={setFechaHasta}
          handleClearFilters={handleClearFilters}
        />

        <MyLineChart historialData={filteredHistorial} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    width: "100%",
  },
  container: {
    padding: 20,
    width: "85%",
    marginHorizontal: "auto",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default Visual;
