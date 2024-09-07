(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post-explore'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div\r\n    class=\"card bg-black post d-flex flex-row mb-4 w-100 justify-content-center\"\r\n    data-post-id="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":4,"column":17},"end":{"line":4,"column":23}}}) : helper)))
    + "\r\n  >\r\n    <div class=\"contentContainer\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":7,"column":6},"end":{"line":13,"column":13}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"side-interactions d-flex flex-column ms-2 justify-content-end\">\r\n      <div class=\"like-button\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"like") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":17,"column":8},"end":{"line":44,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n      <div class=\"text-white d-flex justify-content-center mb-3\">4k</div>\r\n      <div role=\"button\" class=\"mb-3\">\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"24\"\r\n          height=\"24\"\r\n          fill=\"white\"\r\n          class=\"bi bi-chat postInteraction\"\r\n          viewBox=\"0 1 16 16\"\r\n        >\r\n          <path\r\n            d=\"M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105\"\r\n          />\r\n        </svg>\r\n      </div>\r\n      <div role=\"button\" class=\"mb-3\">\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"24\"\r\n          height=\"24\"\r\n          fill=\"white\"\r\n          class=\"bi bi-share postInteraction\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3\"\r\n          />\r\n        </svg>\r\n      </div>\r\n      <div role=\"button\" class=\"bookmarkButton\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"bookmark") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":76,"column":8},"end":{"line":102,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n    <hr />\r\n  </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <video controls class=\"border-1 border user-select-none\">\r\n          <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"mediaSrc") || (depth0 != null ? lookupProperty(depth0,"mediaSrc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mediaSrc","hash":{},"data":data,"loc":{"start":{"line":9,"column":23},"end":{"line":9,"column":35}}}) : helper)))
    + "\" />\r\n        </video>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"mediaSrc") || (depth0 != null ? lookupProperty(depth0,"mediaSrc") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"mediaSrc","hash":{},"data":data,"loc":{"start":{"line":12,"column":18},"end":{"line":12,"column":30}}}) : helper)))
    + "\" class=\"border-1 border user-select-none\" />\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"red\"\r\n            class=\"bi bi-heart-fill like\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              fill-rule=\"evenodd\"\r\n              d=\"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314\"\r\n            />\r\n          </svg>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-heart postInteraction\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15\"\r\n            />\r\n          </svg>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-bookmark-fill bookmark\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2\"\r\n            />\r\n          </svg>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-bookmark postInteraction\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z\"\r\n            />\r\n          </svg>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"post") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":107,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();