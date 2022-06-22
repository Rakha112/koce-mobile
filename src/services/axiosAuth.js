import axios from 'axios';
import EncryptedStorage from 'react-native-encrypted-storage';
export const axiosAuth = axios.create();
axios.defaults.withCredentials = true;

//function untuk menyimpan data ke user session
const storeUserSession = async (
  accessToken,
  refreshToken,
  logedIn,
  username,
) => {
  try {
    await EncryptedStorage.setItem(
      'user_session',
      JSON.stringify({
        refreshToken: refreshToken,
        accessToken: accessToken,
        login: logedIn,
        username: username,
      }),
    );
  } catch (error) {
    console.log(error);
  }
};
// interceptor untuk request
// request ini dikirimkan dulu sebelum original request
axiosAuth.interceptors.request.use(
  async config => {
    // mengambil data user session dari storage
    const session = await EncryptedStorage.getItem('user_session');
    // Jika session ada
    if (session !== undefined && session !== null) {
      // accessToken
      const accessToken = JSON.parse(session).accessToken;
      // username
      const username = JSON.parse(session).username;
      // Menset Header authorization yang akan dikirim ke server berisi Bearer AceessToken
      config.headers.authorization = 'Bearer ' + accessToken;
      // Menset Parameter yang akan dikirim ke server berisi Bearer AceessToken
      config.params = {...config.params, username: username};
      return config;
    }
  },
  error => {
    Promise.reject(error);
  },
);

// interceptor untuk response
axiosAuth.interceptors.response.use(
  response => {
    // Mengembalikan original response jika tidak ada error
    return response;
  },
  //jika menerima error status dari server
  async error => {
    // mengambil data user session dari storage
    const session = await EncryptedStorage.getItem('user_session');
    // Jika session ada
    if (session !== undefined && session !== null) {
      const originalRequest = error.config;
      // Jika menerima error status code 401 artinya accessToken sudah expired
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Memvalidasi refreshToken
        return axios
          .get('http://192.168.11.149:3001/refreshToken', {
            headers: {
              Authorization: `Bearer ${JSON.parse(session).refreshToken}`,
            },
            params: {username: JSON.parse(session).username},
          })
          .then(res => {
            // Jika refreshToken masih valid akan membuat newAccessToken dan menerima status code 201
            if (res.status === 201) {
              // Menerima newAccessToken
              const newAccessToken = res.headers.authorization.split(' ')[1];
              // Memperbarui headers authprization
              axios.defaults.headers.common.authorization =
                'Bearer ' + newAccessToken;
              // Membuat headers authorization pada error
              error.config.headers.authorization = 'Bearer ' + newAccessToken;
              // Memperbarui accessToken di storage user session dengan newAccessToken
              storeUserSession(
                newAccessToken,
                JSON.parse(session).refreshToken,
                res.data.loggedIn,
                JSON.parse(session).username,
              );

              // setelah mendapat newAccessToken akan melakukan request ulang
              // dengan menggunakan newAccessToken atau accessToken yang baru diterima
              return axios.request(error.config);
            }
            return Promise.reject(error);
          })
          .catch(err => {
            // refresh token sudah expired
            if (err.response.status === 401) {
              // menghapus storage user session
              EncryptedStorage.removeItem('user_session');
            }
          });
      }
    }
    return Promise.reject(error);
  },
);
