import axios from 'axios'

export default {
    getForceClosureInquiries(page = 1, limit = 4, cardNumber = '', rnn = '') {

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
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'forceClosureInquiries',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

    addForceClosureInquiry(forceClosureInquiry) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'forceClosureInquiries', forceClosureInquiry)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getForceClosureInquiry(forceClosureInquiryId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'forceClosureInquiries'+'/' + forceClosureInquiryId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateForceClosureInquiry(forceClosureInquiry) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'forceClosureInquiries/'+forceClosureInquiry.id, forceClosureInquiry)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    deleteForceClosureInquiry(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'forceClosureInquiries/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err))
            })
    }
}