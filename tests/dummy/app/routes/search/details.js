import users from '../../models/users';
import RouteContext from 'ember-controllerless/route-context';

export default RouteContext.extend({
  model(params) {
    return users.find(user => user.id === Number(params.id));
  }
});
