import axios from "axios";

export default {
  scanIdentityDocument(file) {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      axios
        .post(
          process.env.VUE_APP_INIT_BACKEND_URL + "kyc-extraction/scan",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err.response ? err.response.data : err));
    });
  },
};
