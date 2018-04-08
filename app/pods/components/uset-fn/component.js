import Component from '@ember/component';
import computed from 'ember-computed-decorators';
export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('ve', '');
    this.set('name', ['x', 's', 'd', 's', 'd']);
  },
  // accum("abcd");    // "A-Bb-Ccc-Dddd"
  // accum("RqaEzty"); // "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"
  // accum("cwAt");    // "C-Ww-Aaa-Tttt"
  @computed('ve')
  result() {
    let ve = this.get('ve');
    if (!ve) return;
    let array = ve.split('');
    array = array.map((o, i) => {
      return o.toUpperCase() + o.toLowerCase().repeat(i);
    });
    return array.join('-');
  },
  @computed('a', 'b')
  sum(a, b) {
    a = Number(a);
    b = Number(b);
    if (a == b) {
      return a;
    }
    if (a > b) {
      [a, b] = [b, a];
    }
    let re = 0;
    for (a; a <= b; a++) {
      re = re + a;
    }
    return re;
  },
  @computed('name')
  names(name=[]) {
    let len = name.length,
      reselt = '',
      lss = 'likes this',
      ls = 'like this';
    switch (len) {
    case 0:
      reselt = `no one ${lss}`;
      break;
    case 1:
      reselt = `${name[len - 1]} ${ls}`;
      break;
    case 2:
      reselt = `${name[0]} and ${name[1]} ${ls}`;
      break;
    case 3:
      reselt = `${name[0]}, ${name[1]} and ${name[2]} ${ls}`;
      break;
    default:
      reselt = `${name[0]}, ${name[1]} and ${len - 2} others ${ls}`;
      break;
    }
    return reselt;
  },
  actions: {}
});
