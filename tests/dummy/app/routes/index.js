import RouteContext from 'ember-controllerless/route-context';

export default RouteContext.extend({
  actions: {
    search(query) {
      this.set('state.query', query);
      this.refresh();
    }
  }
});
