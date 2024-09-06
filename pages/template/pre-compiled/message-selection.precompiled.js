(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['message-selection'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div class=\"message ps-2 d-flex flex-row align-items-center "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGroup") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":2,"column":66},"end":{"line":2,"column":107}}})) != null ? stack1 : "")
    + "\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":113},"end":{"line":2,"column":119}}}) : helper)))
    + "\">\r\n       <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"icon") || (depth0 != null ? lookupProperty(depth0,"icon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"icon","hash":{},"data":data,"loc":{"start":{"line":3,"column":17},"end":{"line":3,"column":25}}}) : helper)))
    + "\" alt=\"profile icon\"\r\n           width=\"56\" height=\"56\" class=\"rounded-circle me-2 profileIcon\" />\r\n       <div class=\"d-flex flex-column w-100\">\r\n           <div class=\"ellipsis\" aria-label=\"name\">\r\n               "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":7,"column":15},"end":{"line":7,"column":23}}}) : helper)))
    + "\r\n           </div>\r\n           <div class=\"text-white-50 ellipsis\" aria-label=\"latest message\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"senderName") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":10,"column":12},"end":{"line":16,"column":19}}})) != null ? stack1 : "")
    + "</div>\r\n       </div>\r\n       </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "group";
},"4":function(container,depth0,helpers,partials,data) {
    return "direct";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"currentUserSent")||(depth0 && lookupProperty(depth0,"currentUserSent"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"senderID") : depth0),{"name":"currentUserSent","hash":{},"data":data,"loc":{"start":{"line":11,"column":21},"end":{"line":11,"column":47}}}),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data,"loc":{"start":{"line":11,"column":15},"end":{"line":15,"column":22}}})) != null ? stack1 : "")
    + " said: "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"message") || (depth0 != null ? lookupProperty(depth0,"message") : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"message","hash":{},"data":data,"loc":{"start":{"line":15,"column":29},"end":{"line":15,"column":40}}}) : helper)))
    + "\r\n            ";
},"7":function(container,depth0,helpers,partials,data) {
    return "               You\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "               "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"senderName") || (depth0 != null ? lookupProperty(depth0,"senderName") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"senderName","hash":{},"data":data,"loc":{"start":{"line":14,"column":15},"end":{"line":14,"column":29}}}) : helper)))
    + "\r\n               ";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"messageList") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":19,"column":15}}})) != null ? stack1 : "");
},"useData":true});
})();