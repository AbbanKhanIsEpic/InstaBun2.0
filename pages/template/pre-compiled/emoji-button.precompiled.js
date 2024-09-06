(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['emoji-button'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "  <div\r\n    class=\"emojiBtn d-flex justify-content-center align-items-center user-select-none\"\r\n  ><div\r\n      class=\"emoji d-flex rounded-2\"\r\n      data-bs-dismiss=\"modal\"\r\n      data-bs-target=\"#emojiSelector\"\r\n    >"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</div></div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"emojiObject") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":9,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();