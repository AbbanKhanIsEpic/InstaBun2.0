(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['conversation-info'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":44},"end":{"line":16,"column":52}}}) : helper)))
    + "'s profile icon:";
},"3":function(container,depth0,helpers,partials,data) {
    return "Group profile icon:";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"7":function(container,depth0,helpers,partials,data) {
    return "id=\"changeGroupProfileIcon\" ";
},"9":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"11":function(container,depth0,helpers,partials,data) {
    return "id=\"showNewIcon\"\r\n                            ";
},"13":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <form class=\"input-group w-100 mt-3\">\r\n            <span class=\"input-group-text bg-transparent text-white border-0\"><strong>Group name:</strong></span>\r\n            <input type=\"text\" class=\"form-control bg-transparent text-white border-0 noBoxShadow\"\r\n                placeholder=\"Enter a group name...\" id=\"changeGroupNameInput\" value=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":31,"column":85},"end":{"line":31,"column":93}}}) : helper)))
    + "\" />\r\n            </form>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"modal-body d-flex w-100 d-flex flex-column overflow-y-auto gap-4\">\r\n            <button class=\"btn btn-primary\">Clear direct message</button>\r\n        </div>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "        <div class=\"modal-body d-flex w-100 d-flex flex-column overflow-y-auto gap-4\" id=\"showCaseMemberNewGroup\"></div>\r\n                <div class=\"modal-footer w-100 d-flex justify-content-center align-items-center\">\r\n            <button class=\"btn btn-primary w-100\" id=\"updateGroupButton\">\r\n                Update group\r\n            </button>\r\n        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal-dialog modal-dialog-centered\">\r\n    <div class=\"modal-content bg-black text-white glassmorph\">\r\n        <div class=\"modal-header d-flex flex-column p-0 border-0 position-relative\">\r\n            <h5 class=\"modal-title pt-3\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":49}}}) : helper)))
    + "</h5>\r\n            <button type=\"button\" class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3 closeModal\"\r\n                data-bs-dismiss=\"modal\" aria-label=\"Close\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"white\" class=\"bi bi-x-lg\"\r\n                    viewBox=\"0 0 16 16\">\r\n                    <path\r\n                        d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n                        stroke=\"white\" stroke-width=\"1.5\" />\r\n                </svg>\r\n            </button>\r\n            <hr class=\"w-100 border-white border-2\" />\r\n            <form class=\"input-group w-100 d-flex justify-content-center align-items-center flex-column\">\r\n                <h6><strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data,"loc":{"start":{"line":16,"column":28},"end":{"line":16,"column":102}}})) != null ? stack1 : "")
    + "</strong></h6>\r\n                <div>\r\n                    <input type=\"file\" accept=\"image/*\" class=\"position-absolute visually-hidden\"\r\n                        placeholder=\"Profile icon\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data,"loc":{"start":{"line":19,"column":51},"end":{"line":19,"column":110}}})) != null ? stack1 : "")
    + "\r\n                        aria-label=\"user upload files\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":55},"end":{"line":20,"column":86}}})) != null ? stack1 : "")
    + " />\r\n                    <label for=\"changeGroupProfileIcon\" role=\"button\">\r\n                        <img width=\"100\" height=\"100\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":22,"column":59},"end":{"line":22,"column":74}}}) : helper)))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":22,"column":76},"end":{"line":23,"column":35}}})) != null ? stack1 : "")
    + " alt=\"please select something to upload\" class=\"rounded rounded-circle\" /></label>\r\n                </div>\r\n            </form>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(13, data, 0),"data":data,"loc":{"start":{"line":26,"column":12},"end":{"line":33,"column":19}}})) != null ? stack1 : "")
    + "            <hr class=\"w-100 border-white border-2\" />\r\n        </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.program(17, data, 0),"data":data,"loc":{"start":{"line":36,"column":8},"end":{"line":47,"column":15}}})) != null ? stack1 : "")
    + "    </div>\r\n</div>";
},"useData":true});
})();