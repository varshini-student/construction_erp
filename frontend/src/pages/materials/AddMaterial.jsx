import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import MaterialForm from "../../components/forms/MaterialForm";

import { createMaterial } from "../../api/materialApi";

const AddMaterial = () => {
  const navigate = useNavigate();

  const handleSubmit =
    async (formData) => {
      try {
        await createMaterial(
          formData
        );

        alert(
          "Material Added Successfully"
        );

        navigate("/materials");
      } catch (error) {
        console.log(error);

        alert(
          error.response.data.detail
        );
      }
    };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: 4,
        pb: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 780,
          borderRadius: 5,
          p: 5,
        }}
      >
        {/* Heading */}
        <Box mb={5}>
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={1}
          >
            Add Material
          </Typography>

          <Typography
            color="text.secondary"
          >
            Create and manage
            construction materials
          </Typography>
        </Box>

        {/* Form */}
        <MaterialForm
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};

export default AddMaterial;