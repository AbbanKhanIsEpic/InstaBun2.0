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
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionID") || (depth0 != null ? lookupProperty(depth0,"collectionID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionID","hash":{},"data":data,"loc":{"start":{"line":57,"column":10},"end":{"line":57,"column":26}}}) : helper)))
    + "\"\r\n    >\r\n      <h5>"
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionTitle") || (depth0 != null ? lookupProperty(depth0,"collectionTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionTitle","hash":{},"data":data,"loc":{"start":{"line":59,"column":10},"end":{"line":59,"column":29}}}) : helper)))
    + "</h5>\r\n      <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":60,"column":16},"end":{"line":60,"column":30}}}) : helper)))
    + "\" alt=\"\" />\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"d-flex flex-column align-items-start justify-content-center w-100 mt-2 ms-2 mb-5\"\r\n>\r\n  <div class=\"d-flex flex-row w-100\">\r\n    <div\r\n      class=\"d-flex align-items-center position-relative searchBar ps-4 pe-4 pt-4 w-100\"\r\n    >\r\n      <input class=\"form-control\" type=\"text\" id=\"searchCollectionInput\" />\r\n      <button\r\n        type=\" button\"\r\n        class=\"btn btn-primary ms-3\"\r\n        id=\"searchCollectionButton\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"16\"\r\n          height=\"16\"\r\n          fill=\"currentColor\"\r\n          class=\"bi bi-search\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0\"\r\n          />\r\n        </svg>\r\n      </button>\r\n      <button\r\n        type=\"button\"\r\n        class=\"btn btn-primary ms-3\"\r\n        id=\"createCollectionButton\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"16\"\r\n          height=\"16\"\r\n          fill=\"currentColor\"\r\n          class=\"bi bi-plus-square\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z\"\r\n          />\r\n          <path\r\n            d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4\"\r\n          />\r\n        </svg></button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div\r\n  id=\"collections\"\r\n  class=\"col w-100 overflow-x-hidden mb-5 overflow-y-auto h-auto\"\r\n>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":2},"end":{"line":62,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();