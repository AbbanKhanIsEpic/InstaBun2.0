(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['hidden-container'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"w-100 pt-3 ps-3 pb-3 border-bottom d-flex flex-row align-items-center justify-content-between border-dark user-select-none\"\r\n>\r\n  <div>\r\n    <img\r\n      src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":26}}}) : helper)))
    + "\"\r\n      alt=\"\"\r\n      width=\"56\"\r\n      height=\"56\"\r\n      class=\"rounded-circle me-2\"\r\n    />\r\n    <span> <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":12,"column":19},"end":{"line":12,"column":27}}}) : helper)))
    + "</strong></span>\r\n  </div>\r\n  <div class=\"pe-2\" id=\"moreInfo\"><svg\r\n      xmlns=\"http://www.w3.org/2000/svg\"\r\n      width=\"24\"\r\n      height=\"24\"\r\n      fill=\"currentColor\"\r\n      class=\"bi bi-info-circle\"\r\n      viewBox=\"0 0 16 16\"\r\n    >\r\n      <path\r\n        d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"\r\n      />\r\n      <path\r\n        d=\"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0\"\r\n      />\r\n    </svg></div>\r\n</div>\r\n<div\r\n  id=\"hiddenMessageOutput\"\r\n  class=\"d-flex flex-column w-100 overflow-y-auto vh-100\"\r\n>\r\n</div>";
},"useData":true});
})();