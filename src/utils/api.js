import axios from "axios";
const baseURL = "https://nlapi.expert.ai";
const language = "en";


const getToken = async () => {

    let obj = JSON.parse(localStorage.getItem("key"));
    const time_spend = (new Date().getTime() - obj?.timestamp) / 1000;
    if (obj === null || time_spend > 3600) {
        return axios.post(`https://developer.expert.ai/oauth2/token/`, {
            "username": "sagarbansal099@gmail.com",
            "password": "h2kvK9hNHJVj!E2"
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => {
            if (res.status === 200) {
                const t = "Bearer " + res.data
                var object = { token: t, timestamp: new Date().getTime() }
                localStorage.setItem("key", JSON.stringify(object));
                return t;
            }
        });
    } else {
        return obj.token;
    }
};

export const getKeyElements = async (text) => {
    return getToken().then(t => {
        const payload = {
            document: {
                text: text
            }
        }
        const headers = {
            "accept": "application/json",
            "Authorization": t,
            "Content-Type": "application/json; charset=utf-8"
        }
        return axios.post(`${baseURL}/v2/analyze/standard/${language}/relevants`, payload, { headers: headers })
            .then(res => {
                return res.data['data'];
            }).catch(err => console.log(err));
    });
}


export const getSentimentAnalysis = (text) => {
    return getToken().then(t => {
        const payload = {
            document: {
                text: text
            }
        }
        const headers = {
            "accept": "application/json",
            "Authorization": t,
            "Content-Type": "application/json; charset=utf-8"
        }
        return axios.post(`${baseURL}/v2/analyze/standard/${language}/sentiment`, payload, { headers: headers })
            .then(r => {
                return r.data.data.sentiment;
            })
            .catch(er => console.error(er));
    }).catch(err => console.error(err));
};

export const getHateSpeechAnalysis = (text) => {
    return getToken().then(t => {
        const payload = {
            document: {
                text: text
            }
        }
        const headers = {
            "accept": "application/json",
            "Authorization": t,
            "Content-Type": "application/json; charset=utf-8"
        }
        return axios.post(`${baseURL}/v2/detect/hate-speech/${language}`, payload, { headers: headers })
            .then(r => {
                return r.data.data;
            })
            .catch(er => console.error(er));
    }).catch(err => console.error(err));
};


export const getBehaviouralAnalysis = (text) => {
    return getToken().then(t => {
        const payload = {
            document: {
                text: text
            }
        }
        const headers = {
            "accept": "application/json",
            "Authorization": t,
            "Content-Type": "application/json; charset=utf-8"
        }
        return axios.post(`${baseURL}/v2/categorize/behavioral-traits/${language}`, payload, { headers: headers })
            .then(r => {
                const behavioral = r.data.data;
                return behavioral;
            })
            .catch(er => console.error(er));
    }).catch(err => console.error(err));
};

