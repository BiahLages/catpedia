const CatContext = {
  catEndpoint: () => `${Api.baseUrl}/catpedia`,
  cat: () => CatContext.catEndpoint(),
  catById: (id) => `${CatContext.catEndpoint()}/${id}`,
};

export const Api = {
  baseUrl: "http://localhost:8000",
  ...CatContext,
};
