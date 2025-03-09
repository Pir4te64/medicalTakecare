import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator, ScrollView } from "react-native";
import getInfo from "./Detalles.GetInfo";
import { styles } from "./AfiliadoInfo.styles";
interface AfiliadoInfoProps {
  id: number;
}

const AfiliadoInfo: React.FC<AfiliadoInfoProps> = ({ id }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getInfo(id.toString());
      if (result?.success && result.data) {
        setData(result.data.body);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
    );
  }

  if (!data) {
    return <Text style={styles.errorText}>No se encontró información.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fecha de nacimiento:</Text>
        <Text
          style={styles.infoValue}
        >{`${data.birthDate[2]}/${data.birthDate[1]}/${data.birthDate[0]}`}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Peso:</Text>
        <Text style={styles.infoValue}>{data.weight} kg</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Altura:</Text>
        <Text style={styles.infoValue}>{data.height} cm</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Tipo de sangre:</Text>
        <Text style={styles.infoValue}>{data.bloodType}</Text>
      </View>

      <View style={styles.infoContainerAlergias}>
        <Text style={styles.sectionTitle}>Alérgenos:</Text>
        {data.medicationAllergyUsers.length > 0 ? (
          data.medicationAllergyUsers.map((allergy: any, index: number) => (
            <Text key={index} style={styles.listItem}>
              {allergy.allergy}
            </Text>
          ))
        ) : (
          <Text style={styles.listItem}>No reportado</Text>
        )}

        <Text style={styles.sectionTitle}>Otras alergias:</Text>
        {data.otherAllergiesUsers.length > 0 ? (
          data.otherAllergiesUsers.map((allergy: any, index: number) => (
            <Text key={index} style={styles.listItem}>
              {allergy.allergy}
            </Text>
          ))
        ) : (
          <Text style={styles.listItem}>No reportado</Text>
        )}

        <Text style={styles.sectionTitle}>Enfermedades crónicas:</Text>
        {data.chronicDiseasesUsers.length > 0 ? (
          data.chronicDiseasesUsers.map((disease: any, index: number) => (
            <Text key={index} style={styles.listItem}>
              {disease.disease}
            </Text>
          ))
        ) : (
          <Text style={styles.listItem}>No reportado</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default AfiliadoInfo;
