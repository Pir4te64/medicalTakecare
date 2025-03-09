// components/ProfileInfo.tsx
import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useProfileStore } from "./profileStore";
import { styles } from "./Profile.styles";
import PerfilPrincipal from "./PerfilPrincipal";
import PerfilSecundario from "./PerfilAfiliado/PerfilAfiliado";

const ProfileInfo = () => {
  const { profile, loading, error, fetchProfile } = useProfileStore();

  // Ejecutar fetchProfile al enfocar la pantalla
  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  // Memorizamos onRefresh
  const onRefresh = useCallback(async () => {
    await fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No se pudo cargar el perfil</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
      >
        <View style={styles.profileContainer}>
          <PerfilPrincipal profile={profile} reloadProfile={fetchProfile} />
          <PerfilSecundario
            perfilSuper={profile.tipoCuenta}
            afiliados={profile.afiliados || []}
            reloadProfile={fetchProfile}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileInfo;
