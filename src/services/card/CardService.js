import axios from 'axios'

export default {
    getCards(page = 1, limit = 4, cardNumber = '', customerName = '') {

        const params = {
            _page : page,
            _limit : limit
        };

        if (cardNumber) {
            params.cardNumber_like = cardNumber;
        }
        if (customerName) {
            params.customerName_like = customerName;
        }

        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL+'cards',{
                        params : params
                    })
                    .then(list => resolve(list)).catch(err => reject(err))
            })
    },

    addCard(card) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL +'cards', card)
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response.data);
                })

            })
    },

    getCard(cardId) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .get(process.env.VUE_APP_INIT_BACKEND_URL +'cards'+'/' + cardId)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    updateCard(card) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .put(process.env.VUE_APP_INIT_BACKEND_URL +'cards/'+card.id, card)
                    .then(response => resolve(response)).catch(err => reject(err))

            })
    },

    deleteCard(id) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .delete(process.env.VUE_APP_INIT_BACKEND_URL +'cards/'+ id)
                    .then(resp => resolve(resp)).catch(err => reject(err))
            })
    },

    exportCsv(cardNumber = '', customerName = '') {
    const params = {};
    if (cardNumber) params.cardNumber_like = cardNumber;
    if (customerName) params.customerName_like = customerName;
 
    return axios.get(process.env.VUE_APP_INIT_BACKEND_URL + 'cards/export/csv', {
        params,
        responseType: 'blob' 
    });
},
 
exportPdf(cardNumber = '', customerName = '') {
    const params = {};
    if (cardNumber) params.cardNumber_like = cardNumber;
    if (customerName) params.customerName_like = customerName;
 
    return axios.get(process.env.VUE_APP_INIT_BACKEND_URL + 'cards/export/pdf', {
        params,
        responseType: 'blob'
    });
}
}