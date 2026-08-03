import axios from "axios";

export default {
  getOffers(page = 1, limit = 4, name = "", programId = "") {
    const params = {
      _page: page,
      _limit: limit,
    };

    if (name) {
      params.name_like = name;
    }
    if (programId) {
      params.programId = programId;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "offers", {
          params: params,
        })
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  getDefaultOffer(programId, excludeId = "") {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "offers", {
          params: { _page: 1, _limit: 1000 },
        })
        .then((list) => {
          let data = list.data || [];
          data = data.filter(
            (o) =>
              String(o.programId) === String(programId) &&
              o.isDefault === true &&
              String(o.id) !== String(excludeId),
          );
          resolve(data);
        })
        .catch((err) => reject(err));
    });
  },

  addOffer(offer) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_INIT_BACKEND_URL + "offers", offer)
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  getOffer(offerId) {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "offers" + "/" + offerId)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  updateOffer(offer) {
    return new Promise((resolve, reject) => {
      axios
        .put(process.env.VUE_APP_INIT_BACKEND_URL + "offers/" + offer.id, offer)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  deleteOffer(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(process.env.VUE_APP_INIT_BACKEND_URL + "offers/" + id)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  },

  exportCsv(name = "", programId = "") {
    const params = {};
    if (name) params.name_like = name;
    if (programId) params.programId = programId;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "offers/export/csv",
      {
        params,
        responseType: "blob",
      },
    );
  },

  exportPdf(name = "", programId = "") {
    const params = {};
    if (name) params.name_like = name;
    if (programId) params.programId = programId;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "offers/export/pdf",
      {
        params,
        responseType: "blob",
      },
    );
  },
};
