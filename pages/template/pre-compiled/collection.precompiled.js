(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['collection'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"collection\">\r\n    <div class=\"d-flex justify-content-center\">\r\n      <img\r\n        src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":5,"column":13},"end":{"line":5,"column":27}}}) : helper)))
    + "\"\r\n        alt=\"\"\r\n        width=\"70\"\r\n        height=\"70\"\r\n        class=\"rounded-circle\"\r\n      />\r\n    </div>\r\n    <div class=\"ellipsis text-center\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionTitle") || (depth0 != null ? lookupProperty(depth0,"collectionTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionTitle","hash":{},"data":data,"loc":{"start":{"line":12,"column":38},"end":{"line":12,"column":57}}}) : helper)))
    + "</div>\r\n  </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"collection") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":14,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();