(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-stories-modal-dialog'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <video\r\n              controls\r\n              preload=\"auto\"\r\n              class=\"rounded\"\r\n              width=\"100%\"\r\n              height=\"auto\"\r\n            >\r\n              <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyLink") || (depth0 != null ? lookupProperty(depth0,"storyLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storyLink","hash":{},"data":data,"loc":{"start":{"line":45,"column":27},"end":{"line":45,"column":40}}}) : helper)))
    + "\" type=\"video/mp4\" />\r\n              Your browser does not support the video tag.\r\n            </video>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <img\r\n              src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyLink") || (depth0 != null ? lookupProperty(depth0,"storyLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storyLink","hash":{},"data":data,"loc":{"start":{"line":50,"column":19},"end":{"line":50,"column":32}}}) : helper)))
    + "\"\r\n              class=\"border-1 border user-select-none content\"\r\n            />\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "checked";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"modal-dialog modal-dialog-centered modal-fullscreen modal-dialog-scrollable\"\r\n>\r\n  <div class=\"modal-content bg-black text-white glassmorph\">\r\n    <div class=\"modal-header d-flex flex-column p-0 position-relative pb-4\">\r\n      <h5 id=\"modalTitle\" class=\"modal-title pt-3\">Story</h5>\r\n      <button\r\n        type=\"button\"\r\n        class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3\"\r\n        data-bs-dismiss=\"modal\"\r\n        aria-label=\"Close modal\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"24\"\r\n          height=\"24\"\r\n          fill=\"white\"\r\n          class=\"bi bi-x-lg\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n            stroke=\"white\"\r\n            stroke-width=\"1.5\"\r\n          />\r\n        </svg>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body d-flex w-100 flex-row m-0 p-0\">\r\n      <div\r\n        class=\"ms-3 d-flex justify-content-center border-end\"\r\n        id=\"mediaContainer\"\r\n      >\r\n        <div\r\n          class=\"d-flex align-items-center justify-content-center pe-3 position-relative\"\r\n        >\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":37,"column":10},"end":{"line":53,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n      </div>\r\n      <div\r\n        id=\"storyInformationContainer\"\r\n        class=\"d-flex flex-column w-100 mt-3 ms-3 me-3 position-relative\"\r\n      >\r\n        <h3 class=\"mb-4 mt-4\">Visibility:</h3>\r\n        <div class=\"form-check d-flex align-items-center mb-2\">\r\n          <input\r\n            class=\"form-check-input visibilityCheckBox\"\r\n            type=\"checkbox\"\r\n            value=\"0\"\r\n            id=\"uploadVisibilityAll\"\r\n           "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"storyVisibility") : depth0),0,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":67,"column":11},"end":{"line":67,"column":78}}})) != null ? stack1 : "")
    + "\r\n          />\r\n          <label\r\n            class=\"form-check-label ms-2 mb-0 display-7\"\r\n            for=\"uploadVisibilityAll\"\r\n          >\r\n            Everyone\r\n          </label>\r\n        </div>\r\n        <div class=\"form-check d-flex align-items-center mb-2\">\r\n          <input\r\n            class=\"form-check-input visibilityCheckBox\"\r\n            type=\"checkbox\"\r\n            value=\"1\"\r\n            id=\"uploadVisibilityFollowers\"\r\n            "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"storyVisibility") : depth0),1,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":82,"column":12},"end":{"line":82,"column":79}}})) != null ? stack1 : "")
    + "\r\n          />\r\n          <label\r\n            class=\"form-check-label ms-2 display-7\"\r\n            for=\"uploadVisibilityFollowers\"\r\n          >\r\n            Followers\r\n          </label>\r\n        </div>\r\n        <div class=\"form-check d-flex align-items-center mb-2\">\r\n          <input\r\n            class=\"form-check-input visibilityCheckBox\"\r\n            type=\"checkbox\"\r\n            value=\"2\"\r\n            id=\"uploadVisbilityFriends\"\r\n            "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"storyVisibility") : depth0),2,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":97,"column":12},"end":{"line":97,"column":79}}})) != null ? stack1 : "")
    + "\r\n          />\r\n          <label\r\n            class=\"form-check-label ms-2 display-7\"\r\n            for=\"uploadVisbilityFriends\"\r\n          >\r\n            Friends\r\n          </label>\r\n        </div>\r\n        <div class=\"form-check d-flex align-items-center\">\r\n          <input\r\n            class=\"form-check-input visibilityCheckBox\"\r\n            type=\"checkbox\"\r\n            value=\"3\"\r\n            id=\"uploadVisibilityNoOne\"\r\n            "
    + ((stack1 = (lookupProperty(helpers,"isSameVisibility")||(depth0 && lookupProperty(depth0,"isSameVisibility"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"storyVisibility") : depth0),3,{"name":"isSameVisibility","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":112,"column":12},"end":{"line":112,"column":79}}})) != null ? stack1 : "")
    + "\r\n          />\r\n          <label\r\n            class=\"form-check-label ms-2 display-7\"\r\n            for=\"uploadVisibilityNoOne\"\r\n          >\r\n            No-one\r\n          </label>\r\n        </div>\r\n        <hr class=\"invisible\" />\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer d-flex w-100 flex-row\">\r\n      <button id=\"storyCollectionButton\" class=\"btn btn-primary\">Collection</button>\r\n      <button id=\"saveStoryButton\" class=\"btn btn-primary\">Save</button>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();