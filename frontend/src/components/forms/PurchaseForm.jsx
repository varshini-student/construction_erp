import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Stack,
  Paper,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import {
  getMaterials,
} from "../../api/materialApi";

import {
  getSuppliers,
} from "../../api/supplierApi";

const PurchaseForm = ({
  onSubmit,
}) => {
  const navigate =
    useNavigate();

  const [materials,
    setMaterials] =
    useState([]);

  const [suppliers,
    setSuppliers] =
    useState([]);

  const [formData,
    setFormData] =
    useState({
      material_id: "",
      supplier_id: "",
      quantity: "",
      unit_price: "",
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {
        const materialsData =
          await getMaterials();

        const suppliersData =
          await getSuppliers();

        setMaterials(
          materialsData
        );

        setSuppliers(
          suppliersData
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleChange = (
    e
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // Auto Total Calculation
  const totalAmount =
    Number(
      formData.quantity || 0
    ) *
    Number(
      formData.unit_price || 0
    );

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    if (
      !formData.material_id ||
      !formData.supplier_id ||
      !formData.quantity ||
      !formData.unit_price
    ) {
      alert(
        "All fields are required"
      );

      return;
    }

    onSubmit({
      ...formData,
      total_amount:
        totalAmount,
    });
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
      <Stack spacing={4}>
        {/* Material */}
        <TextField
          select
          fullWidth
          label="Material"
          name="material_id"
          value={
            formData.material_id
          }
          onChange={handleChange}
        >
          {materials.map(
            (material) => (
              <MenuItem
                key={material.id}
                value={material.id}
              >
                {material.name}
              </MenuItem>
            )
          )}
        </TextField>

        {/* Supplier */}
        <TextField
          select
          fullWidth
          label="Supplier"
          name="supplier_id"
          value={
            formData.supplier_id
          }
          onChange={handleChange}
        >
          {suppliers.map(
            (supplier) => (
              <MenuItem
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.name}
              </MenuItem>
            )
          )}
        </TextField>

        {/* Quantity */}
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={
            formData.quantity
          }
          onChange={handleChange}
        />

        {/* Unit Price */}
        <TextField
          fullWidth
          label="Unit Price"
          name="unit_price"
          type="number"
          value={
            formData.unit_price
          }
          onChange={handleChange}
        />
      </Stack>

      {/* Total Amount */}
      <Paper
        elevation={1}
        sx={{
          mt: 5,
          p: 3,
          borderRadius: 4,
          backgroundColor:
            "#f5f7fb",
        }}
      >
        <Typography
          color="text.secondary"
          mb={1}
        >
          Total Amount
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary"
        >
          ₹{totalAmount}
        </Typography>
      </Paper>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 5,
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
          Create Purchase
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
            navigate("/purchase")
          }
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default PurchaseForm;