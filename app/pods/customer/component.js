import Component from '@ember/component';
import computed, { observes, on } from 'ember-computed-decorators';
import { debounce } from 'ember-run-decorators';
import { queryParams } from 'boss-qyapp-common/utils/decorators';
import { bsGetJSON, bsSetTitle } from 'fe/models/utils';
import { task } from 'ember-concurrency';
export default Component.extend({
  url: '/sell/membership-act-queryListParams',
  @on('init')
  @observes('tab')
  async requestParams() {
    bsSetTitle('客户列表');
    this.set('page', 1);
    this.set('filterData', {});
    this.set('sort', '');
    this.set('keyword', '');
    this.set('pagebar', {});
    this.set('list', []);
    let result = await this.get('getparams').perform();
    if (result.state) {
      this.set('queryVars', result.data);
    }
  },
  getparams: task(function*() {
    let stage = this.get('tab');
    return yield bsGetJSON(this.get('url'), { stage });
  }).drop(),
  didInsertElement() {
    this._super(...arguments);
  },
  actions: {}
});