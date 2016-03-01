import Ember from 'ember';
import buildRenderOptions from './build-render-options';

const { assert, run } = Ember;

class Controller {
  constructor(args = {}) {
    this.model = args.model;
    this.target = args.target;
  }

  send() {
    this.target.send(...arguments);
  }
}

export default Ember.Route.extend({
  updateModel(model) {
    this.state = new Controller({ model, target: this });
  },

  /*
   * https://github.com/emberjs/ember.js/blob/7587a7d1f9fd94fd20debad0c7477d1d051b35e2/packages/ember-routing/lib/system/route.js#L1165-L1225
   *
   * Override the setup function and remove all controller logic.
   * TODO: add back query params
   *
   * renderTemplate -> render -> buildRenderOptions
   */
  setup(model) {
    this.state = new Controller({ model, target: this });

    if (!this._environment || this._environment.options.shouldRender) {
      this.renderTemplate();
    }
  },

  render(_name, options) {
    assert('The name in the given arguments is undefined', arguments.length > 0 ? !isNone(arguments[0]) : true);

    var namePassed = typeof _name === 'string' && !!_name;
    var isDefaultRender = arguments.length === 0 || isEmpty(arguments[0]);
    var name;

    if (typeof _name === 'object' && !options) {
      name = this.routeName;
      options = _name;
    } else {
      name = _name;
    }

    var renderOptions = buildRenderOptions(this, namePassed, isDefaultRender, name, options);

    /*
     * Here is where we add the custom object proxy
     */
    renderOptions.controller = this.state;
    this.connections.push(renderOptions);
    run.once(this.router, '_setOutlets');
  },

  _reset() {}
});
