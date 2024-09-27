(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['story'] = template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class=\"story-icon\" id=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":2,"column":36},"end":{"line":2,"column":46}}}) : helper)))
    + "\">\r\n            <div\r\n              class=\"rounded-circle story-icon-background "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasCloseFriend") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":4,"column":58},"end":{"line":4,"column":98}}})) != null ? stack1 : "")
    + " d-flex justify-content-center align-items-center\"\r\n              data-bs-toggle=\"modal\"\r\n              data-bs-target=\"#storyModal-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":6,"column":42},"end":{"line":6,"column":52}}}) : helper)))
    + "\"\r\n            >\r\n              <img\r\n                src="
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":9,"column":20},"end":{"line":9,"column":35}}}) : helper)))
    + "\r\n                alt=\"\"\r\n                width=\"66\"\r\n                height=\"66\"\r\n                class=\"rounded-circle\"\r\n              />\r\n            </div>\r\n            <div class=\"story-icon-username text-center\">\r\n              "
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":17,"column":14},"end":{"line":17,"column":26}}}) : helper)))
    + "\r\n            </div>\r\n        </div>\r\n        <div\r\n          class=\"modal fade overflow-hidden glassmorph\"\r\n          id=\"storyModal-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":22,"column":25},"end":{"line":22,"column":35}}}) : helper)))
    + "\"\r\n          tabindex=\"-1\"\r\n          aria-hidden=\"true\"\r\n          data-bs-backdrop=\"static\"\r\n        >\r\n          <div class=\"modal-dialog modal-dialog-centered position-relative\">\r\n            <div class=\"modal-content bg-transparent border-0\">\r\n              <div class=\"modal-header border-0 d-flex flex-column m-0 p-0\">\r\n                <div class=\"d-flex flex-row justify-content-between w-100\">\r\n                  <div>\r\n                    <img\r\n                      src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":33,"column":27},"end":{"line":33,"column":42}}}) : helper)))
    + "\"\r\n                      alt=\"\"\r\n                      width=\"32\"\r\n                      height=\"32\"\r\n                      class=\"rounded-circle\"\r\n                    />\r\n                    <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":39,"column":26},"end":{"line":39,"column":38}}}) : helper)))
    + "</span>\r\n                    <span><svg\r\n                        xmlns=\"http://www.w3.org/2000/svg\"\r\n                        width=\"16\"\r\n                        height=\"16\"\r\n                        fill=\"currentColor\"\r\n                        class=\"bi bi-dot\"\r\n                        viewBox=\"0 0 16 16\"\r\n                      >\r\n                        <path d=\"M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3\" />\r\n                      </svg></span>\r\n                    <span class=\"storyAge\">"
    + alias4((lookupProperty(helpers,"storyAge")||(depth0 && lookupProperty(depth0,"storyAge"))||alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? lookupProperty(depth0,"stories") : depth0)) != null ? lookupProperty(stack1,"0") : stack1)) != null ? lookupProperty(stack1,"uploadDate") : stack1),{"name":"storyAge","hash":{},"data":data,"loc":{"start":{"line":50,"column":43},"end":{"line":50,"column":76}}}))
    + "</span>\r\n                  </div>\r\n                  <button\r\n                    type=\"button\"\r\n                    class=\"bg-transparent border-0\"\r\n                    data-bs-dismiss=\"modal\"\r\n                    aria-label=\"Close\"\r\n                  >\r\n                    <svg\r\n                      xmlns=\"http://www.w3.org/2000/svg\"\r\n                      width=\"24\"\r\n                      height=\"24\"\r\n                      fill=\"white\"\r\n                      class=\"bi bi-x-lg\"\r\n                      viewBox=\"0 0 16 16\"\r\n                    >\r\n                      <path\r\n                        d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n                        stroke=\"white\"\r\n                        stroke-width=\"1.5\"\r\n                      />\r\n                    </svg>\r\n                  </button>\r\n                </div>\r\n                <div class=\"w-100 d-flex flex-row gap-1\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":75,"column":16},"end":{"line":78,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n              </div>\r\n              <div class=\"modal-body p-0 m-0 bg-black bg-opacity-25\">\r\n                <div id=\"carouselStory-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":82,"column":39},"end":{"line":82,"column":49}}}) : helper)))
    + "\" class=\"carousel carousel-dark slide w-100 h-100 d-flex flex-row\">\r\n                  <div class=\"carousel-inner h-100 w-100\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"stories") : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":84,"column":20},"end":{"line":94,"column":29}}})) != null ? stack1 : "")
    + "                  </div>\r\n                </div>\r\n                <div class=\"position-absolute top-50 start-0 leftStory visually-hidden pointer\">\r\n                  <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"gray\" class=\"bi bi-arrow-left-circle-fill\" viewBox=\"0 0 16 16\">\r\n                    <path d=\"M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z\"/>\r\n                  </svg></div>\r\n                <div class=\"position-absolute top-50 end-0 rightStory "
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"stories") : depth0)) != null ? lookupProperty(stack1,"length") : stack1),1,{"name":"ifEquals","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":101,"column":70},"end":{"line":101,"column":128}}})) != null ? stack1 : "")
    + " pointer\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" fill=\"gray\" class=\"bi bi-arrow-right-circle-fill\" viewBox=\"0 0 16 16\">\r\n                  <path d=\"M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z\"/>\r\n                </svg></div>\r\n              </div>\r\n              <div class=\"modal-footer bg-transparent border-0 ps-0 pe-0 d-flex flex-row input-group\">\r\n                <input\r\n                type=\"text\"\r\n                name=\"\"\r\n                id=\"\"\r\n                class=\"form-control rounded rounded-3 text-dark m-0 input\"\r\n              />\r\n              <button class=\"btn bg-primary ms-2 rounded-3\"  data-bs-toggle=\"modal\"\r\n          data-bs-target=\"#emojiSelector\"\r\n          onclick=\"setTarget(this)\">Emoji</button>\r\n              <button class=\"btn bg-primary ms-2 rounded-3\">Send</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "closeFriend";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <button data-bs-target=\"#carouselStory-"
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":76,"column":55},"end":{"line":76,"column":65}}}) : helper)))
    + "\" data-bs-slide-to=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":76,"column":85},"end":{"line":76,"column":95}}}) : helper)))
    + "\"  class=\"border-0 custom-carousel-indicator mt-2 mb-2 "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":76,"column":150},"end":{"line":76,"column":177}}})) != null ? stack1 : "")
    + "\"\r\n                  aria-label=\"Slide "
    + alias4(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data,"loc":{"start":{"line":77,"column":36},"end":{"line":77,"column":46}}}) : helper)))
    + "\" style = \"width : "
    + alias4((lookupProperty(helpers,"width")||(depth0 && lookupProperty(depth0,"width"))||alias2).call(alias1,((stack1 = (depths[1] != null ? lookupProperty(depths[1],"stories") : depths[1])) != null ? lookupProperty(stack1,"length") : stack1),{"name":"width","hash":{},"data":data,"loc":{"start":{"line":77,"column":65},"end":{"line":77,"column":92}}}))
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

  return "                    <div class=\"carousel-item"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"first")),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":85,"column":45},"end":{"line":85,"column":74}}})) != null ? stack1 : "")
    + " w-100 h-100\">\r\n                      <div class=\"d-flex justify-content-center align-items-center h-100 user-select-none\">\r\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||container.hooks.helperMissing).call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),1,{"name":"ifEquals","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":87,"column":24},"end":{"line":91,"column":37}}})) != null ? stack1 : "")
    + "                      </div>\r\n                    </div>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return " active ";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <video  controls src=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"d-block h-100 object-fit-cover\" id=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":88,"column":103},"end":{"line":88,"column":113}}}) : helper)))
    + "\"></video>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                        <img src=\""
    + alias1(container.lambda((depth0 != null ? lookupProperty(depth0,"url") : depth0), depth0))
    + "\" class=\"d-block h-100 object-fit-cover\" id=\""
    + alias1(((helper = (helper = lookupProperty(helpers,"index") || (data && lookupProperty(data,"index"))) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"index","hash":{},"data":data,"loc":{"start":{"line":90,"column":91},"end":{"line":90,"column":101}}}) : helper)))
    + "\">\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "visually-hidden";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"users") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":1},"end":{"line":120,"column":15}}})) != null ? stack1 : "");
},"useData":true,"useDepths":true});
})();