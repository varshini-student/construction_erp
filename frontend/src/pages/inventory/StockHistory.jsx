import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { Chip } from "@mui/material";

import Loader from "../../components/common/Loader";

import DataTable from "../../components/common/DataTable";

import PageHeader from "../../components/common/PageHeader";

import { getStockHistory } from "../../api/inventoryApi";

const StockHistory = () => {
  const { materialId } = useParams();

  const [history, setHistory] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const data = await getStockHistory(materialId);

      setHistory(data.history);
    } catch (error) {
      console.log(error);

      alert("Failed To Fetch History");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      field: "type",
      headerName: "Type",

      render: (row) =>
        row.type === "IN" ? (
          <Chip label="IN" color="success" size="small" />
        ) : (
          <Chip label="OUT" color="error" size="small" />
        ),
    },

    {
      field: "quantity",
      headerName: "Quantity",
    },

    {
      field: "site_name",
      headerName: "Site",

      render: (row) => row.site_name || "-",
    },

    {
      field: "purpose",
      headerName: "Purpose",

      render: (row) => row.purpose || "-",
    },

    {
      field: "requested_by",
      headerName: "Requested By",

      render: (row) => row.requested_by || "-",
    },
    {
      field: "date",
      headerName: "Date",

      render: (row) => new Date(row.date).toLocaleString(),
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <PageHeader title="Stock History" />

      <DataTable columns={columns} rows={history} />
    </>
  );
};

export default StockHistory;
