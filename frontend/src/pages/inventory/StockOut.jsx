import {
  Box,
  Paper,
  Typography,
} from "@mui/material";

import {
  useNavigate,
} from "react-router-dom";

import StockOutForm from "../../components/forms/StockOutForm";

import {
  stockOutMaterial,
} from "../../api/inventoryApi";

const StockOut = () => {

  const navigate =
    useNavigate();

  const handleSubmit =
    async (formData) => {

      try {

        await stockOutMaterial(
          formData
        );

        alert(
          "Material Issued Successfully"
        );

        navigate("/inventory");

      } catch (error) {

        console.log(error);

        if (
          error.response?.data?.detail
        ) {

          alert(
            error.response.data.detail
          );

        } else {

          alert(
            "Stock Out Failed"
          );
        }
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
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 700,
        }}
      >

        <Typography
          variant="h5"
          mb={3}
        >
          Stock Out
        </Typography>

        <StockOutForm
          onSubmit={handleSubmit}
        />

      </Paper>

    </Box>
  );
};

export default StockOut;