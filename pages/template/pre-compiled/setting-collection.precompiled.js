(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-collection'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div\r\n      class=\"collection d-flex position-relative flex-column border-1 border\"\r\n      id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionID") || (depth0 != null ? lookupProperty(depth0,"collectionID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionID","hash":{},"data":data,"loc":{"start":{"line":33,"column":10},"end":{"line":33,"column":26}}}) : helper)))
    + "\"\r\n    >\r\n      <h5>"
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionTitle") || (depth0 != null ? lookupProperty(depth0,"collectionTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionTitle","hash":{},"data":data,"loc":{"start":{"line":35,"column":10},"end":{"line":35,"column":29}}}) : helper)))
    + "</h5>\r\n      <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":36,"column":16},"end":{"line":36,"column":30}}}) : helper)))
    + "\" alt=\"\" />\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"d-flex flex-column align-items-start justify-content-center w-100 mt-2 ms-2 mb-5\"\r\n>\r\n  <div class=\"d-flex flex-row w-100\">\r\n    <div\r\n      class=\"d-flex align-items-center position-relative searchBar ps-4 pe-4 pt-4 w-100\"\r\n    >\r\n      <input class=\"form-control\" type=\"text\" id=\"searchPostInput\" />\r\n      <button type=\" button\" class=\"btn btn-primary ms-3\" id=\"searchPostButton\">\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"16\"\r\n          height=\"16\"\r\n          fill=\"currentColor\"\r\n          class=\"bi bi-search\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0\"\r\n          />\r\n        </svg>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div\r\n  id=\"collections\"\r\n  class=\"col w-100 overflow-x-hidden mb-5 overflow-y-auto h-auto\"\r\n>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":30,"column":2},"end":{"line":38,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();