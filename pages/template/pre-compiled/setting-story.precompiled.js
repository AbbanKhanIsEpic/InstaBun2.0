(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-story'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"story d-flex position-relative\" id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyID") || (depth0 != null ? lookupProperty(depth0,"storyID") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"storyID","hash":{},"data":data,"loc":{"start":{"line":26,"column":52},"end":{"line":26,"column":63}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":27,"column":6},"end":{"line":48,"column":13}}})) != null ? stack1 : "")
    + "    </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"position-absolute top-0 d-flex end-0 me-3 mt-2\">\r\n          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"25\"\r\n            height=\"25\"\r\n            fill=\"currentColor\"\r\n            class=\"bi bi-camera-video\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              fill-rule=\"evenodd\"\r\n              d=\"M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"\r\n            />\r\n          </svg>\r\n        </div>\r\n        <video class=\"border-1 border user-select-none content\">\r\n          <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyLink") || (depth0 != null ? lookupProperty(depth0,"storyLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storyLink","hash":{},"data":data,"loc":{"start":{"line":44,"column":23},"end":{"line":44,"column":36}}}) : helper)))
    + "\" />\r\n        </video>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyLink") || (depth0 != null ? lookupProperty(depth0,"storyLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storyLink","hash":{},"data":data,"loc":{"start":{"line":47,"column":18},"end":{"line":47,"column":31}}}) : helper)))
    + "\" alt=\"\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"d-flex flex-column align-items-start justify-content-center w-100 mt-5 ms-5 ps-3 mb-5\"\r\n>\r\n  <div class=\"d-flex flex-row\">\r\n    <h4 class=\"me-4 pe-2\">Before:</h4>\r\n    <input\r\n      type=\"datetime-local\"\r\n      name=\"\"\r\n      id=\"filterDateTimeStartInput\"\r\n      class=\"form-control w-50\"\r\n    />\r\n  </div>\r\n  <div class=\"d-flex flex-row mt-4\">\r\n    <h4 class=\"me-5\">After:</h4>\r\n    <input\r\n      type=\"datetime-local\"\r\n      name=\"\"\r\n      id=\"filterDateTimeEndInput\"\r\n      class=\"form-control w-50\"\r\n    />\r\n  </div>\r\n  <button class=\"btn btn-primary mt-4 w-25\">Filter</button>\r\n</div>\r\n<div id=\"stories\" class=\"col vh-100 w-100 overflow-x-hidden\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":25,"column":2},"end":{"line":50,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();