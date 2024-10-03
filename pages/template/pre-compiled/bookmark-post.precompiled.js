(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['bookmark-post'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div\r\n              class=\"post d-flex position-relative\"\r\n              id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"postID") || (depth0 != null ? lookupProperty(depth0,"postID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postID","hash":{},"data":data,"loc":{"start":{"line":41,"column":18},"end":{"line":41,"column":28}}}) : helper)))
    + "\"\r\n              onclick=\"window.location.href='http://127.0.0.1:5500/pages/discover.html?postID="
    + alias4(((helper = (helper = lookupProperty(helpers,"postID") || (depth0 != null ? lookupProperty(depth0,"postID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"postID","hash":{},"data":data,"loc":{"start":{"line":42,"column":94},"end":{"line":42,"column":104}}}) : helper)))
    + "'\"\r\n            >\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":44,"column":14},"end":{"line":65,"column":21}}})) != null ? stack1 : "")
    + "            </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"position-absolute top-0 d-flex end-0 me-3 mt-2\">\r\n                  <svg\r\n                    xmlns=\"http://www.w3.org/2000/svg\"\r\n                    width=\"25\"\r\n                    height=\"25\"\r\n                    fill=\"currentColor\"\r\n                    class=\"bi bi-camera-video\"\r\n                    viewBox=\"0 0 16 16\"\r\n                  >\r\n                    <path\r\n                      fill-rule=\"evenodd\"\r\n                      d=\"M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"\r\n                    />\r\n                  </svg>\r\n                </div>\r\n                <video class=\"border-1 border user-select-none content\">\r\n                  <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":61,"column":31},"end":{"line":61,"column":43}}}) : helper)))
    + "\" />\r\n                </video>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":64,"column":26},"end":{"line":64,"column":38}}}) : helper)))
    + "\" alt=\"\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"modal-dialog modal-dialog-centered modal-fullscreen modal-dialog-scrollable\"\r\n>\r\n  <div class=\"modal-content bg-black text-white glassmorph\">\r\n    <div class=\"modal-header d-flex flex-column p-0 position-relative pb-4\">\r\n      <h5 id=\"modalTitle\" class=\"modal-title pt-3\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"Title") || (depth0 != null ? lookupProperty(depth0,"Title") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"Title","hash":{},"data":data,"loc":{"start":{"line":6,"column":51},"end":{"line":6,"column":60}}}) : helper)))
    + "</h5>\r\n      <button\r\n        type=\"button\"\r\n        class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3\"\r\n        data-bs-dismiss=\"modal\"\r\n        aria-label=\"Close modal\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"24\"\r\n          height=\"24\"\r\n          fill=\"white\"\r\n          class=\"bi bi-x-lg\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n            stroke=\"white\"\r\n            stroke-width=\"1.5\"\r\n          />\r\n        </svg>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body d-flex w-100 flex-row m-0 p-0\">\r\n      <div\r\n        id=\"newBookmarkInformationContainer\"\r\n        class=\"d-flex flex-column w-100 mt-3 ms-3 me-3 position-relative\"\r\n      >\r\n        <div\r\n          id=\"posts\"\r\n          class=\"col w-100 overflow-x-hidden mb-5 overflow-y-auto h-auto\"\r\n        >\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"posts") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":38,"column":10},"end":{"line":67,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n        <hr class=\"invisible\" />\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();