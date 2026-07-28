import axios from 'axios'

export default {
    // POST /api/v1/chatbot/ask  { message, history: [{role, content}] }
    ask(message, history = []) {
        return new Promise(
            (resolve, reject) => {
                axios
                    .post(process.env.VUE_APP_INIT_BACKEND_URL + 'chatbot/ask', { message, history })
                    .then(response => resolve(response)).catch(err => {
                    reject(err.response ? err.response.data : err);
                })
            })
    }
}