import axios from 'axios'

export default function useApiController() {
  const apiDatabase = axios.create({
    baseURL: '../?rest_route=/oxyframe-style-manager/v2/',
    // baseURL: 'https://oxyframe-plugin.test/wp-json/oxyframe/v1/',
    withCredentials: false,
    headers: {
      'content-type': 'application/json',
      'X-WP-Nonce': window.wpApiSettings.nonce,
    },
  })

  const getSettings = () => {
    return apiDatabase.get('/sm')
  }
  const saveSettings = (data) => {
    return apiDatabase.post('/sm', data)
  }
  // const fnCall = (data) => {
  //   return apiDatabase.get('/fn', data)
  // }

  return {
    getSettings,
    saveSettings,
    // fnCall,
  }
}
