import { $authHost, $host } from "./index";

export const createCatalog = async (catalog) => {
  const { data } = await $authHost.post("/api/catalog", catalog);

  return data;
};

export const fetchCatalogs = async () => {
  const { data } = await $host.get("/api/catalog");

  return data;
};

export const fetchCatalogProperties = async (id) => {
  const { data } = await $host.get("/api/property/" + id);

  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("/api/brand", brand);

  return data;
};

export const fetchBrands = async () => {
  const { data } = await $host.get("/api/brand");

  return data;
};

export const createProduct = async (product) => {
  const { data } = await $authHost.post("/api/product", product);

  return data;
};

export const editProduct = async (id, product) => {
  const { data } = await $authHost.patch("/api/product/" + id, product);

  return data;
};

export const removeProduct = async (id) => {
  const { data } = await $authHost.delete("/api/product/" + id);

  return data;
};

export const fetchProducts = async (
  catalogId,
  brandId,
  page,
  limit = 10,
  filter = {}
) => {
  const { data } = await $host.get("/api/product", {
    params: {
      catalogId,
      brandId,
      page,
      limit,
      minPrice: filter.minPrice,
      maxPrice: filter.maxPrice,
    },
  });

  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("/api/product/" + id);

  return data;
};

export const createProperty = async (property) => {
  const { data } = await $host.post("/api/property", property);

  return data;
};

export const fetchProperties = async () => {
  const { data } = await $host.get("/api/property");

  return data;
};

export const createColor = async (color) => {
  const { data } = await $authHost.post("/api/color", color);

  return data;
};
