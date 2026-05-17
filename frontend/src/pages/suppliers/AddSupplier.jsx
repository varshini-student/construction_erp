import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import SupplierForm from "../../components/forms/SupplierForm";

import { createSupplier } from "../../api/supplierApi";

const AddSupplier = () => {
  const navigate = useNavigate();

  const handleSubmit =
    async (formData) => {
      try {
        await createSupplier(
          formData
        );

        alert(
          "Supplier Added Successfully"
        );

        navigate("/suppliers");
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Add Supplier"
        );
      }
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={2}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 800,
        }}
      >
        <Typography
          variant="h5"
          mb={4}
        >
          Add Supplier
        </Typography>

        <SupplierForm
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};

export default AddSupplier;