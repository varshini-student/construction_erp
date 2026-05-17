import API from "./axios";

// Get All Materials
export const getMaterials = async () => {
  const response = await API.get("/api/v1/materials/");
  return response.data;
};
// Get Single Material
export const getMaterialById =
  async (id) => {
    const response =
      await API.get(
        `/api/v1/materials/${id}`
      );

    return response.data;
  };
// Create Material
export const createMaterial = async (data) => {
  const response = await API.post(
    "/api/v1/materials/",
    data
  );

  return response.data;
};

// Update Material
export const updateMaterial = async (
  id,
  data
) => {
  const response = await API.put(
    `/api/v1/materials/${id}`,
    data
  );

  return response.data;
};

// Delete Material
export const deleteMaterial = async (id) => {
  const response = await API.delete(
    `/api/v1/materials/${id}`
  );

  return response.data;
};