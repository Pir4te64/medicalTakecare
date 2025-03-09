const { StyleSheet } = require("react-native");

export const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  box: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "green",
    paddingVertical: 10,
    borderRadius: 5,
  },
  diseasesList: {
    marginVertical: 8,
    padding: 10,
  },
  diseaseItemContainer: {
    borderRadius: 8,
    padding: 5,
  },
});
