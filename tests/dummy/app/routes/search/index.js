import users from '../../models/users';
import RouteContext from 'ember-controllerless/route-context';


export default RouteContext.extend({
  // queryParams: ['query'],

  model() { return users; },

  actions: {
    search(query) {
      const filter = this.state.model.filter(i => i.firstName && new RegExp(query, 'i').test(i.firstName));
      this.updateModel(filter);
    }
  }
});
