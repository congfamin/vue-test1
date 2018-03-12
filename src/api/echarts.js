import fetch from '@/utils/fetch';

export function getDashboard(params) {
    console.log("我经过了api下的echarts.js");
    return fetch({
        url: '/echarts/dashboard',
        method: 'get',
        params: params
    })
}

export function getShuntElctricityFive(params) {
    return fetch({
        url: '/echarts/ShuntElctricityFive',
        method: 'get',
        params: params
    })
}