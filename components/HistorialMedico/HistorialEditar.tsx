import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { HistorialPUT } from "./HistorialPUT";
import { HistorialEditarInterface } from "./HistorialInterface";
import ListField from "./InputsEditar/ListInput";
import { InputField } from "./InputsEditar/InputField";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HistorialEditar.styles";
import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

interface HistorialEditarProps {
  historial: HistorialEditarInterface;
  handleDelete: () => void;
}

// Función para formatear la fecha como DD/MM/YYYY
const formatDate = (date: Date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const HistorialEditar: React.FC<HistorialEditarProps> = ({
  historial,
  handleDelete,
}) => {
  const initialDate = new Date(historial.date);

  const [date, setDate] = useState<Date>(initialDate);
  const [specialty, setSpecialty] = useState(historial.specialty);
  const [treatingPhysician, setTreatingPhysician] = useState(
    historial.treatingPhysician
  );
  const [originalSymptoms, setOriginalSymptoms] = useState(
    historial.originalSymptoms
  );
  const [diagnoses, setDiagnoses] = useState(historial.diagnoses);
  const [treatments, setTreatments] = useState(historial.treatments);
  const [followUps, setFollowUps] = useState(historial.followUps);
  const [orders, setOrders] = useState(historial.orders);

  // Estados para el DateTimePicker
  // Para los pickers en campos de grupos (tratamientos, seguimientos y órdenes)
  const [selectedIndex, setSelectedIndex] = useState<{
    type: string;
    index: number;
  } | null>(null);
  // Para el picker del campo "Fecha" principal
  const [showMainPicker, setShowMainPicker] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [showSimtDiag, setSimtDiag] = useState(false);
  const [showMasdatos, setMasDatos] = useState(false);

  const convertToDate = (date: string | number[]) => {
    if (typeof date === "string") {
      return new Date(date);
    } else if (Array.isArray(date) && date.length === 3) {
      return new Date(date[0], date[1] - 1, date[2]);
    }
    return new Date();
  };

  const handleSubmit = async () => {
    const updatedHistorial = {
      id: historial.id,
      userDataId: historial.userDataId,
      date: date.toISOString().split("T")[0],
      specialty,
      treatingPhysician,
      originalSymptoms,
      diagnoses,
      treatments: treatments.map((t) => {
        const validDate = convertToDate(t.treatmentDate);
        const treatmentDate =
          validDate instanceof Date && !isNaN(validDate.getTime())
            ? validDate.toISOString().split("T")[0]
            : "";
        return {
          treatmentDate,
          urlDocTreatment: t.urlDocTreatment,
        };
      }),
      followUps: followUps.map((f) => {
        const validDate = convertToDate(f.followUpDate);
        const followUpDate =
          validDate instanceof Date && !isNaN(validDate.getTime())
            ? validDate.toISOString().split("T")[0]
            : "";
        return {
          followUpDate,
          followUpNotes: f.followUpNotes,
        };
      }),
      orders: orders.map((o) => {
        const validDate = convertToDate(o.ordersDate);
        const ordersDate =
          validDate instanceof Date && !isNaN(validDate.getTime())
            ? validDate.toISOString().split("T")[0]
            : "";
        return {
          ordersDate,
          urlDocOrders: o.urlDocOrders,
        };
      }),
    };

    try {
      await HistorialPUT(updatedHistorial);
      Alert.alert(
        "Actualización exitosa",
        "El historial se ha actualizado correctamente."
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Hubo un problema al actualizar el historial. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar historial médico</Text>

      {/* Sección Datos */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setShowDetails(!showDetails)}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Datos
        </Text>
        <Ionicons
          name={showDetails ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {showDetails && (
        <>
          <Text style={styles.label}>Fecha:</Text>
          {Platform.OS === "android" ? (
            <>
              <TouchableOpacity
                onPress={() => setShowMainPicker(true)}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 4,
                  marginBottom: 10,
                }}
              >
                <Text>{formatDate(date)}</Text>
              </TouchableOpacity>
              {showMainPicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (event.type === "set" && selectedDate) {
                      const today = new Date();
                      if (selectedDate > today) selectedDate = today;
                      setDate(selectedDate);
                    }
                    setShowMainPicker(false);
                  }}
                />
              )}
            </>
          ) : (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  const today = new Date();
                  if (selectedDate > today) selectedDate = today;
                  setDate(selectedDate);
                }
              }}
            />
          )}

          <InputField
            label="Especialidad"
            value={specialty}
            onChangeText={setSpecialty}
            placeholder="Especialidad"
          />

          <InputField
            label="Médico tratante"
            value={treatingPhysician}
            onChangeText={setTreatingPhysician}
            placeholder="Médico tratante"
          />
        </>
      )}

      {/* Sección Detalles (Síntomas y Diagnósticos) */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setSimtDiag(!showSimtDiag)}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Detalles
        </Text>
        <Ionicons
          name={showSimtDiag ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {showSimtDiag && (
        <>
          <ListField
            label="Síntomas originales"
            items={originalSymptoms}
            setItems={(index, value) => {
              const updated = [...originalSymptoms];
              updated[index] = value;
              setOriginalSymptoms(updated);
            }}
            addItem={() => setOriginalSymptoms([...originalSymptoms, ""])}
            removeItem={(index) => {
              const updated = originalSymptoms.filter((_, i) => i !== index);
              setOriginalSymptoms(updated);
            }}
            placeholder="Síntoma"
          />

          <ListField
            label="Diagnósticos"
            items={diagnoses}
            setItems={(index, value) => {
              const updated = [...diagnoses];
              updated[index] = value;
              setDiagnoses(updated);
            }}
            addItem={() => setDiagnoses([...diagnoses, ""])}
            removeItem={(index) => {
              const updated = diagnoses.filter((_, i) => i !== index);
              setDiagnoses(updated);
            }}
            placeholder="Diagnóstico"
          />
        </>
      )}

      {/* Sección Más detalles (Tratamientos, Seguimientos y Órdenes) */}
      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 10,
          borderRadius: 8,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        onPress={() => setMasDatos(!showMasdatos)}
      >
        <Text style={{ color: "white", marginRight: 10, fontSize: 16 }}>
          Mas detalles
        </Text>
        <Ionicons
          name={showMasdatos ? "chevron-up-outline" : "chevron-down-outline"}
          size={24}
          color="white"
        />
      </TouchableOpacity>

      {showMasdatos && (
        <>
          {/* Tratamientos */}
          <Text style={styles.label}>Tratamientos:</Text>
          <View style={styles.formContainer}>
            {treatments.map((treatment, index) => (
              <View key={`treatment-${index}`}>
                <Text style={styles.label}>Fecha de tratamiento:</Text>
                {Platform.OS === "android" ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedIndex({ type: "treatment", index })
                      }
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                        marginBottom: 10,
                      }}
                    >
                      <Text>
                        {formatDate(
                          convertToDate(treatment.treatmentDate)
                        )}
                      </Text>
                    </TouchableOpacity>
                    {selectedIndex &&
                      selectedIndex.type === "treatment" &&
                      selectedIndex.index === index && (
                        <DateTimePicker
                          value={convertToDate(treatment.treatmentDate)}
                          mode="date"
                          display="default"
                          maximumDate={new Date()}
                          onChange={(event, selectedDate) => {
                            if (event.type === "set" && selectedDate) {
                              const today = new Date();
                              if (selectedDate > today)
                                selectedDate = today;
                              const updated = [...treatments];
                              updated[index].treatmentDate =
                                selectedDate.toISOString();
                              setTreatments(updated);
                            }
                            setSelectedIndex(null);
                          }}
                        />
                      )}
                  </>
                ) : (
                  <DateTimePicker
                    value={convertToDate(treatment.treatmentDate)}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        const today = new Date();
                        if (selectedDate > today) selectedDate = today;
                        const updated = [...treatments];
                        updated[index].treatmentDate =
                          selectedDate.toISOString();
                        setTreatments(updated);
                      }
                    }}
                  />
                )}
                <Input
                  placeholder="URL del documento de tratamiento"
                  value={treatment.urlDocTreatment}
                  onChangeText={(text) => {
                    const updated = [...treatments];
                    updated[index].urlDocTreatment = text;
                    setTreatments(updated);
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                  rightIcon={<Icon name="link" size={20} color="gray" />}
                />
              </View>
            ))}
            <View style={styles.iconContainer}>
              <Icon
                name="remove-circle-outline"
                size={24}
                color={treatments.length > 1 ? "red" : "gray"}
                onPress={
                  treatments.length > 1
                    ? () => setTreatments(treatments.slice(0, -1))
                    : undefined
                }
              />
              <Icon
                name="add-circle-outline"
                size={24}
                color="green"
                onPress={() =>
                  setTreatments([
                    ...treatments,
                    {
                      treatmentDate: new Date().toISOString(),
                      urlDocTreatment: "",
                    },
                  ])
                }
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>

          {/* Seguimientos */}
          <Text style={styles.label}>Seguimientos:</Text>
          <View style={styles.formContainer}>
            {followUps.map((followUp, index) => (
              <View key={`followUp-${index}`} style={styles.itemContainer}>
                <Text style={styles.label}>Fecha de seguimiento:</Text>
                {Platform.OS === "android" ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedIndex({ type: "followUp", index })
                      }
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                        marginBottom: 10,
                      }}
                    >
                      <Text>
                        {formatDate(
                          convertToDate(followUp.followUpDate)
                        )}
                      </Text>
                    </TouchableOpacity>
                    {selectedIndex &&
                      selectedIndex.type === "followUp" &&
                      selectedIndex.index === index && (
                        <DateTimePicker
                          value={convertToDate(followUp.followUpDate)}
                          mode="date"
                          display="default"
                          maximumDate={new Date()}
                          onChange={(event, selectedDate) => {
                            if (event.type === "set" && selectedDate) {
                              const today = new Date();
                              if (selectedDate > today)
                                selectedDate = today;
                              const updated = [...followUps];
                              updated[index].followUpDate =
                                selectedDate.toISOString();
                              setFollowUps(updated);
                            }
                            setSelectedIndex(null);
                          }}
                        />
                      )}
                  </>
                ) : (
                  <DateTimePicker
                    value={convertToDate(followUp.followUpDate)}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        const today = new Date();
                        if (selectedDate > today) selectedDate = today;
                        const updated = [...followUps];
                        updated[index].followUpDate =
                          selectedDate.toISOString();
                        setFollowUps(updated);
                      }
                    }}
                  />
                )}
                <Input
                  placeholder="URL del documento de tratamiento"
                  value={followUp.description}
                  onChangeText={(text) => {
                    const updated = [...followUps];
                    updated[index].description = text;
                    setFollowUps(updated);
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                />
              </View>
            ))}
            <View style={styles.iconContainer}>
              <Icon
                name="remove-circle-outline"
                size={24}
                color={followUps.length > 1 ? "red" : "gray"}
                onPress={
                  followUps.length > 1
                    ? () => setFollowUps(followUps.slice(0, -1))
                    : undefined
                }
              />
              <Icon
                name="add-circle-outline"
                size={24}
                color="green"
                onPress={() =>
                  setFollowUps([
                    ...followUps,
                    {
                      followUpDate: new Date().toISOString(),
                      description: "",
                    },
                  ])
                }
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>

          {/* Órdenes */}
          <Text style={styles.label}>Órdenes:</Text>
          <View style={styles.formContainer}>
            {orders.map((order, index) => (
              <View key={`order-${index}`} style={styles.itemContainer}>
                <Text style={styles.label}>Fecha de orden:</Text>
                {Platform.OS === "android" ? (
                  <>
                    <TouchableOpacity
                      onPress={() =>
                        setSelectedIndex({ type: "order", index })
                      }
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: "#ccc",
                        borderRadius: 4,
                        marginBottom: 10,
                      }}
                    >
                      <Text>
                        {formatDate(convertToDate(order.ordersDate))}
                      </Text>
                    </TouchableOpacity>
                    {selectedIndex &&
                      selectedIndex.type === "order" &&
                      selectedIndex.index === index && (
                        <DateTimePicker
                          value={convertToDate(order.ordersDate)}
                          mode="date"
                          display="default"
                          maximumDate={new Date()}
                          onChange={(event, selectedDate) => {
                            if (event.type === "set" && selectedDate) {
                              const today = new Date();
                              if (selectedDate > today)
                                selectedDate = today;
                              const updated = [...orders];
                              updated[index].ordersDate =
                                selectedDate.toISOString();
                              setOrders(updated);
                            }
                            setSelectedIndex(null);
                          }}
                        />
                      )}
                  </>
                ) : (
                  <DateTimePicker
                    value={convertToDate(order.ordersDate)}
                    mode="date"
                    display="default"
                    maximumDate={new Date()}
                    onChange={(event, selectedDate) => {
                      if (selectedDate) {
                        const today = new Date();
                        if (selectedDate > today) selectedDate = today;
                        const updated = [...orders];
                        updated[index].ordersDate =
                          selectedDate.toISOString();
                        setOrders(updated);
                      }
                    }}
                  />
                )}
                <Input
                  placeholder="URL del documento de tratamiento"
                  value={order.details}
                  onChangeText={(text) => {
                    const updated = [...orders];
                    updated[index].details = text;
                    setOrders(updated);
                  }}
                  containerStyle={styles.inputContainer}
                  inputStyle={styles.inputText}
                />
              </View>
            ))}
            <View style={styles.iconContainer}>
              <Icon
                name="remove-circle-outline"
                size={24}
                color={orders.length > 1 ? "red" : "gray"}
                onPress={
                  orders.length > 1
                    ? () => setOrders(orders.slice(0, -1))
                    : undefined
                }
              />
              <Icon
                name="add-circle-outline"
                size={24}
                color="green"
                onPress={() =>
                  setOrders([
                    ...orders,
                    { ordersDate: new Date().toISOString(), details: "" },
                  ])
                }
                style={{ marginLeft: 10 }}
              />
            </View>
          </View>
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Guardar cambios"
          onPress={handleSubmit}
          buttonStyle={styles.saveButton}
        />
        <Button
          title="Eliminar"
          onPress={handleDelete}
          buttonStyle={styles.deleteButton}
        />
      </View>
    </View>
  );
};

export default HistorialEditar;
