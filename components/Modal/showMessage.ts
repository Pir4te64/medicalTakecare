import { Alert, Platform } from "react-native";

export function showAlert(title: string, message: string) {
  if (Platform.OS === "web") {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export function showConfirm(
  title: string,
  message: string,
  onConfirm: () => void
) {
  if (Platform.OS === "web") {
    const confirmed = window.confirm(`${title}\n${message}`);
    if (confirmed) {
      onConfirm();
    }
  } else {
    Alert.alert(
      title,
      message,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: onConfirm,
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  }
}
