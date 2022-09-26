export const baseURL = 'http://793a-105-112-37-251.ngrok.io/auth';
// import {MMKVLoader} from 'react-native-mmkv-storage';

export const useLogin = async (email, password) => {
  try {
    const body = JSON.stringify({email, password});
    const response = await fetch(`${baseURL}/signin`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body, // body data type must match "Content-Type" header
    });
    const data = await response.json();

    return data;
  } catch (err) {
    return {
      statusCode: 400,
      error: {
        message: err.message,
      },
    };
  }
};

//handle registration
export const userRegister = async regInfo => {
  try {
    const response = await fetch(`${baseURL}/signup`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(regInfo), // body data type must match "Content-Type" header
    });
    const data = await response.json();

    return data;
  } catch (err) {
    return {
      statusCode: 400,
      message: err.message,
    };
  }
};

export const getUser = async id => {
  try {
    const response = await fetch(`${baseURL}/user/${id}`);

    return await response.json();
  } catch (err) {
    return {
      statusCode: 400,
      error: {message: err.message},
    };
  }
};

//reset
export const initPasswordReset = async email => {
  const body = JSON.stringify({email});

  try {
    const response = await fetch(`${baseURL}/forgot`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body, // body data type must match "Content-Type" header
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
