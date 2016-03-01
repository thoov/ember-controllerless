import Ember from 'ember';
import RouteContext from 'ember-controllerless/route-context';

export default RouteContext.extend({
  model() {
    return { foo: 'hello world' };
  },

  actions: {
    submit() {
      this.updateModel({foo: 'good bye world'})
    }
  }
})
