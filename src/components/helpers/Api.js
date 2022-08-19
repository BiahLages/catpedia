const CatContext = {
  catEndpoint: () => `${Api.baseUrl}/catpedia`,
  cat: () => CatContext.catEndpoint(),
  catById: (id) => `${CatContext.catEndpoint()}/${id}`,
};

const urls = {
  development: "http://localhost:8000",
  production: "https://fake-api-cat.herokuapp.com/"
}

export const Api = {
  baseUrl: "https://fake-api-cat.herokuapp.com/",
  ...CatContext,
};
