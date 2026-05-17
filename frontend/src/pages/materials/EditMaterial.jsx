import {
  useEffect,
  useState,
} from "react";

import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import MaterialForm from "../../components/forms/MaterialForm";

import {
  updateMaterial,
  getMaterialById,
} from "../../api/materialApi";

const EditMaterial = () => {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const [material,
    setMaterial] =
    useState(null);

  useEffect(() => {
    fetchMaterial();
  }, []);

  const fetchMaterial =
    async () => {
      try {
        const data =
          await getMaterialById(id);

        setMaterial(data);
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (formData) => {
      try {
        await updateMaterial(
          id,
          formData
        );

        alert(
          "Material Updated"
        );

        navigate(
          "/materials"
        );
      } catch (error) {
        console.log(error);
      }
    };

  if (!material) {
    return (
      <Typography>
        Loading...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          mb={3}
          fontWeight="bold"
        >
          Edit Material
        </Typography>

        <MaterialForm
          initialData={material}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};

export default EditMaterial;