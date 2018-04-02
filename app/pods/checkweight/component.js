import Component from '@ember/component';
export default Component.extend({
  tab: 2,
  init() {
    this._super(...arguments);
    let checkArray = [
      { id: 2, name: '客户' },
      { id: 3, name: '联系人' },
      { id: 4, name: '销售线索' }
    ];
    this.set('checkArray', checkArray);
  },
  didInsertElement() {
    this._super(...arguments);
  },
  actions: {}
});