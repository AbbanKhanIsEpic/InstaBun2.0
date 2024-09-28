(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"btn bg-dark-subtle ms-4\">Setting</div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "          <div class=\"btn btn-primary ms-3\">Follow</div>\r\n          <div class=\"btn btn-primary ms-3\">Message</div>\r\n          <div class=\"btn btn-primary ms-3\">Block</div>\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\r\n    <div class=\"collection\" role=\"button\">\r\n      <div\r\n        class=\"d-flex justify-content-center\"\r\n        data-bs-toggle=\"modal\"\r\n        data-bs-target=\"#storyModal-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":47,"column":36},"end":{"line":47,"column":46}}}) : helper)))
    + "\"\r\n      >\r\n        <img\r\n          src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"coverPhoto") || (depth0 != null ? lookupProperty(depth0,"coverPhoto") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"coverPhoto","hash":{},"data":data,"loc":{"start":{"line":50,"column":15},"end":{"line":50,"column":29}}}) : helper)))
    + "\"\r\n          alt=\"\"\r\n          width=\"70\"\r\n          height=\"70\"\r\n          class=\"rounded-circle\"\r\n        />\r\n      </div>\r\n      <div class=\"ellipsis text-center\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"collectionTitle") || (depth0 != null ? lookupProperty(depth0,"collectionTitle") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"collectionTitle","hash":{},"data":data,"loc":{"start":{"line":57,"column":40},"end":{"line":57,"column":59}}}) : helper)))
    + "</div>\r\n    </div>\r\n    <div\r\n          class=\"modal fade overflow-hidden glassmorph\"\r\n          id=\"storyModal-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":61,"column":25},"end":{"line":61,"column":35}}}) : helper)))
    + "\"\r\n          tabindex=\"-1\"\r\n          aria-hidden=\"true\"\r\n          data-bs-backdrop=\"static\"\r\n        >\r\n          <div class=\"modal-dialog modal-dialog-centered position-relative\">\r\n            <div class=\"modal-content bg-transparent border-0\">\r\n              <div class=\"modal-header border-0 d-flex flex-column m-0 p-0\">\r\n                <div class=\"d-flex flex-row justify-content-between w-100\">\r\n                  <div>\r\n                    <img\r\n                      src=\""
    + alias4(alias5((depths[1] != null ? lookupProperty(depths[1],"profileIcon") : depths[1]), depth0))
    + "\"\r\n                      alt=\"\"\r\n                      width=\"32\"\r\n                      height=\"32\"\r\n                      class=\"rounded-circle\"\r\n                    />\r\n                    <span>"
    + alias4(alias5((depths[1] != null ? lookupProperty(depths[1],"username") : depths[1]), depth0))
    + "</span>\r\n                    <span><svg\r\n                        xmlns=\"http://www.w3.org/2000/svg\"\r\n                        width=\"16\"\r\n                        height=\"16\"\r\n                        fill=\"currentColor\"\r\n                        class=\"bi bi-dot\"\r\n                        viewBox=\"0 0 16 16\"\r\n                      >\r\n                        <path d=\"M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3\" />\r\n                      </svg></span>\r\n                    <span class=\"storyAge\">"
    + alias4((lookupProperty(helpers,"storyAge")||(depth0 && lookupProperty(depth0,"storyAge"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"stories") : depth0)) != null ? lookupProperty(stack1,"0") : stack1)) != null ? lookupProperty(stack1,"uploadDate") : stack1),{"name":"storyAge","hash":{},"data":data,"loc":{"start":{"line":89,"column":43},"end":{"line":89,"column":76}}}))
    + "</span>\r\n                  </div>\r\n                  <button\r\n                    type=\"button\"\r\n                    class=\"bg-transparent border-0\"\r\n                    data-bs-dismiss=\"modal\"\r\n                    aria-label=\"Close\"\r\n                  >\r\n                    <svg\r\n                      xmlns=\"http://www.w3.org/2000/svg\"\r\n                      width=\"24\"\r\n                      height=\"24\"\r\n                      fill=\"white\"\r\n                      class=\"bi bi-x-lg\"\r\n                      viewBox=\"0 0 16 16\"\r\n                    >\r\n                      <path\r\n                        d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n                        stroke=\"white\"\r\n                        stroke-width=\"1.5\"\r\n                      />\r\n                    </svg>\r\n                  </button>\r\n                </div>\r\n                <div class=\"w-100 d-flex flex-row gap-1\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":114,"column":16},"end":{"line":117,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n              </div>\r\n              <div class=\"modal-body p-0 m-0 bg-black bg-opacity-25\">\r\n                <div id=\"carouselStory-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":121,"column":39},"end":{"line":121,"column":49}}}) : helper)))
    + "\" class=\"carousel carousel-dark slide w-100 h-100 d-flex flex-row\">\r\n                  <div class=\"carousel-inner h-100 w-100\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":123,"column":20},"end":{"line":133,"column":29}}})) != null ? stack1 : "")
    + "                  </div>\r\n                </div>\r\n                <div class=\"position-absolute top-50 start-0 leftStory visually-hidden pointer\">\r\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"gray\" class=\"bi bi-arrow-left-circle-fill\" viewBox=\"0 0 16 16\">\r\n                    <path d=\"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z\"/>\r\n                  </svg></div>\r\n                <div class=\"position-absolute top-50 end-0 rightStory "
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stories") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),1,{"name":"ifEquals","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":140,"column":70},"end":{"line":140,"column":128}}})) != null ? stack1 : "")
    + " pointer\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"gray\" class=\"bi bi-arrow-right-circle-fill\" viewBox=\"0 0 16 16\">\r\n                  <path d=\"M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z\"/>\r\n                </svg></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <button data-bs-target=\"#carouselStory-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":115,"column":55},"end":{"line":115,"column":65}}}) : helper)))
    + "\" data-bs-slide-to=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":115,"column":85},"end":{"line":115,"column":95}}}) : helper)))
    + "\"  class=\"border-0 custom-carousel-indicator mt-2 mb-2 "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":115,"column":150},"end":{"line":115,"column":177}}})) != null ? stack1 : "")
    + "\"\r\n                  aria-label=\"Slide "
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":116,"column":36},"end":{"line":116,"column":46}}}) : helper)))
    + "\" style = \"width : "
    + alias4((lookupProperty(helpers,"width")||(depth0 && lookupProperty(depth0,"width"))||alias2).call(alias1,((stack1 = (depths[1] != null ? lookupProperty(depths[1],"stories") : depths[1])) != null ? lookupProperty(stack1,"length") : stack1),{"name":"width","hash":{},"data":data,"loc":{"start":{"line":116,"column":65},"end":{"line":116,"column":92}}}))
    + "\" disabled></button>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "active";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <div class=\"carousel-item"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":124,"column":45},"end":{"line":124,"column":74}}})) != null ? stack1 : "")
    + " w-100 h-100\">\r\n                      <div class=\"d-flex justify-content-center align-items-center h-100 user-select-none\">\r\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),1,{"name":"ifEquals","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data,"loc":{"start":{"line":126,"column":24},"end":{"line":130,"column":37}}})) != null ? stack1 : "")
    + "                      </div>\r\n                    </div>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return " active ";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <video  controls src=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"d-block h-100 object-fit-cover\" id=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":127,"column":103},"end":{"line":127,"column":113}}}) : helper)))
    + "\"></video>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img src=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"d-block h-100 object-fit-cover\" id=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":129,"column":91},"end":{"line":129,"column":101}}}) : helper)))
    + "\">\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "visually-hidden";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div class=\"post d-flex position-relative\" id="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":151,"column":50},"end":{"line":151,"column":56}}}) : helper)))
    + ">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.program(21, data, 0),"data":data,"loc":{"start":{"line":152,"column":6},"end":{"line":173,"column":13}}})) != null ? stack1 : "")
    + "    </div>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"position-absolute top-0 d-flex end-0 me-3 mt-2\">\r\n          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"25\"\r\n            height=\"25\"\r\n            fill=\"currentColor\"\r\n            class=\"bi bi-camera-video\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              fill-rule=\"evenodd\"\r\n              d=\"M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z\"\r\n            />\r\n          </svg>\r\n        </div>\r\n        <video class=\"border-1 border user-select-none content\">\r\n          <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":169,"column":23},"end":{"line":169,"column":35}}}) : helper)))
    + "\" />\r\n        </video>\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":172,"column":18},"end":{"line":172,"column":30}}}) : helper)))
    + "\" alt=\"\" />\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
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
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isCurrentUser")||(depth0 && lookupProperty(depth0,"isCurrentUser"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"userID") : depth0),{"name":"isCurrentUser","hash":{},"data":data,"loc":{"start":{"line":13,"column":14},"end":{"line":13,"column":36}}}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data,"loc":{"start":{"line":13,"column":8},"end":{"line":19,"column":15}}})) != null ? stack1 : "")
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
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"collections") : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":42,"column":1},"end":{"line":147,"column":13}}})) != null ? stack1 : "")
    + "</div>\r\n<div id=\"posts\" class=\"align-items-center overflow-y-auto\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"posts") : depth0),{"name":"each","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":150,"column":2},"end":{"line":175,"column":11}}})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useDepths":true});
})();