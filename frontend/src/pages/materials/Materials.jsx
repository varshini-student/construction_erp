import {
  useEffect,
  useState,
} from "react";

import {
  Button,
  Stack,
  Paper,
  TextField,
  Box,
  Typography,
} from "@mui/material";

import {
  deleteMaterial,
  getMaterials,
} from "../../api/materialApi";

import { useNavigate } from "react-router-dom";

import Loader from "../../components/common/Loader";

import DataTable from "../../components/common/DataTable";

const Materials = () => {
  const navigate = useNavigate();

  const [materials, setMaterials] =
    useState([]);

  const [filteredMaterials,
    setFilteredMaterials] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const fetchMaterials =
    async () => {
      try {
        const data =
          await getMaterials();

        setMaterials(data);

        setFilteredMaterials(
          data
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchMaterials();
  }, []);

  // Search
  useEffect(() => {
    const filtered =
      materials.filter(
        (item) =>
          item.name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );

    setFilteredMaterials(
      filtered
    );
  }, [search, materials]);

  // Delete
  const handleDelete =
    async (id) => {
      const confirmDelete =
        window.confirm(
          "Are you sure to deactivate?"
        );

      if (!confirmDelete)
        return;

      try {
        await deleteMaterial(id);

        alert(
          "Material Deactivated"
        );

        fetchMaterials();
      } catch (error) {
        console.log(error);

        alert(
          error.response.data
            .detail
        );
      }
    };

  // Table Columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
    },

    {
      field: "name",
      headerName:
        "Material Name",
    },

    {
      field: "unit",
      headerName: "Unit",
    },

    {
      field: "minimum_stock",
      headerName:
        "Minimum Stock",
    },

    {
      field: "actions",
      headerName: "Actions",

      render: (row) => (
        <Stack
          direction="row"
          spacing={1.5}
        >
          <Button
            size="small"
            variant="outlined"
            onClick={() =>
              navigate(
                `/materials/edit/${row.id}`
              )
            }
          >
            Edit
          </Button>

          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={() =>
              handleDelete(
                row.id
              )
            }
          >
            Deactivate
          </Button>
        </Stack>
      ),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {/* Top Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Materials
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() =>
            navigate(
              "/materials/add"
            )
          }
          sx={{
            borderRadius: 3,
            textTransform:
              "none",
            px: 3,
          }}
        >
          Add Material
        </Button>
      </Box>

      {/* Search */}
      <Box
        sx={{
          mb: 5,
        }}
      >
        <TextField
          fullWidth
          placeholder="Search Materials..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </Box>

      {/* Table */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          borderRadius: 5,
        }}
      >
        {filteredMaterials.length ===
        0 ? (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              color="text.secondary"
            >
              No Materials Found
            </Typography>
          </Box>
        ) : (
          <DataTable
            columns={columns}
            rows={
              filteredMaterials
            }
          />
        )}
      </Paper>
    </>
  );
};

export default Materials;