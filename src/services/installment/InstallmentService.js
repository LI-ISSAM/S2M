import axios from "axios";

export default {
  getInstallments(page = 1, limit = 4, customerName = "", customerEmail = "") {
    const params = {
      _page: page,
      _limit: limit,
    };

    if (customerName) {
      params.customerName = customerName;
    }
    if (customerEmail) {
      params.customerEmail = customerEmail;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "installments", {
          params: params,
        })
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  // Récupère toutes les échéances d'un client (non paginé), utile pour construire le calendrier mensuel
  getInstallmentsByCustomer(customerId) {
    const params = {
      _page: 1,
      _limit: 1000,
    };

    if (customerId) {
      params.customerId = customerId;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "installments", {
          params: params,
        })
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  // Récupère toutes les échéances (non paginé), utile pour savoir quels clients ont déjà une échéance
  getAllInstallmentsRaw() {
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "installments", {
          params: { _page: 1, _limit: 1000 },
        })
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  addInstallment(installment) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.VUE_APP_INIT_BACKEND_URL + "installments",
          installment,
        )
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  getInstallment(installmentId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_INIT_BACKEND_URL +
            "installments" +
            "/" +
            installmentId,
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  updateInstallment(installment) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          process.env.VUE_APP_INIT_BACKEND_URL +
            "installments/" +
            installment.id,
          installment,
        )
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  deleteInstallment(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(process.env.VUE_APP_INIT_BACKEND_URL + "installments/" + id)
        .then((resp) => resolve(resp))
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  exportCsv(customerName = "", customerEmail = "") {
    const params = {};
    if (customerName) params.customerName = customerName;
    if (customerEmail) params.customerEmail = customerEmail;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "installments/export/csv",
      {
        params,
        responseType: "blob",
      },
    );
  },

  exportPdf(customerName = "", customerEmail = "") {
    const params = {};
    if (customerName) params.customerName = customerName;
    if (customerEmail) params.customerEmail = customerEmail;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "installments/export/pdf",
      {
        params,
        responseType: "blob",
      },
    );
  },
};
