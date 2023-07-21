import { $authHost, $host } from "./index";

export const createCatalog = async (catalog) => {
  const { data } = await $authHost.post("/api/catalog", catalog);

  return data;
};

export const fetchCatalogs = async () => {
  const { data } = await $host.get("/api/catalog");

  return data;
};

export const editCatalog = async (id, name) => {
  const { data } = await $authHost.patch("/api/catalog/" + id, { name });

  return data;
};

export const removeCatalog = async (id) => {
  const { data } = await $authHost.delete("/api/catalog/" + id);

  return data;
};

export const fetchCatalogProperties = async (id) => {
  const { data } = await $host.get("/api/property/" + id);

  return data;
};

export const addCatalogProperty = async (catalogId, properties) => {
  const { data } = await $authHost.post(
    "/api/catalog/" + catalogId,
    properties
  );

  return data;
};

export const removeCatalogProperty = async (catalogId, propertyId) => {
  const { data } = await $authHost.delete("/api/catalog-property", {
    data: {
      catalogId,
      propertyId,
    },
  });

  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("/api/brand", brand);

  return data;
};

export const editBrand = async (id, name) => {
  const { data } = await $authHost.patch("/api/brand/" + id, { name });

  return data;
};

export const removeBrand = async (id) => {
  const { data } = await $authHost.delete("/api/brand/" + id);

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
  limit = 9999999,
  search,
  filter = {}
) => {
  const { data } = await $host.get("/api/product", {
    params: {
      catalogId,
      brandId,
      page,
      limit,
      search,
      ...filter,
    },
  });

  return data;
};

export const fetchOneProduct = async (id) => {
  const { data } = await $host.get("/api/product/" + id);

  return data;
};

export const createProperty = async (property) => {
  const { data } = await $authHost.post("/api/property", property);

  return data;
};

export const editProperty = async (id, properties) => {
  const { data } = await $authHost.patch("/api/property/" + id, properties);

  return data;
};

export const removeProperty = async (id) => {
  const { data } = await $authHost.delete("/api/property/" + id);

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

export const editColor = async (id, color) => {
  const { data } = await $authHost.patch("/api/color/" + id, color);

  return data;
};

export const deleteColor = async (id) => {
  const { data } = await $authHost.delete("/api/color/" + id);

  return data;
};

export const addOrder = async (order) => {
  const { data } = await $host.post("/api/order", order);

  return data;
};

export const fetchOrders = async () => {
  const { data } = await $authHost.get("/api/order");

  return data;
};

export const fetchOrdersProduct = async (id) => {
  const { data } = await $authHost.get("/api/order-product/" + id);

  return data;
};

export const finishOrder = async (id) => {
  const { data } = await $authHost.post("/api/order/" + id);

  return data;
};
