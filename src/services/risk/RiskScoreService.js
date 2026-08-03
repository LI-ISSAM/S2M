import axios from "axios";

export default {
  getRiskScore(customerId, includeAi = true) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_INIT_BACKEND_URL +
            "customers/" +
            customerId +
            "/risk-score",
          {
            params: { ai: includeAi },
          },
        )
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err.response ? err.response.data : err);
        });
    });
  },
};
