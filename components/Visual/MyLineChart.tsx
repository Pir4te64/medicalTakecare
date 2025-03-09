import React, { FC } from "react";
import { View, Dimensions, ScrollView, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

interface HistorialItem {
  specialty?: string;
  treatments: { treatmentDate: number[] }[];
  followUps: { followUpDate: number[] }[];
  orders: { ordersDate: number[] }[];
}

interface MyLineChartProps {
  historialData: HistorialItem[];
}

const MyLineChart: FC<MyLineChartProps> = ({ historialData }) => {
  // Helpers para parsear las fechas y dejarlas en YYYY-MM-DD (para ordenar/contar internamente)
  const parseDateArrayToString = (dateArray: number[]): string => {
    const [year, month, day] = dateArray;
    const mm = String(month).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${year}-${mm}-${dd}`; // para orden interno
  };

  // Helper para mostrar la fecha como DD/MM/YYYY en la sección de información detallada
  const parseDateArrayToDDMMYYYY = (dateArray: number[]): string => {
    const [year, month, day] = dateArray;
    const dd = String(day).padStart(2, "0");
    const mm = String(month).padStart(2, "0");
    return `${dd}/${mm}/${year}`;
  };

  // 1. Recolectar TODAS las fechas de cada tipo
  const allTreatmentDates: Set<string> = new Set();
  const allFollowupDates: Set<string> = new Set();
  const allOrdersDates: Set<string> = new Set();

  historialData.forEach((item) => {
    item.treatments.forEach((t) => {
      allTreatmentDates.add(parseDateArrayToString(t.treatmentDate));
    });
    item.followUps.forEach((f) => {
      allFollowupDates.add(parseDateArrayToString(f.followUpDate));
    });
    item.orders.forEach((o) => {
      allOrdersDates.add(parseDateArrayToString(o.ordersDate));
    });
  });

  // 2. Crear un set global con todas las fechas y ordenarlas
  const allDatesSet = new Set<string>([
    ...allTreatmentDates,
    ...allFollowupDates,
    ...allOrdersDates,
  ]);
  const sortedDates = Array.from(allDatesSet).sort(); // "YYYY-MM-DD" ordena bien como string

  // 3. Labels (DD-MM) para el eje X
  const labels = sortedDates.map((dateStr) => {
    const [yyyy, mm, dd] = dateStr.split("-");
    return `${dd}-${mm}`; // eje X => solo día-mes
  });

  // 4. Para cada fecha, contamos los eventos en cada categoría
  const countByCategory = (
    categoryKey: "treatments" | "followUps" | "orders",
    dateField: "treatmentDate" | "followUpDate" | "ordersDate"
  ): number[] => {
    return sortedDates.map((dateStr) => {
      let count = 0;
      historialData.forEach((item) => {
        item[categoryKey].forEach((entry) => {
          if (parseDateArrayToString(entry[dateField]) === dateStr) {
            count++;
          }
        });
      });
      return count;
    });
  };

  const dataTreatments = countByCategory("treatments", "treatmentDate");
  const dataFollowUps = countByCategory("followUps", "followUpDate");
  const dataOrders = countByCategory("orders", "ordersDate");

  // 5. Construimos los tres datasets con colores distintos
  const datasets = [
    {
      data: dataTreatments,
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Rojo
      strokeWidth: 2,
    },
    {
      data: dataFollowUps,
      color: (opacity = 1) => `rgba(0, 128, 0, ${opacity})`, // Verde
      strokeWidth: 2,
    },
    {
      data: dataOrders,
      color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`, // Azul
      strokeWidth: 2,
    },
  ];

  // Dimensiones del gráfico
  const screenWidth = Dimensions.get("window").width;
  const chartHeight = 400;

  return (
    <View style={styles.container}>
      {/* Chart con scroll horizontal en caso de muchas fechas */}
      <ScrollView horizontal>
        <LineChart
          data={{
            labels,
            datasets,
            legend: ["Tratamientos", "Seguimientos", "Órdenes"], // Para la leyenda
          }}
          fromZero={true}
          yAxisMax={4} // Forzando la escala máxima
          width={Math.max(screenWidth, labels.length * 60)}
          height={chartHeight}
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "4",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          // Muestra leyenda de array legend
          withLegend={true}
        />
      </ScrollView>

      {/* Referencias debajo del chart */}
      <View style={styles.referencesContainer}>
        <Text style={styles.referencesTitle}>Referencias</Text>
        <Text>- Eje (horizontal): Fechas (Día-Mes).</Text>
        <Text>- Eje (vertical): Cantidad de eventos por fecha.</Text>
        <Text>- Línea Roja: Tratamientos</Text>
        <Text>- Línea Verde: Seguimientos</Text>
        <Text>- Línea Azul: Órdenes</Text>
      </View>

      {/* Lista con la misma información, formateando fechas a DD/MM/YYYY */}
      <View style={styles.dataListContainer}>
        <Text style={styles.subtitle}>Información Detallada</Text>

        {historialData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemTitle}>
              Especialidad: {item.specialty ?? "N/A"}
            </Text>

            {/* Tratamientos */}
            {item.treatments.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Tratamientos:</Text>
                {item.treatments.map((t, i2) => {
                  const dateStr = parseDateArrayToDDMMYYYY(t.treatmentDate);
                  return (
                    <Text key={i2} style={styles.itemDate}>
                      {">"} {dateStr}
                    </Text>
                  );
                })}
              </>
            )}

            {/* Seguimientos */}
            {item.followUps.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Seguimientos:</Text>
                {item.followUps.map((f, i2) => {
                  const dateStr = parseDateArrayToDDMMYYYY(f.followUpDate);
                  return (
                    <Text key={i2} style={styles.itemDate}>
                      {">"} {dateStr}
                    </Text>
                  );
                })}
              </>
            )}

            {/* Órdenes */}
            {item.orders.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Órdenes:</Text>
                {item.orders.map((o, i2) => {
                  const dateStr = parseDateArrayToDDMMYYYY(o.ordersDate);
                  return (
                    <Text key={i2} style={styles.itemDate}>
                      {">"}
                      {dateStr}
                    </Text>
                  );
                })}
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

export default MyLineChart;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  referencesContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 12,
  },
  referencesTitle: {
    marginBottom: 8,
    textAlign: "center",
    color: "#333",
  },
  dataListContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
    color: "#333",
  },
  itemContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  itemTitle: {
    fontWeight: "bold",
    marginBottom: 6,
    color: "#444",
  },
  sectionLabel: {
    marginTop: 4,
    fontStyle: "italic",
    color: "#555",
  },
  itemDate: {
    marginLeft: 12,
    color: "#666",
    fontSize: 14,
  },
});
