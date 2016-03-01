import Ember from 'ember';
import RouteContext from 'ember-controllerless/route-context';

export default RouteContext.extend({
  model() {
    return new Promise(function(resolve) {
      resolve(Ember.A([1,2,3]));
    });
  },

  actions: {
    submit(data) {
      debugger;
      this.updateModel({foo: 'good bye world'})
    }
  }
});
