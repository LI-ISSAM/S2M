import axios from "axios";

export default {
  getRescheduleInquiries(page = 1, limit = 4, cardNumber = "", rnn = "") {
    const params = {
      _page: page,
      _limit: limit,
    };

    if (cardNumber) {
      params.cardNumber_like = cardNumber;
    }
    if (rnn) {
      params.rnn_like = rnn;
    }

    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "rescheduleInquiries", {
          params: params,
        })
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  addRescheduleInquiry(rescheduleInquiry) {
    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.VUE_APP_INIT_BACKEND_URL + "rescheduleInquiries",
          rescheduleInquiry,
        )
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  getRescheduleInquiry(rescheduleInquiryId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_INIT_BACKEND_URL +
            "rescheduleInquiries" +
            "/" +
            rescheduleInquiryId,
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  updateRescheduleInquiry(rescheduleInquiry) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          process.env.VUE_APP_INIT_BACKEND_URL +
            "rescheduleInquiries/" +
            rescheduleInquiry.id,
          rescheduleInquiry,
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  deleteRescheduleInquiry(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(
          process.env.VUE_APP_INIT_BACKEND_URL + "rescheduleInquiries/" + id,
        )
        .then((resp) => resolve(resp))
        .catch((err) => reject(err));
    });
  },

  exportCsv(cardNumber = "", rnn = "") {
    const params = {};
    if (cardNumber) params.cardNumber_like = cardNumber;
    if (rnn) params.rnn_like = rnn;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "rescheduleInquiries/export/csv",
      {
        params,
        responseType: "blob",
      },
    );
  },

  exportPdf(cardNumber = "", rnn = "") {
    const params = {};
    if (cardNumber) params.cardNumber_like = cardNumber;
    if (rnn) params.rnn_like = rnn;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "rescheduleInquiries/export/pdf",
      {
        params,
        responseType: "blob",
      },
    );
  },
};
