(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"btn bg-dark-subtle ms-4\">Setting</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isFollowing") : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data,"loc":{"start":{"line":16,"column":10},"end":{"line":20,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"canMessage") : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data,"loc":{"start":{"line":21,"column":10},"end":{"line":24,"column":17}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasBlockedUser") : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":25,"column":10},"end":{"line":29,"column":17}}})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"btn btn-secondary ms-3\" id=\"followButton\">Unfollow</div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"btn btn-primary ms-3\" id=\"followButton\">Follow</div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"btn btn-primary ms-3\" id=\"messageButton\">Message</div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "";
},"12":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"btn btn-secondary ms-3\" id=\"blockButton\">Unblock</div>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"btn btn-primary ms-3\" id=\"blockButton\">Block</div>\r\n";
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
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isCurrentUser")||(depth0 && lookupProperty(depth0,"isCurrentUser"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"userID") : depth0),{"name":"isCurrentUser","hash":{},"data":data,"loc":{"start":{"line":13,"column":14},"end":{"line":13,"column":36}}}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":30,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n      <div class=\"d-flex flex-row gap-5 mt-3\">\r\n        <div>\r\n          <span id=\"totalPostCount\">"
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"posts") : depth0)) != null ? lookupProperty(stack1,"length") : stack1), depth0))
    + "</span>\r\n          post\r\n        </div>\r\n        <div role=\"button\" id=\"followers\">\r\n          <span id=\"totalFollowersCount\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalFollowers") || (depth0 != null ? lookupProperty(depth0,"totalFollowers") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFollowers","hash":{},"data":data,"loc":{"start":{"line":38,"column":41},"end":{"line":38,"column":59}}}) : helper)))
    + "</span>\r\n          followers\r\n        </div>\r\n        <div role=\"button\" id=\"followings\">\r\n          <span id=\"totalFollowingsCount\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalFollowings") || (depth0 != null ? lookupProperty(depth0,"totalFollowings") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalFollowings","hash":{},"data":data,"loc":{"start":{"line":42,"column":42},"end":{"line":42,"column":61}}}) : helper)))
    + "</span>\r\n          followings\r\n        </div>\r\n      </div>\r\n      <strong class=\"mt-3\">@<span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"displayName") || (depth0 != null ? lookupProperty(depth0,"displayName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data,"loc":{"start":{"line":46,"column":34},"end":{"line":46,"column":49}}}) : helper)))
    + "</span></strong>\r\n      <div>"
    + alias4(((helper = (helper = lookupProperty(helpers,"bio") || (depth0 != null ? lookupProperty(depth0,"bio") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bio","hash":{},"data":data,"loc":{"start":{"line":47,"column":11},"end":{"line":47,"column":18}}}) : helper)))
    + "</div>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div\r\n  id=\"collections\"\r\n  class=\"d-flex flex-row align-items-center gap-4 ms-5 w-100 overflow-x-auto mt-2\"\r\n>\r\n</div>\r\n<div id=\"posts\" class=\"align-items-center overflow-y-auto\">\r\n\r\n</div>";
},"useData":true});
})();