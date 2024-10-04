(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-user'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "On";
},"3":function(container,depth0,helpers,partials,data) {
    return "Off";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"col vh-100 w-100 d-flex flex-column overflow-y-auto overflow-x-hidden align-items-center\"\r\n>\r\n  <div class=\"d-flex flex-column align-items-center w-100 mt-5\">\r\n    <h6><strong>Profile icon:</strong></h6>\r\n    <div class=\"mt-2\">\r\n      <input\r\n        type=\"file\"\r\n        accept=\"image/*\"\r\n        class=\"position-absolute visually-hidden\"\r\n        placeholder=\"Profile icon\"\r\n        id=\"changeProfileIconInput\"\r\n        aria-label=\"user upload files\"\r\n      />\r\n      <label for=\"changeProfileIconInput\" role=\"button\">\r\n        <img\r\n          width=\"100\"\r\n          height=\"100\"\r\n          src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":19,"column":15},"end":{"line":19,"column":30}}}) : helper)))
    + "\"\r\n          id=\"userProfileIcon\"\r\n          class=\"rounded rounded-circle\"\r\n        />\r\n      </label>\r\n    </div>\r\n  </div>\r\n  <div class=\"d-flex flex-row justify-content-center w-25 mt-4 input-group\">\r\n    <div class=\"input-group-prepend\">\r\n      <span\r\n        class=\"input-group-text rounded-end-0\"\r\n        id=\"basic-addon1\"\r\n      >Username:</span>\r\n    </div>\r\n    <input\r\n      type=\"text\"\r\n      class=\"form-control noBoxShadow\"\r\n      placeholder=\"Username\"\r\n      id=\"usernameInput\"\r\n      aria-label=\"Username\"\r\n      disabled\r\n    />\r\n  </div>\r\n  <div class=\"d-flex flex-row justify-content-center w-25 mt-5 input-group\">\r\n    <div class=\"input-group-prepend\">\r\n      <span class=\"input-group-text rounded-end-0\">Display name:</span>\r\n    </div>\r\n    <input\r\n      type=\"text\"\r\n      class=\"form-control noBoxShadow\"\r\n      placeholder=\"Display name\"\r\n      aria-label=\"Display name\"\r\n      id=\"displayNameInput\"\r\n    />\r\n  </div>\r\n  <div class=\"d-flex flex-row align-items-center w-25 input-group\">\r\n    <div class=\"input-group-prepend w-50\">\r\n      <span class=\"input-group-text rounded-end-0\">2-step auth: </span>\r\n    </div>\r\n    <div class=\"btn btn-primary w-50\" id=\"auth2SVEButton\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"2SVE") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":58,"column":58},"end":{"line":60,"column":28}}})) != null ? stack1 : "")
    + "</div>\r\n  </div>\r\n  <div class=\"d-flex flex-row align-items-center w-25 input-group mt-4 mb-2\">\r\n    <button class=\"btn btn-primary w-100\">Save</button>\r\n  </div>\r\n</div>";
},"useData":true});
})();