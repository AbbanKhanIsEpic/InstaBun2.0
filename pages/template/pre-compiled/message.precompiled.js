(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['message'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isNewDay")||(depth0 && lookupProperty(depth0,"isNewDay"))||alias2).call(alias1,(data && lookupProperty(data,"index")),{"name":"isNewDay","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":2,"column":8},"end":{"line":2,"column":25}}}),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":2,"column":2},"end":{"line":6,"column":9}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isSendMessage")||(depth0 && lookupProperty(depth0,"isSendMessage"))||alias2).call(alias1,((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"senderID") : stack1),{"name":"isSendMessage","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":7,"column":8},"end":{"line":7,"column":40}}}),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams),"inverse":container.program(6, data, 0, blockParams),"data":data,"blockParams":blockParams,"loc":{"start":{"line":7,"column":2},"end":{"line":55,"column":9}}})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"w-100 text-center\">\r\n      "
    + container.escapeExpression((lookupProperty(helpers,"convertToDate")||(depth0 && lookupProperty(depth0,"convertToDate"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"time") : stack1),{"name":"convertToDate","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":4,"column":6},"end":{"line":4,"column":36}}}))
    + "\r\n    </div>\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"w-100 d-flex justify-content-end pb-3\">\r\n      <div\r\n        class=\"sendMessage rounded-4 bg-primary pt-1 ps-2 pb-1 pe-2 me-3\"\r\n        id=\""
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"messageID") : stack1), depth0))
    + "\"\r\n      >\r\n        <span class=\"message\">"
    + alias2(alias1(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"message") : stack1), depth0))
    + "</span>\r\n        <div class=\"pt-2 pb-2 pe-2 d-flex justify-content-between\">\r\n          <div class=\"deleteMessage\">\r\n            <svg\r\n              xmlns=\"http://www.w3.org/2000/svg\"\r\n              width=\"16\"\r\n              height=\"16\"\r\n              fill=\"#ff3f4e\"\r\n              class=\"bi bi-trash3-fill\"\r\n              viewBox=\"0 0 16 16\"\r\n            >\r\n              <path\r\n                d=\"M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5\"\r\n              />\r\n            </svg>\r\n          </div>\r\n          <div>\r\n            "
    + alias2((lookupProperty(helpers,"convertTo12HourTime")||(depth0 && lookupProperty(depth0,"convertTo12HourTime"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"time") : stack1),{"name":"convertTo12HourTime","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":30,"column":12},"end":{"line":30,"column":48}}}))
    + "\r\n          </div></div>\r\n      </div>\r\n    </div>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"icon") : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":35,"column":4},"end":{"line":46,"column":11}}})) != null ? stack1 : "")
    + "    <div class=\"w-100 d-flex justify-content-start pb-3\">\r\n      <div class=\"recieveMessage rounded-4 bg-dark pt-1 ps-2 pb-1 pe-2 ms-3\">\r\n        <span class=\"message\">"
    + alias2(container.lambda(((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"message") : stack1), depth0))
    + "</span>\r\n        <div\r\n          class=\"pt-2 pb-2 pe-2 text-end w-100 time-text\"\r\n        >"
    + alias2((lookupProperty(helpers,"convertTo12HourTime")||(depth0 && lookupProperty(depth0,"convertTo12HourTime"))||container.hooks.helperMissing).call(alias1,((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"time") : stack1),{"name":"convertTo12HourTime","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":52,"column":9},"end":{"line":52,"column":45}}}))
    + "</div>\r\n      </div>\r\n    </div>\r\n";
},"7":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <div>\r\n        <img\r\n          src=\""
    + alias2(alias1(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"icon") : stack1), depth0))
    + "\"\r\n          alt=\"\"\r\n          width=\"40\"\r\n          height=\"40\"\r\n          class=\"rounded rounded-circle ms-3 mb-1\"\r\n        />\r\n        <span>"
    + alias2(alias1(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"displayName") : stack1), depth0))
    + "</span>\r\n      </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"messages") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":0},"end":{"line":56,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
})();