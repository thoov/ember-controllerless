import Ember from 'ember';

const { assert, getOwner } = Ember;

function handlerInfoFor(route, handlerInfos, _offset) {
  if (!handlerInfos) { return; }

  var offset = _offset || 0;
  var current;
  for (var i = 0, l = handlerInfos.length; i < l; i++) {
    current = handlerInfos[i].handler;
    if (current === route) { return handlerInfos[i + offset]; }
  }
}

function parentRoute(route) {
  var handlerInfo = handlerInfoFor(route, route.router.router.state.handlerInfos, -1);
  return handlerInfo && handlerInfo.handler;
}

/*
* https://github.com/emberjs/ember.js/blob/7587a7d1f9fd94fd20debad0c7477d1d051b35e2/packages/ember-routing/lib/system/route.js#L2095-L2178
*/
export default function buildRenderOptions(route, namePassed, isDefaultRender, name, options) {
  var templateName;
  var template;
  var into = options && options.into;
  var outlet = (options && options.outlet) || 'main';

  if (name) {
    templateName = name;
  } else {
    name = route.routeName;
    templateName = route.templateName || name;
  }

  let owner = getOwner(route);
  template = owner.lookup(`template:${templateName}`);

  var parent;
  if (into && (parent = parentRoute(route)) && into === parentRoute(route).routeName) {
    into = undefined;
  }

  var renderOptions = {
    into: into,
    outlet: outlet,
    name: name,
    template: template
  };

  if (!template) {
    assert(`Could not find "${name}" template.`, isDefaultRender);
  }

  return renderOptions;
}
