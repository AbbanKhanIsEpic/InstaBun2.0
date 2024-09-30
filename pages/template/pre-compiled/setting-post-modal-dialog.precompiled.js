(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-post-modal-dialog'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <video controls preload=\"auto\" class=\"rounded\" width=\"100%\" height=\"auto\">\r\n            <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":20,"column":25},"end":{"line":20,"column":37}}}) : helper)))
    + "\" type=\"video/mp4\" />\r\n            Your browser does not support the video tag.\r\n          </video>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "          <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":24,"column":20},"end":{"line":24,"column":32}}}) : helper)))
    + "\" class=\"border-1 border user-select-none content\" />\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal-dialog modal-dialog-centered modal-fullscreen modal-dialog-scrollable\">\r\n  <div class=\"modal-content bg-black text-white glassmorph\">\r\n    <div class=\"modal-header d-flex flex-column p-0 position-relative pb-4\">\r\n      <h5 id=\"modalTitle\" class=\"modal-title pt-3\">Post</h5>\r\n      <button type=\"button\" class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3\" data-bs-dismiss=\"modal\"\r\n        aria-label=\"Close modal\">\r\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"white\" class=\"bi bi-x-lg\"\r\n          viewBox=\"0 0 16 16\">\r\n          <path\r\n            d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n            stroke=\"white\" stroke-width=\"1.5\" />\r\n        </svg>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body d-flex w-100 flex-row m-0 p-0\">\r\n      <div class=\"ms-3 d-flex justify-content-center border-end\" id=\"postContainer\">\r\n        <div class=\"d-flex align-items-center justify-content-center pe-3 position-relative\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":18,"column":10},"end":{"line":25,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n      </div>\r\n      <div id=\"postInformationContainer\" class=\"d-flex flex-column w-100 mt-3 ms-3 me-3 position-relative\">\r\n        <div>\r\n          <h3 class=\"mb-4 mt-4\">Description:</h3>\r\n          <textarea name=\"description\" id=\"descriptionInput\" class=\"form-control noBoxShadow w-100 rounded-3\"\r\n            rows=\"3\"></textarea>\r\n        </div>\r\n        <div>\r\n          <h3 class=\"mb-4 mt-4\">Tags:</h3>\r\n          <div class=\"form-group d-flex\">\r\n            <input type=\"text\" placeholder=\"Enter a tag...\"\r\n              class=\"form-control text-white bg-black border-3 noBoxShadow rounded-3 border-white border-end-0 rounded-end-0\"\r\n              id=\"tagInput\" />\r\n            <button class=\"btn btn-primary rounded-start-0 border-start-0\" id=\"addTagButton\">\r\n              Add\r\n            </button>\r\n          </div>\r\n          <div id=\"tagList\" class=\"mt-2 border border-3 border-white w-100 rounded-3 gap-2 overflow-y-auto\"></div>\r\n        </div>\r\n        <div>\r\n          <h3 class=\"mb-4 mt-4\">Visibility:</h3>\r\n          <div class=\"form-check d-flex align-items-center mb-2\">\r\n            <input class=\"form-check-input visibilityCheckBox\" type=\"checkbox\" value=\"0\" id=\"uploadVisibilityAll\"\r\n              "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"postVisibility") : depth0),0,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":50,"column":14},"end":{"line":50,"column":80}}})) != null ? stack1 : "")
    + " />\r\n            <label class=\"form-check-label ms-2 mb-0 display-7\" for=\"uploadVisibilityAll\">\r\n              Everyone\r\n            </label>\r\n          </div>\r\n          <div class=\"form-check d-flex align-items-center mb-2\">\r\n            <input class=\"form-check-input visibilityCheckBox\" type=\"checkbox\" value=\"1\" id=\"uploadVisibilityFollowers\"\r\n              "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"postVisibility") : depth0),1,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":57,"column":14},"end":{"line":57,"column":80}}})) != null ? stack1 : "")
    + " />\r\n            <label class=\"form-check-label ms-2 display-7\" for=\"uploadVisibilityFollowers\">\r\n              Followers\r\n            </label>\r\n          </div>\r\n          <div class=\"form-check d-flex align-items-center mb-2\">\r\n            <input class=\"form-check-input visibilityCheckBox\" type=\"checkbox\" value=\"2\" id=\"uploadVisbilityFriends\"\r\n              "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"postVisibility") : depth0),2,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":14},"end":{"line":64,"column":80}}})) != null ? stack1 : "")
    + " />\r\n            <label class=\"form-check-label ms-2 display-7\" for=\"uploadVisbilityFriends\">\r\n              Friends\r\n            </label>\r\n          </div>\r\n          <div class=\"form-check d-flex align-items-center\">\r\n            <input class=\"form-check-input visibilityCheckBox\" type=\"checkbox\" value=\"3\" id=\"uploadVisibilityNoOne\"\r\n              "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"postVisibility") : depth0),3,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":71,"column":14},"end":{"line":71,"column":80}}})) != null ? stack1 : "")
    + " />\r\n            <label class=\"form-check-label ms-2 display-7\" for=\"uploadVisibilityNoOne\">\r\n              No-one\r\n            </label>\r\n          </div>\r\n        </div>\r\n        <hr class=\"invisible\" />\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer d-flex w-100 flex-row\">\r\n      <button id=\"savePostButton\" class=\"btn btn-primary\">Save</button>\r\n      <button id=\"deletePostButton\" class=\"btn btn-danger\">Delete</button>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();