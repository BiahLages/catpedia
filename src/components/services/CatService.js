import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

export const CatService = {
    getAll: () => fetch(Api.cat(), { method: "GET" }).then(parseResponse),
    getById: (id) => fetch(Api.catById(id), { method: "GET" }).then(parseResponse),
    create: (cat) => fetch(Api.cat(), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        mode: "cors",
        body: JSON.stringify(cat),
    }).then(parseResponse)
};