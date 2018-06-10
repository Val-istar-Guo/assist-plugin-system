const identify = value => value
const noop = () => {}
const modifyThingExtendTimeProp = propName => ({ commit }, { value, thing }) =>
  commit('system.modifyThingExtends', {
    time: { ...thing.extends, [propName]: value }
  })

const timeDetail = (propName, label) => ({
  type: 'data',
  name: `${propName}Time`,
  label,
  value: thing => thing.extends.time[propName],
  onChange: modifyThingExtendTimeProp(propName),
  disabled: true,
})


export default {
  name: 'system.normal',
  displayName: '普通事务',

  hooks: {},

  fields: [
    timeDetail('deferUntil', '开始日期'),
    timeDetail('due', '截止日期'),
    timeDetail('create', '创建日期'),
    timeDetail('completed', '完成日期'),
    timeDetail('deleted', '删除日期'),
  ],

  extends: {
    time: {
      // 开始日期
      deferUntil: '',
      // 完成日期
      completed: '',
      // 截止日期
      due: '',
      // 估时（保留字段）
      estimated: '',
    },
  }
};
