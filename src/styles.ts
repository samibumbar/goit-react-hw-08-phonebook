const globalStyles = {
  formContainer: {
    maxWidth: "400px",
    margin: "auto",
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  formInput: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
  },
  submitButton: {
    backgroundColor: "blue.500",
    color: "white",
    padding: "0.75rem",
    borderRadius: "6px",
    textAlign: "center",
    fontWeight: "bold",
    cursor: "pointer",
    _hover: {
      backgroundColor: "blue.600",
    },
  },
  headerTitle: {
    textAlign: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  container: {
    padding: "1rem",
  },
};

export default globalStyles;
