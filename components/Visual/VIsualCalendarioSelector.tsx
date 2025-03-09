import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";

interface FilterBarProps {
  fechaDesde: string;
  fechaHasta: string;
  setFechaDesde: (value: string) => void;
  setFechaHasta: (value: string) => void;
  handleClearFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  fechaDesde,
  fechaHasta,
  setFechaDesde,
  setFechaHasta,
  handleClearFilters,
}) => {
  return (
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
          Limpiar fechas
        </button>
      ) : (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={handleClearFilters}>
          <Text style={styles.clearButtonText}>Limpiar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  filterContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 50,
    padding: 8,
    marginVertical: 5,
    width: "100%",
  },
  clearButton: {
    backgroundColor: "#0066cc",
    paddingVertical: 8,
    paddingHorizontal: "auto",
    borderRadius: 5,
    marginTop: 10,
  },
  clearButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  clearButtonWeb: {
    cursor: "pointer",
    backgroundColor: "#0066cc",
    border: "none",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    marginTop: 10,
    width: "100%",
  },
});
