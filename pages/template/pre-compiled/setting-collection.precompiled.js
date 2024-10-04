(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-collection'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div\r\n      class=\"collection d-flex position-relative flex-column border-1 border\"\r\n      id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionID") || (depth0 != null ? lookupProperty(depth0,"collectionID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionID","hash":{},"data":data,"loc":{"start":{"line":57,"column":10},"end":{"line":57,"column":26}}}) : helper)))
    + "\" data-bs-toggle=\"modal\" data-bs-target=\"#storyModal-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":57,"column":79},"end":{"line":57,"column":89}}}) : helper)))
    + "\"\r\n    >\r\n      <h5>"
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionTitle") || (depth0 != null ? lookupProperty(depth0,"collectionTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionTitle","hash":{},"data":data,"loc":{"start":{"line":59,"column":10},"end":{"line":59,"column":29}}}) : helper)))
    + "</h5>\r\n      <img src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":60,"column":16},"end":{"line":60,"column":30}}}) : helper)))
    + "\" alt=\"\" />\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"modal fade overflow-hidden glassmorph\" id=\"storyModal-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":65,"column":68},"end":{"line":65,"column":78}}}) : helper)))
    + "\" tabindex=\"-1\" aria-hidden=\"true\"\r\n    data-bs-backdrop=\"static\">\r\n    <div class=\"modal-dialog modal-dialog-centered position-relative\">\r\n      <div class=\"modal-content bg-transparent border-0\">\r\n        <div class=\"modal-header border-0 d-flex flex-column m-0 p-0\">\r\n          <div class=\"d-flex flex-row justify-content-between w-100\">\r\n            <div>\r\n              <img src=\""
    + alias4(alias5((depths[1] != null ? lookupProperty(depths[1],"profileIcon") : depths[1]), depth0))
    + "\" alt=\"\" width=\"32\" height=\"32\" class=\"rounded-circle\" />\r\n              <span>"
    + alias4(alias5((depths[1] != null ? lookupProperty(depths[1],"username") : depths[1]), depth0))
    + "</span>\r\n              <span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-dot\"\r\n                  viewBox=\"0 0 16 16\">\r\n                  <path d=\"M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3\" />\r\n                </svg></span>\r\n              <span class=\"storyAge\">"
    + alias4((lookupProperty(helpers,"storyAge")||(depth0 && lookupProperty(depth0,"storyAge"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"stories") : depth0)) != null ? lookupProperty(stack1,"0") : stack1)) != null ? lookupProperty(stack1,"uploadDate") : stack1),{"name":"storyAge","hash":{},"data":data,"loc":{"start":{"line":78,"column":37},"end":{"line":78,"column":70}}}))
    + "</span>\r\n            </div>\r\n            <button type=\"button\" class=\"bg-transparent border-0\" data-bs-dismiss=\"modal\" aria-label=\"Close\">\r\n              <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"white\" class=\"bi bi-x-lg\"\r\n                viewBox=\"0 0 16 16\">\r\n                <path\r\n                  d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n                  stroke=\"white\" stroke-width=\"1.5\" />\r\n              </svg>\r\n            </button>\r\n          </div>\r\n          <div class=\"w-100 d-flex flex-row gap-1\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":90,"column":12},"end":{"line":94,"column":21}}})) != null ? stack1 : "")
    + "          </div>\r\n        </div>\r\n        <div class=\"modal-body p-0 m-0 bg-black bg-opacity-25\">\r\n          <div id=\"carouselStory-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":98,"column":33},"end":{"line":98,"column":43}}}) : helper)))
    + "\" class=\"carousel carousel-dark slide w-100 h-100 d-flex flex-row\">\r\n            <div class=\"carousel-inner h-100 w-100\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":100,"column":14},"end":{"line":110,"column":23}}})) != null ? stack1 : "")
    + "            </div>\r\n          </div>\r\n          <div class=\"position-absolute top-50 start-0 leftStory visually-hidden pointer\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"gray\"\r\n              class=\"bi bi-arrow-left-circle-fill\" viewBox=\"0 0 16 16\">\r\n              <path\r\n                d=\"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z\" />\r\n            </svg>\r\n          </div>\r\n          <div\r\n            class=\"position-absolute top-50 end-0 rightStory "
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stories") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),1,{"name":"ifEquals","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":121,"column":61},"end":{"line":121,"column":119}}})) != null ? stack1 : "")
    + " pointer\">\r\n            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"gray\"\r\n              class=\"bi bi-arrow-right-circle-fill\" viewBox=\"0 0 16 16\">\r\n              <path\r\n                d=\"M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z\" />\r\n            </svg></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <button data-bs-target=\"#carouselStory-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":91,"column":51},"end":{"line":91,"column":61}}}) : helper)))
    + "\" data-bs-slide-to=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":91,"column":81},"end":{"line":91,"column":91}}}) : helper)))
    + "\"\r\n              class=\"border-0 custom-carousel-indicator mt-2 mb-2 "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":92,"column":66},"end":{"line":92,"column":93}}})) != null ? stack1 : "")
    + "\"\r\n              aria-label=\"Slide "
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":93,"column":32},"end":{"line":93,"column":42}}}) : helper)))
    + "\" style=\"width : "
    + alias4((lookupProperty(helpers,"width")||(depth0 && lookupProperty(depth0,"width"))||alias2).call(alias1,((stack1 = (depths[1] != null ? lookupProperty(depths[1],"stories") : depths[1])) != null ? lookupProperty(stack1,"length") : stack1),{"name":"width","hash":{},"data":data,"loc":{"start":{"line":93,"column":59},"end":{"line":93,"column":86}}}))
    + "\" disabled></button>\r\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "active";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "              <div class=\"carousel-item"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":101,"column":39},"end":{"line":101,"column":68}}})) != null ? stack1 : "")
    + " w-100 h-100\">\r\n                <div class=\"d-flex justify-content-center align-items-center h-100 user-select-none\">\r\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),1,{"name":"ifEquals","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":103,"column":18},"end":{"line":107,"column":31}}})) != null ? stack1 : "")
    + "                </div>\r\n              </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return " active ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                  <video controls src=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"d-block h-100 object-fit-cover\" id=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":104,"column":96},"end":{"line":104,"column":106}}}) : helper)))
    + "\"></video>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                  <img src=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"d-block h-100 object-fit-cover\" id=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":106,"column":85},"end":{"line":106,"column":95}}}) : helper)))
    + "\">\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "visually-hidden";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"d-flex flex-column align-items-start justify-content-center w-100 mt-2 ms-2 mb-5\"\r\n>\r\n  <div class=\"d-flex flex-row w-100\">\r\n    <div\r\n      class=\"d-flex align-items-center position-relative searchBar ps-4 pe-4 pt-4 w-100\"\r\n    >\r\n      <input class=\"form-control\" type=\"text\" id=\"searchCollectionInput\" />\r\n      <button\r\n        type=\" button\"\r\n        class=\"btn btn-primary ms-3\"\r\n        id=\"searchCollectionButton\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"16\"\r\n          height=\"16\"\r\n          fill=\"currentColor\"\r\n          class=\"bi bi-search\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0\"\r\n          />\r\n        </svg>\r\n      </button>\r\n      <button\r\n        type=\"button\"\r\n        class=\"btn btn-primary ms-3\"\r\n        id=\"createCollectionButton\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"16\"\r\n          height=\"16\"\r\n          fill=\"currentColor\"\r\n          class=\"bi bi-plus-square\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z\"\r\n          />\r\n          <path\r\n            d=\"M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4\"\r\n          />\r\n        </svg></button>\r\n    </div>\r\n  </div>\r\n</div>\r\n<div\r\n  id=\"collections\"\r\n  class=\"col w-100 overflow-x-hidden mb-5 overflow-y-auto h-auto\"\r\n>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":54,"column":2},"end":{"line":62,"column":11}}})) != null ? stack1 : "")
    + "</div>\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":64,"column":0},"end":{"line":131,"column":9}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();