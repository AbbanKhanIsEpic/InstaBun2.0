(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['selected-tag'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"d-flex btn btn-primary rounded-0 justify-content-center align-items-center position-relative\"\r\n>\r\n  <div aria-label=\"tag name\" class=\"d-flex\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"tag") || (depth0 != null ? lookupProperty(depth0,"tag") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"tag","hash":{},"data":data,"loc":{"start":{"line":4,"column":44},"end":{"line":4,"column":51}}}) : helper)))
    + "</div>\r\n  <span class=\"btn btn-close position-absolute end-0 me-3\"> </span>\r\n</div>";
},"useData":true});
})();