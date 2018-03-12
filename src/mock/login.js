import { param2Obj } from '@/utils';

const userMap = {
  admin: {
    role: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Admin'
  },
  editor: {
    role: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Editor'
  },
  developer: {
    role: ['develop'],
    token: 'develop',
    introduction: '我是开发',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'developer'
  }
}

export default {
  loginByUserName: config => {
    const { userName } = JSON.parse(config.body);
    console.log(userName);
    // 此处通过split分割登录的邮箱账号从而动态返回用户信息
    return userMap[userName.split('@')[0]];
  },
  getInfo: config => {
    console.log(config.url);
    const { token } = param2Obj(config.url);
    if (userMap[token]) {
      return userMap[token];
    } else {
      return Promise.reject('a');
    }
  },
  logout: () => 'success'
};
