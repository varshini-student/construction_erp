import {
  Box,
  Button,
  TextField,
} from "@mui/material";

import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

const SupplierForm = ({
  onSubmit,
  initialData,
}) => {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
    useState({
      name: "",
      contact: "",
      address: "",
    });

  useEffect(() => {

    if (initialData) {

      setFormData({
        name:
          initialData.name || "",

        contact:
          initialData.contact || "",

        address:
          initialData.address || "",
      });
    }

  }, [initialData]);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !formData.name ||
      !formData.contact
    ) {
      alert(
        "All fields are required"
      );

      return;
    }

    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        fullWidth
        label="Supplier Name"
        name="name"
        margin="normal"
        value={formData.name}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Contact"
        name="contact"
        margin="normal"
        value={formData.contact}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        label="Address"
        name="address"
        margin="normal"
        value={formData.address}
        onChange={handleChange}
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          fullWidth
          type="submit"
          variant="contained"
        >
          Save Supplier
        </Button>

        <Button
          fullWidth
          variant="outlined"
          onClick={() =>
            navigate("/suppliers")
          }
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default SupplierForm;