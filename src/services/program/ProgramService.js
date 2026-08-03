import axios from "axios";

export default {
  getPrograms(page = 1, limit = 4, name = "") {
    const params = {
      _page: page,
      _limit: limit,
    };

    if (name) {
      params.name_like = name;
    }
    return new Promise((resolve, reject) => {
      axios
        .get(process.env.VUE_APP_INIT_BACKEND_URL + "programs", {
          params: params,
        })
        .then((list) => resolve(list))
        .catch((err) => reject(err));
    });
  },

  addProgram(program) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_INIT_BACKEND_URL + "programs", program)
        .then((response) => resolve(response))
        .catch((err) => {
          reject(err.response.data);
        });
    });
  },

  getProgram(programId) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          process.env.VUE_APP_INIT_BACKEND_URL + "programs" + "/" + programId,
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  },

  updateProgram(program) {
    return new Promise((resolve, reject) => {
      axios
        .put(
          process.env.VUE_APP_INIT_BACKEND_URL + "programs/" + program.id,
          program,
        )
        .then((response) => resolve(response))
        .catch((err) => reject(err.response.data));
    });
  },

  deleteProgram(id) {
    return new Promise((resolve, reject) => {
      axios
        .delete(process.env.VUE_APP_INIT_BACKEND_URL + "programs/" + id)
        .then((resp) => resolve(resp))
        .catch((err) => reject(err.response.data));
    });
  },
  exportCsv(name = "") {
    const params = {};
    if (name) params.name_like = name;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "programs/export/csv",
      {
        params,
        responseType: "blob",
      },
    );
  },

  exportPdf(name = "") {
    const params = {};
    if (name) params.name_like = name;

    return axios.get(
      process.env.VUE_APP_INIT_BACKEND_URL + "programs/export/pdf",
      {
        params,
        responseType: "blob",
      },
    );
  },
};
