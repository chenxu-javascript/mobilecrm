import Route from '@ember/routing/route';
import $ from 'jquery';
export default Route.extend({
  model() {
  },
  afterModel() {
    $('body>.preload').remove();
  }
});
