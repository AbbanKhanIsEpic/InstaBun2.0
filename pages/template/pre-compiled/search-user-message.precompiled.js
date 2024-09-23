(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['search-user-message'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div\r\n    class=\"d-flex justify-content-between w-100 user\"\r\n    id=\"user-"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"userID") : stack1), depth0))
    + "\"\r\n  >\r\n    <div class=\"w-100 ps-4 d-flex flex-row align-items-center\">\r\n      <img\r\n        src="
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"profileIcon") : stack1), depth0))
    + "\r\n        alt=\"\"\r\n        width=\"44\"\r\n        height=\"44\"\r\n        class=\"rounded-circle me-2\"\r\n      />\r\n      <div class=\"d-flex flex-column\">\r\n        <span aria-label=\"display name\">\r\n          "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"displayName") : stack1), depth0))
    + "\r\n        </span>\r\n        <span\r\n          class=\"text-white-50\"\r\n          aria-label=\"username\"\r\n        >"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "</span>\r\n      </div>\r\n    </div>\r\n    <div\r\n      class=\"checkboxContainer d-flex align-items-center position-relative me-3\"\r\n    >\r\n      <input type=\"checkbox\" class=\"d-flex z-3 opacity-0\" />\r\n      <span\r\n        class=\"checkmark d-flex position-absolute rounded-circle border border-2 border-white\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          fill=\"currentColor\"\r\n          class=\"bi bi-check-circle-fill w-100 h-100 d-none\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z\"\r\n          />\r\n        </svg>\r\n      </span>\r\n    </div>\r\n  </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"users") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":0},"end":{"line":44,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
})();