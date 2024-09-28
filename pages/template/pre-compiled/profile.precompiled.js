(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"btn bg-dark-subtle ms-4\">Setting</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"btn btn-primary ms-3\">Follow</div>\r\n          <div class=\"btn btn-primary ms-3\">Message</div>\r\n          <div class=\"btn btn-primary ms-3\">Block</div>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n    <div class=\"collection\">\r\n      <div class=\"d-flex justify-content-center\">\r\n        <img\r\n          src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":46,"column":15},"end":{"line":46,"column":29}}}) : helper)))
    + "\"\r\n          alt=\"\"\r\n          width=\"70\"\r\n          height=\"70\"\r\n          class=\"rounded-circle\"\r\n        />\r\n      </div>\r\n      <div class=\"ellipsis text-center\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionTitle") || (depth0 != null ? lookupProperty(depth0,"collectionTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionTitle","hash":{},"data":data,"loc":{"start":{"line":53,"column":40},"end":{"line":53,"column":59}}}) : helper)))
    + "</div>\r\n    </div>";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"post d-flex position-relative\" id="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":58,"column":50},"end":{"line":58,"column":56}}}) : helper)))
    + ">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":59,"column":6},"end":{"line":80,"column":13}}})) != null ? stack1 : "")
    + "    </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"position-absolute top-0 d-flex end-0 me-3 mt-2\">\r\n          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"25\"\r\n            height=\"25\"\r\n            fill=\"currentColor\"\r\n            class=\"bi bi-camera-video\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              fill-rule=\"evenodd\"\r\n              d=\"M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"\r\n            />\r\n          </svg>\r\n        </div>\r\n        <video class=\"border-1 border user-select-none content\">\r\n          <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":76,"column":23},"end":{"line":76,"column":35}}}) : helper)))
    + "\" />\r\n        </video>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":79,"column":18},"end":{"line":79,"column":30}}}) : helper)))
    + "\" alt=\"\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"displayUserInfomation\">\r\n  <div class=\"d-flex justify-content-center align-items-center mt-4 gap-5\">\r\n    <img\r\n      src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":4,"column":11},"end":{"line":4,"column":26}}}) : helper)))
    + "\"\r\n      alt=\"\"\r\n      width=\"150\"\r\n      height=\"150\"\r\n      class=\"rounded-circle\"\r\n    />\r\n    <div class=\"d-flex flex-column\">\r\n      <div class=\"d-flex flex-row align-items-start\">\r\n        <div class=\"d-flex profileUsername align-self-center\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":12,"column":62},"end":{"line":12,"column":74}}}) : helper)))
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isCurrentUser")||(depth0 && lookupProperty(depth0,"isCurrentUser"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"userID") : depth0),{"name":"isCurrentUser","hash":{},"data":data,"loc":{"start":{"line":13,"column":14},"end":{"line":13,"column":36}}}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n      <div class=\"d-flex flex-row gap-5 mt-3\">\r\n        <div>\r\n          <span id=\"totalPostCount\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"posts") : depth0)) != null ? lookupProperty(stack1,"length") : stack1), depth0))
    + "</span>\r\n          post\r\n        </div>\r\n        <div>\r\n          <span id=\"totalFollowersCount\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalFollowers") || (depth0 != null ? lookupProperty(depth0,"totalFollowers") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFollowers","hash":{},"data":data,"loc":{"start":{"line":27,"column":41},"end":{"line":27,"column":59}}}) : helper)))
    + "</span>\r\n          followers\r\n        </div>\r\n        <div>\r\n          <span id=\"totalFollowingsCount\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalFollowings") || (depth0 != null ? lookupProperty(depth0,"totalFollowings") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFollowings","hash":{},"data":data,"loc":{"start":{"line":31,"column":42},"end":{"line":31,"column":61}}}) : helper)))
    + "</span>\r\n          followings\r\n        </div>\r\n      </div>\r\n      <strong class=\"mt-3\">@<span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"displayName") || (depth0 != null ? lookupProperty(depth0,"displayName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data,"loc":{"start":{"line":35,"column":34},"end":{"line":35,"column":49}}}) : helper)))
    + "</span></strong>\r\n      <div>"
    + alias4(((helper = (helper = lookupProperty(helpers,"bio") || (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bio","hash":{},"data":data,"loc":{"start":{"line":36,"column":11},"end":{"line":36,"column":18}}}) : helper)))
    + "</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div\r\n  class=\"collections d-flex flex-row align-items-center gap-4 ms-5 w-100 overflow-x-auto mt-2\"\r\n>"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":1},"end":{"line":54,"column":19}}})) != null ? stack1 : "")
    + "\r\n</div>\r\n<div id=\"posts\" class=\"align-items-center overflow-y-auto\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"posts") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":2},"end":{"line":82,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true});
})();