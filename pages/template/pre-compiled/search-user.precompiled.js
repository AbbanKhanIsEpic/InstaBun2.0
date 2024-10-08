(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search-user'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div\r\n    class=\"user d-flex flex-row justify-content-between align-items-center w-100 pt-2 pb-2\"\r\n  >\r\n    <div class=\"d-flex flex-row ms-4\">\r\n      <img\r\n        src=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"profileIcon") : stack1), depth0))
    + "\"\r\n        height=\"100\"\r\n        width=\"100\"\r\n        alt=\"\"\r\n        class=\"rounded-circle profileIcon\"\r\n      />\r\n      <div class=\"d-flex flex-column ms-3\">\r\n        <div class=\"display-6 displayName\">\r\n          <strong>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"displayName") : stack1), depth0))
    + "</strong>\r\n        </div>\r\n        <div class=\"username text-white-50 h3\">\r\n          "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "\r\n        </div>\r\n      </div>\r\n    </div>\r\n    "
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(lookupProperty(helpers,"isCurrentUser")||(depth0 && lookupProperty(depth0,"isCurrentUser"))||container.hooks.helperMissing).call(alias3,((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"userID") : stack1),{"name":"isCurrentUser","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":22,"column":10},"end":{"line":22,"column":37}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.program(4, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"start":{"line":22,"column":4},"end":{"line":34,"column":11}}})) != null ? stack1 : "")
    + "  </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"isFollowing") : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams),"inverse":container.program(7, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"start":{"line":23,"column":6},"end":{"line":33,"column":13}}})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <button\r\n          class=\"btn bg-dark-subtle h-75 w-25 me-4\"\r\n          id=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"userID") : stack1), depth0))
    + "\"\r\n        >Unfollow</button>\r\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <button\r\n          class=\"btn bg-primary h-75 w-25 me-4\"\r\n          id=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"userID") : stack1), depth0))
    + "\"\r\n        >Follow</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"users") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":0},"end":{"line":36,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
})();