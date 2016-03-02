import Ember from 'ember';
import RouteContext from 'ember-controllerless/route-context';

export default RouteContext.extend({
  // queryParams: ['query'],

  model() {
    return Ember.A([
      { firstName: 'Bill', lastName: 'Smith' },
      { firstName: 'James', lastName: 'Jones' },
      { firstName: 'Bob', lastName: 'Bonds' }
    ]);
  },

  actions: {
    search(query) {
      const filter = this.state.model.filter(i => i.firstName.indexOf(query) !== -1);
      this.updateModel(filter);
    }
  }
});
