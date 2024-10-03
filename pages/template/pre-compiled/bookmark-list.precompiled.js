(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bookmark-list'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div\r\n    class=\"user d-flex flex-row justify-content-between align-items-center w-100 pt-2 pb-2\"\r\n  >\r\n    <div class=\"d-flex flex-row ms-4\">\r\n      <img\r\n        src=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"coverPhoto") : stack1), depth0))
    + "\"\r\n        height=\"50\"\r\n        width=\"50\"\r\n        alt=\"\"\r\n        class=\"rounded-circle\"\r\n      />\r\n      <div class=\"d-flex flex-column ms-3 justify-content-center\">\r\n        <div class=\"displayName\">\r\n          <strong>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bookmarkTitle") : stack1), depth0))
    + "</strong>\r\n        </div>\r\n      </div>\r\n    </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias3,(lookupProperty(helpers,"hasBookmarked")||(depth0 && lookupProperty(depth0,"hasBookmarked"))||container.hooks.helperMissing).call(alias3,((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"bookmarkID") : stack1),{"name":"hasBookmarked","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":19,"column":10},"end":{"line":19,"column":45}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.program(4, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"start":{"line":19,"column":4},"end":{"line":29,"column":11}}})) != null ? stack1 : "")
    + "  </div>\r\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <button\r\n        class=\"btn bg-dark-subtle h-75 w-25 me-4 bookmark\"\r\n        id=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"bookmarkID") : stack1), depth0))
    + "\"\r\n      >Remove</button>\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <button\r\n        class=\"btn bg-primary h-75 w-25 me-4 bookmark\"\r\n        id=\""
    + container.escapeExpression(container.lambda(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"bookmarkID") : stack1), depth0))
    + "\"\r\n      >Add</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"bookmarks") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":0},"end":{"line":31,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
})();