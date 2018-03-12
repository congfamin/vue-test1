import fetch from '@/utils/fetch';

export function login(userName, passWord) {
  console.log("我是api文件夹下的login.js");
  // data是添加到请求体（body）中的， 用于post请求。
  return fetch({
    url: '/login/loginbyemail',
    method: 'post',
    data: {
      userName,
      passWord
    }
  });
}

// params是添加到url的请求字符串中的，用于get请求。
export function getInfo(token) {
  return fetch({
    url: '/user/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return fetch({
    url: '/login/logout',
    method: 'post'
  });
}



