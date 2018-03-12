import Mock from 'mockjs';
import loginAPI from './login';
import tableAPI from './table';
import echartsAPI from './echarts';
import monitorPointAPI from './monitorpoint';

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByUserName);
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo);

// 监测点相关
Mock.mock(/\/getMonitorPoint/, 'get', monitorPointAPI.getMonitorPoint);

// 表格相关
// 统计报表
Mock.mock(/\/table\/pointTwo/, 'get', tableAPI.getPointTwo);
Mock.mock(/\/table\/pointThree/, 'get', tableAPI.getPointThree);
Mock.mock(/\/table\/pointFour/, 'get', tableAPI.getPointFour);
Mock.mock(/\/table\/pointFive/, 'get', tableAPI.getPointFive);
Mock.mock(/\/table\/pointSix/, 'get', tableAPI.getPointSix);
Mock.mock(/\/table\/pointSeven/, 'get', tableAPI.getPointSeven);
Mock.mock(/\/table\/reportOne/, 'get', tableAPI.getReportOne);
Mock.mock(/\/table\/reportEight/, 'get', tableAPI.getReportEight);
Mock.mock(/\/table\/reportNine/, 'get', tableAPI.getReportNine);
Mock.mock(/\/table\/reportTen/, 'get', tableAPI.getReportTen);
Mock.mock(/\/table\/reportEleven/, 'get', tableAPI.getReportEleven);
// 用电分析
Mock.mock(/\/table\/analysisFour/, 'get', tableAPI.getAnalysisFour);
// 设备信息
Mock.mock(/\/table\/ShuntElectricitySix/, 'get', tableAPI.getShuntElectricitySix);

// 图表相关
// 总体用能
Mock.mock(/\/echarts\/dashboard/, 'get', echartsAPI.getDashboard);
// 设备信息
Mock.mock(/\/echarts\/ShuntElctricityFive/, 'get', echartsAPI.getShuntElctricityFive);

export default Mock;