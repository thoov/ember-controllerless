import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

const { getOwner, get, computed } = Ember;

/*
  TODO:

  * Stop setup & reset controller events by overriding setup
    https://github.com/emberjs/ember.js/blob/v2.9.0-beta.5/packages/ember-routing/lib/system/route.js#L1210-L1266

*/
export default Ember.Route.extend({
  /*
    Setup method -> controllerFor

    We override the controllerFor method to return a
    proxy controller which proxies to the route
  */
  state: stateFor('route-state', '__stateKey'),

  /*
    TODO: Look into adding this behavior to ember-state-services
  */
  __stateKey: computed('routeName', function() {
    return Ember.Object.create({ routeName: get(this, 'routeName') });
  }),

  controllerFor(controllerName /*, _skipAssert*/) {
    const owner = getOwner(this);
    const fullName = `controller:${controllerName}`;

    if (owner.lookup(fullName)) {
      return owner.lookup(fullName);
    }

    const proxyController = Ember.ObjectProxy.extend({
      content: this, // We forward all requests to the route
      actions: get(this, 'actions'), // TODO look into this (this is because it does target.actions and not target.get('actions'))
      send() {
        get(this, 'content').send(...arguments);
      }
    });

    owner.register(fullName, proxyController);
    return owner.lookup(fullName);
  }
});
