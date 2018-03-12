import fetch from '@/utils/fetch';

export function getMonitorPoint() {
    console.log("我是getMonitorPoint动作");
    return fetch({
        url: '/getMonitorPoint',
        method: 'get'
    });
}