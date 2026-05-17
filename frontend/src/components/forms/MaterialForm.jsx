import {
  Box,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

const MaterialForm = ({
  onSubmit,
  initialData,
}) => {
  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      unit: "",
      minimum_stock: "",
    });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name:
          initialData.name || "",

        unit:
          initialData.unit || "",

        minimum_stock:
          initialData.minimum_stock || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.unit ||
      !formData.minimum_stock
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
      sx={{
        width: "100%",
      }}
    >
      {/* Form Fields */}
      <Stack spacing={3}>
        <TextField
          fullWidth
          label="Material Name"
          placeholder="Enter Material Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          select
          fullWidth
          label="Unit Type"
          name="unit"
          value={formData.unit}
          onChange={handleChange}
        >
          <MenuItem value="KG">
            KG
          </MenuItem>

          <MenuItem value="Ton">
            Ton
          </MenuItem>

          <MenuItem value="Bag">
            Bag
          </MenuItem>

          <MenuItem value="Piece">
            Piece
          </MenuItem>

          <MenuItem value="Litre">
            Litre
          </MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="number"
          label="Minimum Stock"
          placeholder="Enter Minimum Stock"
          name="minimum_stock"
          value={
            formData.minimum_stock
          }
          onChange={handleChange}
        />
      </Stack>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 4,
        }}
      >
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform:
              "none",
            fontWeight: 600,
          }}
        >
          Save Material
        </Button>

        <Button
          fullWidth
          variant="outlined"
          size="large"
          sx={{
            py: 1.5,
            borderRadius: 3,
            textTransform:
              "none",
            fontWeight: 600,
          }}
          onClick={() =>
            navigate(
              "/materials"
            )
          }
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default MaterialForm;