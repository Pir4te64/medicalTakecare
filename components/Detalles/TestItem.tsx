import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import TestGroup from "./TestGroup"; // Importamos TestGroup
import { groupByTest } from "./utils"; // Importamos la función groupByTest

const PatientResults = ({ data }) => {
  // Validación estricta: data.body debe ser un array con al menos un elemento
  const validData = useMemo(
    () => Array.isArray(data?.body) && data.body.length > 0,
    [data]
  );

  // Agrupar datos si son válidos
  const groupedData = useMemo(
    () => (validData ? groupByTest(data.body) : []),
    [validData, data]
  );

  const [visibleData, setVisibleData] = useState(groupedData.slice(0, 10)); // Carga inicial en grupos
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading || !validData || visibleData.length >= groupedData.length)
      return;
    setLoading(true);
    setTimeout(() => {
      setVisibleData((prevData) => [
        ...prevData,
        ...groupedData.slice(prevData.length, prevData.length + 10),
      ]);
      setLoading(false);
    }, 1000); // Simula tiempo de carga
  };

  const renderItem = useCallback(({ item }) => <TestGroup group={item} />, []);

  if (!validData) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.noDataText}>No hay resultados disponibles</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={visibleData}
      keyExtractor={(item) => item.test}
      renderItem={renderItem}
      onEndReached={loadMore}
      onEndReachedThreshold={0.1}
      contentContainerStyle={styles.listContainer}
      ListFooterComponent={
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
          </View>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  loadingContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
});

export default PatientResults;
