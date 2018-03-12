const getters = {
  sidebar: state => state.app.sidebar,
  dialogFormVisible: state => state.app.dialogFormVisible,
  detailShow: state => state.app.detailShow,
  dmPoints: state => state.app.dmPoints,
  warnValue: state => state.app.warnValue,
  monitoringPoint: state => state.app.monitoringPoint,
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}

export default getters