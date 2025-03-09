import React, { memo, useState } from "react";
import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { parseDate } from "./utils";
import { LineChart } from "react-native-chart-kit";
import Ionicons from "react-native-vector-icons/Ionicons"; // Importa Ionicons

const TestGroup = memo(({ group }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get("window").width - 32
  );

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Función auxiliar para obtener un número o un valor default
  const parseChartValue = (value, defaultValue = 0) => {
    if (typeof value !== "string") return defaultValue;
    const num = parseFloat(value);
    if (!isNaN(num)) return num;
    const match = value.match(/(\d+(\.\d+)?)/);
    return match ? parseFloat(match[0]) : defaultValue;
  };

  // Preparación de datos para el gráfico de línea
  const lineChartData = {
    labels: group.records.map((record) => parseDate(record.date)),
    legend: ["Resultado", "Ref Min", "Ref Max"],
    datasets: [
      {
        data: group.records.map((record) => parseChartValue(record.result, 0)),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: group.records.map((record) =>
          parseChartValue(record.referenceMin, 0)
        ),
        color: (opacity = 1) => `rgba(0, 200, 0, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: group.records.map((record) =>
          parseChartValue(
            record.referenceMax,
            parseChartValue(record.referenceMin, 0)
          )
        ),
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
  };

  return (
    <TouchableOpacity onPress={toggleExpand} style={styles.itemContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.testName}>{group.test}</Text>
        {/* Ícono de Ionicons que cambia según el estado */}
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={24}
          color="#007AFF"
        />
      </View>
      {isExpanded && (
        <View
          style={styles.expandedContainer}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setContainerWidth(width);
          }}
        >
          <LineChart
            data={lineChartData}
            width={containerWidth}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
          {group.records.map((item, index) => (
            <View key={index} style={styles.recordContainer}>
              <Text style={styles.recordText}>
                Fecha: {parseDate(item.date)}
              </Text>
              <Text style={styles.recordText}>
                Laboratorio: {item.laboratory || "No especificado"}
              </Text>
              <Text style={styles.recordText}>
                Resultado: {item.result || "No disponible"}
              </Text>
              <Text style={styles.recordText}>
                Rango: {item.referenceMin}{" "}
                {item.referenceMax ? `- ${item.referenceMax}` : ""}
              </Text>
              {item.urlRecipe && (
                <Text
                  style={styles.link}
                  onPress={() => Linking.openURL(item.urlRecipe)}
                >
                  Ver estudio medico
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#fff",
    marginVertical: 12,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  testName: {
    fontSize: 20,
    color: "#007AFF",
    fontWeight: "600",
  },
  expandedContainer: {
    marginTop: 12,
    padding: 8,
    overflow: "hidden", // Evita que se desborde el contenido
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
    alignSelf: "center", // Centra el gráfico dentro del contenedor
  },
  recordContainer: {
    marginTop: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  recordText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  link: {
    color: "#007AFF",
    textDecorationLine: "underline",
    fontSize: 16,
    marginTop: 4,
  },
});

export default TestGroup;
