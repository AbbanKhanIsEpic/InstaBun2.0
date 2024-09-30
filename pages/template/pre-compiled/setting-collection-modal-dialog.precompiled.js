(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-collection-modal-dialog'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "Public";
},"3":function(container,depth0,helpers,partials,data) {
    return "Private";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"story d-flex position-relative\" id=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyID") || (depth0 != null ? lookupProperty(depth0,"storyID") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"storyID","hash":{},"data":data,"loc":{"start":{"line":81,"column":60},"end":{"line":81,"column":71}}}) : helper)))
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":82,"column":14},"end":{"line":103,"column":21}}})) != null ? stack1 : "")
    + "            </div>\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"position-absolute top-0 d-flex end-0 me-3 mt-2\">\r\n                  <svg\r\n                    xmlns=\"http://www.w3.org/2000/svg\"\r\n                    width=\"25\"\r\n                    height=\"25\"\r\n                    fill=\"currentColor\"\r\n                    class=\"bi bi-camera-video\"\r\n                    viewBox=\"0 0 16 16\"\r\n                  >\r\n                    <path\r\n                      fill-rule=\"evenodd\"\r\n                      d=\"M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"\r\n                    />\r\n                  </svg>\r\n                </div>\r\n                <video class=\"border-1 border user-select-none content\">\r\n                  <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyLink") || (depth0 != null ? lookupProperty(depth0,"storyLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storyLink","hash":{},"data":data,"loc":{"start":{"line":99,"column":31},"end":{"line":99,"column":44}}}) : helper)))
    + "\" />\r\n                </video>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"storyLink") || (depth0 != null ? lookupProperty(depth0,"storyLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"storyLink","hash":{},"data":data,"loc":{"start":{"line":102,"column":26},"end":{"line":102,"column":39}}}) : helper)))
    + "\" alt=\"\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"modal-dialog modal-dialog-centered modal-fullscreen modal-dialog-scrollable\"\r\n>\r\n  <div class=\"modal-content bg-black text-white glassmorph\">\r\n    <div class=\"modal-header d-flex flex-column p-0 position-relative pb-4\">\r\n      <h5 id=\"modalTitle\" class=\"modal-title pt-3\">Collection</h5>\r\n      <button\r\n        type=\"button\"\r\n        class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3\"\r\n        data-bs-dismiss=\"modal\"\r\n        aria-label=\"Close modal\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"24\"\r\n          height=\"24\"\r\n          fill=\"white\"\r\n          class=\"bi bi-x-lg\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n            stroke=\"white\"\r\n            stroke-width=\"1.5\"\r\n          />\r\n        </svg>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body d-flex w-100 flex-row m-0 p-0\">\r\n      <div\r\n        id=\"collectionInformationContainer\"\r\n        class=\"d-flex flex-column w-100 mt-3 ms-3 me-3 position-relative\"\r\n      >\r\n        <div class=\"d-flex flex-column align-items-center w-100 mt-5\">\r\n          <h6><strong>Collection cover:</strong></h6>\r\n          <div class=\"mt-2\">\r\n            <input\r\n              type=\"file\"\r\n              accept=\"image/*\"\r\n              class=\"position-absolute visually-hidden\"\r\n              placeholder=\"Profile icon\"\r\n              id=\"changeCollectionCover\"\r\n              aria-label=\"user upload files\"\r\n            />\r\n            <label for=\"changeCollectionCover\" role=\"button\">\r\n              <img\r\n                width=\"100\"\r\n                height=\"100\"\r\n                src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":49,"column":21},"end":{"line":49,"column":35}}}) : helper)))
    + "\"\r\n                id=\"userProfileIcon\"\r\n                class=\"rounded rounded-circle\"\r\n              />\r\n            </label>\r\n          </div>\r\n        </div>\r\n        <div\r\n          class=\"d-flex flex-row justify-content-center w-25 mt-5 input-group\"\r\n        >\r\n          <div class=\"input-group-prepend\">\r\n            <span class=\"input-group-text rounded-end-0\">Collection title:</span>\r\n          </div>\r\n          <input\r\n            type=\"text\"\r\n            class=\"form-control noBoxShadow\"\r\n            placeholder=\"Collection title\"\r\n            aria-label=\"Collection title\"\r\n            id=\"collectionTitleInput\"\r\n          />\r\n        </div>\r\n        <div class=\"d-flex flex-row align-items-center w-25 input-group\">\r\n          <div class=\"input-group-prepend w-50\">\r\n            <span class=\"input-group-text rounded-end-0\">Visibility: </span>\r\n          </div>\r\n          <div\r\n            class=\"btn btn-primary w-50\"\r\n            id=\"changeVisibilityCollectionButton\"\r\n          >"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isPublic") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":77,"column":11},"end":{"line":77,"column":55}}})) != null ? stack1 : "")
    + "</div>\r\n        </div>\r\n        <div id=\"stories\" class=\"col vh-100 w-100 overflow-x-hidden\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":80,"column":10},"end":{"line":105,"column":19}}})) != null ? stack1 : "")
    + "        </div>\r\n        <hr class=\"invisible\" />\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer d-flex w-100 flex-row\">\r\n      <button id=\"savePostButton\" class=\"btn btn-primary\">Save</button>\r\n      <button id=\"deletePostButton\" class=\"btn btn-danger\">Delete</button>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();