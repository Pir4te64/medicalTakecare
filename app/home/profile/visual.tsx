import getInfo from "@/components/DetalleInformes/Detalles.GetInfo";
import { getHistorialByUser } from "@/components/HistorialMedico/getHistorialByUser";
import { Afiliado } from "@/utils/types";
import { useLocalSearchParams } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
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
            // Llamada a getHistorialByUser y almacenar el resultado en el estado
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
    <View style={styles.container}>
      <Text style={styles.title}>Visual</Text>
      {/* Filtros de fecha */}
      <View style={styles.filterContainer}>
        <Text>Desde:</Text>
        {Platform.OS === "web" ? (
          <input
            type='date'
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            style={styles.input}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder='YYYY-MM-DD'
            value={fechaDesde}
            onChangeText={setFechaDesde}
          />
        )}

        <Text>Hasta:</Text>
        {Platform.OS === "web" ? (
          <input
            type='date'
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            style={styles.input}
          />
        ) : (
          <TextInput
            style={styles.input}
            placeholder='YYYY-MM-DD'
            value={fechaHasta}
            onChangeText={setFechaHasta}
          />
        )}

        {/* Botón para limpiar filtros */}
        {Platform.OS === "web" ? (
          <button
            type='button'
            onClick={handleClearFilters}
            style={styles.clearButtonWeb}>
            Limpiar
          </button>
        ) : (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilters}>
            <Text style={styles.clearButtonText}>Limpiar</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.subtitle}>Historial:</Text>
      <FlatList
        data={filteredHistorial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>Especialidad: {item.specialty}</Text>
            <Text>Fecha: {item.date}</Text>
            <Text>Médico Tratante: {item.treatingPhysician}</Text>
            <Text>Síntomas: {item.originalSymptoms.join(", ")}</Text>
            <Text>Diagnósticos: {item.diagnoses.join(", ")}</Text>
            {/* Puedes agregar aquí más detalles, como tratamientos, seguimientos y órdenes */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginVertical: 5,
    width: "100%",
  },
  clearButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  clearButtonWeb: {
    cursor: "pointer",
    backgroundColor: "#0066cc",
    border: "none",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: 5,
    marginTop: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  itemTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default Visual;
