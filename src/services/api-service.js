import TokenService from "../services/token-service";
import config from "../config";

const ApiService = {
  /*getDocs() {
    return new Promise((resolve, reject) => 
      resolve ({
        original: 
        [{
          name: 'Doc1',
          text: 'asjfbakjsbfkajsbfkajsbnfkjansf',
          id: 865
        }],
        edited: 
        [{
          name: 'Doc2',
          text: 'asjfbakjsbfkajsbfkajsbnfkjansf',
          id: 24634
        }],
        approved: 
        [{
          name: 'Doc3',
          text: 'asjfbakjsbfkajsbfkajsbnfkjansf',
          id: 2362
        }]}))
  },
  getTemplates() {
    return new Promise((resolve, reject) => 
      resolve ([
        {
          name: 'Xianxia',
          substitutions: [
            {
              from: 'pinyin1',
              to: 'nascent soul'
            },
            {
              from: 'pinyin2',
              to: 'golden core'
            }
          ],
          id: 827367
        },
        {
          name: 'Funny Subs',
          substitutions: [
            {
              from: 'he',
              to: 'she'
            },
            {
              from: 'him',
              to: 'her'
            }
          ],
          id: 17869
        },
      ]))
  },
  addDoc(body) {
    console.log(body);
    return new Promise((resolve, reject) => resolve ({
      }))
  },
  substitute(body) {
    console.log(body);
    return new Promise((resolve, reject) => resolve ({
      }))
  },
  judge(body) {
    console.log(body);
    return new Promise((resolve, reject) => resolve ({
      }))
  },*/
  getDocs() {
    return fetch(`${config.API_ENDPOINT}/docs`, {
      headers: {}
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  getTemplates() {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  addDoc(body) {
    return fetch(`${config.API_ENDPOINT}/docs`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  substitute(body) {
    return fetch(`${config.API_ENDPOINT}/templates`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
  judge(body) {
    return fetch(`${config.API_ENDPOINT}/judge`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(body)
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }
};

export default ApiService;
