import axios from 'axios'

export default {
    getFreezingInquiries(page = 1, limit = 4, cardNumber = '', rnn = '') {

        const params = {
            _page : page,
            _limit : limit
        };

        if (cardNumber) {
            params.cardNumber_like = cardNumber;
        }
        if (rnn) {
            params.rnn_like = rnn;
        }

        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'freezingInquiries',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

    addFreezingInquiry(freezingInquiry) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'freezingInquiries', freezingInquiry)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getFreezingInquiry(freezingInquiryId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'freezingInquiries'+'/' + freezingInquiryId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateFreezingInquiry(freezingInquiry) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'freezingInquiries/'+freezingInquiry.id, freezingInquiry)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    deleteFreezingInquiry(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'freezingInquiries/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err))
            })
    }
}