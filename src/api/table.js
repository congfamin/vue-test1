import fetch from '@/utils/fetch';

export function getReportOne(params) {
    return fetch({
        url: '/table/reportOne',
        method: 'get',
        params: params
    });
}

export function getReportEight(params) {
    return fetch({
        url: '/table/reportEight',
        method: 'get',
        params: params
    })
}

export function getReportNine(params) {
    return fetch({
        url: '/table/reportNine',
        method: 'get',
        params: params
    })
}

export function getReportTen(params) {
    return fetch({
        url: '/table/reportTen',
        method: 'get',
        params: params
    })
}

export function getReportEleven(params) {
    return fetch({
        url: '/table/reportEleven',
        method: 'get',
        params: params
    })
}

export function getPointTwo(params) {
    return fetch({
        url: '/table/pointTwo',
        method: 'get',
        params: params
    })
}

export function getPointThree(params) {
    return fetch({
        url: '/table/pointThree',
        method: 'get',
        params: params
    })
}

export function getPointFour(params) {
    return fetch({
        url: '/table/pointFour',
        method: 'get',
        params: params
    })
}

export function getPointFive(params) {
    return fetch({
        url: '/table/pointFive',
        method: 'get',
        params: params
    })
}

export function getPointSix(params) {
    return fetch({
        url: '/table/pointSix',
        method: 'get',
        params: params
    })
}

export function getPointSeven(params) {
    return fetch({
        url: '/table/pointSeven',
        method: 'get',
        params: params
    })
}
// 用电分析
export function getAnalysisFour(params) {
    return fetch({
        url: '/table/analysisFour',
        method: 'get',
        params: params
    })
}

// 设备信息
export function getShuntElectricitySix(params) {
    return fetch({
        url: '/table/ShuntElectricitySix',
        method: 'get',
        params: params
    })
}