import {
  useEffect,
  useState,
} from "react";
import {
  Button,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  getSuppliers,deleteSupplier
} from "../../api/supplierApi";

import Loader from "../../components/common/Loader";

import DataTable from "../../components/common/DataTable";

import PageHeader from "../../components/common/PageHeader";

const Suppliers = () => {
  const navigate = useNavigate();

  const [suppliers, setSuppliers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchSuppliers = async () => {
    try {
      const data =
        await getSuppliers();

      setSuppliers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);
const handleDelete =
  async (id) => {

    const confirmDelete =
      window.confirm(
        "Deactivate this supplier?"
      );

    if (!confirmDelete) {
      return;
    }

    try {

      await deleteSupplier(id);

      alert(
        "Supplier Deactivated"
      );

      fetchSuppliers();

    } catch (error) {

      console.log(error);

      alert(
        error.response.data.detail
      );
    }
  };
  const columns = [
  {
    field: "id",
    headerName: "ID",
  },

  {
    field: "name",
    headerName: "Supplier Name",
  },

  {
    field: "contact",
    headerName: "Contact",
  },

  {
    field: "address",
    headerName: "Address",
  },

  {
    field: "actions",
    headerName: "Actions",

  render: (row) => (

  <Stack
    direction="row"
    spacing={1}
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
        handleDelete(row.id)
      }
    >
      Deactivate
    </Button>

  </Stack>
)
  },
];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader
        title="Suppliers"
        buttonText="Add Supplier"
        onButtonClick={() =>
          navigate("/suppliers/add")
        }
      />

      <DataTable
        columns={columns}
        rows={suppliers}
      />
    </>
  );
};

export default Suppliers;