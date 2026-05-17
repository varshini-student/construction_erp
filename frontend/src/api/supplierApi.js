import API from "./axios";

// Get All Suppliers
export const getSuppliers =
  async () => {

    const response =
      await API.get(
        "/api/v1/suppliers/"
      );

    return response.data;
  };

// Get Single Supplier
export const getSupplierById =
  async (id) => {

    const response =
      await API.get(
        `/api/v1/suppliers/${id}`
      );

    return response.data;
  };

// Create Supplier
export const createSupplier =
  async (data) => {

    const response =
      await API.post(
        "/api/v1/suppliers/",
        data
      );

    return response.data;
  };

// Update Supplier
export const updateSupplier =
  async (id, data) => {

    const response =
      await API.put(
        `/api/v1/suppliers/${id}`,
        data
      );

    return response.data;
  };

// Deactivate Supplier
export const deleteSupplier =
  async (id) => {

    const response =
      await API.delete(
        `/api/v1/suppliers/${id}`
      );

    return response.data;
  };