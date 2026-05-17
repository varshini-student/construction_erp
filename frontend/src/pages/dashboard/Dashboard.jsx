import { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";

import {
  Inventory,
  People,
  ShoppingCart,
  AccountBalance,
} from "@mui/icons-material";

import DataTable from "../../components/common/DataTable";

import { getDashboardData } from "../../api/dashboardApi";

const Dashboard = () => {
  const [dashboardData, setDashboardData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data =
        await getDashboardData();

      setDashboardData(data);
    } catch (error) {
      console.log(
        "Dashboard Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />

        <Typography>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  // Error
  if (!dashboardData) {
    return (
      <Typography color="error">
        Failed to load dashboard data
      </Typography>
    );
  }

  // Dashboard Cards
  const dashboardCards = [
    {
      title: "Materials",

      value:
        dashboardData.total_materials ||
        0,

      icon: (
        <Inventory
          sx={{
            fontSize: 45,
            color: "#1565c0",
          }}
        />
      ),
    },

    {
      title: "Stock",

      value:
        dashboardData.total_stock ||
        0,

      icon: (
        <ShoppingCart
          sx={{
            fontSize: 45,
            color: "#2e7d32",
          }}
        />
      ),
    },

    {
      title: "Expense",

      value: `₹ ${
        dashboardData.total_expense ||
        0
      }`,

      icon: (
        <AccountBalance
          sx={{
            fontSize: 45,
            color: "#ed6c02",
          }}
        />
      ),
    },

    {
      title: "Low Stock",

      value:
        dashboardData
          .low_stock_materials
          ?.length || 0,

      icon: (
        <People
          sx={{
            fontSize: 45,
            color: "#d32f2f",
          }}
        />
      ),
    },
  ];

  // Table Columns
  const purchaseColumns = [
    {
      field: "purchase_id",
      headerName: "Purchase ID",
    },

    {
      field: "material_id",
      headerName: "Material ID",
    },

    {
      field: "quantity",
      headerName: "Quantity",
    },

    {
      field: "total_amount",
      headerName: "Total Amount",
    },

    {
      field: "status",
      headerName: "Status",
    },
  ];

  return (
    <>
      {/* Heading */}
      <Box
        sx={{
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Dashboard
        </Typography>

        <Typography
          color="text.secondary"
        >
          Welcome to Construction
          ERP System
        </Typography>
      </Box>

      {/* Cards */}
      <Grid
        container
        spacing={5}
      >
        {dashboardCards.map(
          (card) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={card.title}
            >
              <Card
                sx={{
                  borderRadius: 5,
                  boxShadow: 2,
                  p: 1.5,
                  minHeight: 140,
                  transition: "0.3s",

                  "&:hover": {
                    transform:
                      "translateY(-6px)",
                    boxShadow: 5,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                    }}
                  >
                    <Box>
                      <Typography
                        color="text.secondary"
                        mb={1}
                      >
                        {card.title}
                      </Typography>

                      <Typography
                        variant="h4"
                        fontWeight="bold"
                      >
                        {card.value}
                      </Typography>
                    </Box>

                    {card.icon}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          )
        )}
      </Grid>

      {/* Recent Purchases */}
      <Box
        sx={{
          mt: 8,
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          Recent Purchases
        </Typography>

        <Card
          sx={{
            borderRadius: 5,
            boxShadow: 2,
            p: 3,
          }}
        >
          <DataTable
            columns={
              purchaseColumns
            }
            rows={
              dashboardData.recent_purchases ||
              []
            }
          />
        </Card>
      </Box>
    </>
  );
};

export default Dashboard;
