import { useEffect, useState } from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Divider,
  Chip,
} from "@mui/material";

import {
  AccountBalanceWallet,
  ShoppingCart,
} from "@mui/icons-material";

import {
  getTotalExpense,
  getTotalPurchases,
  getRecentPurchases,
} from "../../api/financeApi";

import Loader from "../../components/common/Loader";

const Finance = () => {
  const [financeData, setFinanceData] =
    useState({
      totalExpense: 0,
      totalPurchases: 0,
      recentPurchases: [],
    });

  const [loading, setLoading] =
    useState(true);

  const fetchFinanceData =
    async () => {
      try {
        const expenseData =
          await getTotalExpense();

        const purchaseData =
          await getTotalPurchases();

        const recentData =
          await getRecentPurchases();

        setFinanceData({
          totalExpense:
            expenseData.total_expense ||
            0,

          totalPurchases:
            purchaseData.total_purchases ||
            0,

          recentPurchases:
            recentData || [],
        });
      } catch (error) {
        console.log(error);

        alert(
          "Failed To Load Finance Data"
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFinanceData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        maxWidth: "1200px",
        width: "100%",
      }}
    >
      {/* Heading */}
      <Box
        sx={{
          mb: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
        >
          Finance Dashboard
        </Typography>

        <Typography
          color="text.secondary"
        >
          Track expenses and
          purchase activities
        </Typography>
      </Box>

      {/* Cards */}
      <Grid
        container
        spacing={3}
        sx={{
          mt: 1,
        }}
      >
        {/* Expense Card */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3.5}
        >
          <Card
            elevation={2}
            sx={{
              borderRadius: 5,
              minHeight: 120,
              transition:
                "0.3s",

              "&:hover": {
                transform:
                  "translateY(-5px)",
                boxShadow: 5,
              },
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >
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
                    variant="h6"
                    color="text.secondary"
                  >
                    Total Expense
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={1}
                  >
                    ₹
                    {
                      financeData.totalExpense
                    }
                  </Typography>
                </Box>

                <AccountBalanceWallet
                  sx={{
                    fontSize: 55,
                    color: "#1565c0",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Purchase Card */}
        <Grid
          item
          xs={12}
          sm={6}
          md={3.5}
        >
          <Card
            elevation={2}
            sx={{
              borderRadius: 5,
              minHeight: 120,
              transition:
                "0.3s",

              "&:hover": {
                transform:
                  "translateY(-5px)",
                boxShadow: 5,
              },
            }}
          >
            <CardContent
              sx={{
                p: 3,
              }}
            >
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
                    variant="h6"
                    color="text.secondary"
                  >
                    Total Purchases
                  </Typography>

                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    mt={1}
                  >
                    {
                      financeData.totalPurchases
                    }
                  </Typography>
                </Box>

                <ShoppingCart
                  sx={{
                    fontSize: 55,
                    color: "#2e7d32",
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Purchases */}
      <Paper
        elevation={2}
        sx={{
          p: 5,
          borderRadius: 5,
          mt: 5,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={5}
        >
          Recent Purchases
        </Typography>

        {financeData
          .recentPurchases
          .length === 0 ? (
          <Typography color="text.secondary">
            No Purchases Found
          </Typography>
        ) : (
          financeData.recentPurchases.map(
            (purchase) => (
              <Box
                key={purchase.id}
                sx={{
                  mb: 5,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    fontWeight="600"
                    fontSize={19}
                  >
                    {
                      purchase.material_name
                    }
                  </Typography>

                  <Chip
                    label={`₹${purchase.unit_price}`}
                    color="primary"
                    sx={{
                      fontWeight:
                        "bold",
                      px: 1,
                    }}
                  />
                </Box>

                <Typography
                  color="text.secondary"
                  fontSize={16}
                >
                  Quantity :
                  {
                    purchase.quantity
                  }
                </Typography>

                <Divider
                  sx={{
                    mt: 3,
                  }}
                />
              </Box>
            )
          )
        )}
      </Paper>
    </Box>
  );
};

export default Finance;