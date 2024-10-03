(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['conversation-info'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "";
},"3":function(container,depth0,helpers,partials,data) {
    return "modal-fullscreen";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"name","hash":{},"data":data,"loc":{"start":{"line":16,"column":44},"end":{"line":16,"column":52}}}) : helper)))
    + "'s profile icon:";
},"7":function(container,depth0,helpers,partials,data) {
    return "Group profile icon:";
},"9":function(container,depth0,helpers,partials,data) {
    return "id=\"changeGroupProfileIcon\" ";
},"11":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"13":function(container,depth0,helpers,partials,data) {
    return "id=\"showNewIcon\"\r\n                            ";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <form class=\"input-group w-100 mt-3\">\r\n                <span class=\"input-group-text bg-transparent text-white border-0\"><strong>Group name:</strong></span>\r\n                <input type=\"text\" class=\"form-control bg-transparent text-white border-0 noBoxShadow\"\r\n                    placeholder=\"Enter a group name...\" id=\"changeGroupNameInput\" value=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":32,"column":89},"end":{"line":32,"column":97}}}) : helper)))
    + " \" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGroupOwner") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(11, data, 0),"data":data,"loc":{"start":{"line":32,"column":100},"end":{"line":33,"column":57}}})) != null ? stack1 : "")
    + " />\r\n            </form>\r\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "            <div class=\"d-flex flex-row mb-2 mb-2 justify-content-center\">\r\n                <div id=\"addNewMemberButton\" class=\"me-2 d-flex justify-content-center\" role=\"button\">\r\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"currentColor\"\r\n                        class=\"bi bi-person-add\" viewBox=\"0 0 16 16\">\r\n                        <path\r\n                            d=\"M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4\" />\r\n                        <path\r\n                            d=\"M8.256 14a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1z\" />\r\n                    </svg>\r\n                </div>\r\n                Add new member/s\r\n            </div>\r\n";
},"19":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "            <div class=\"modal-body d-flex w-100 d-flex flex-column overflow-y-auto gap-4 p-0 m-0\"\r\n                id=\"showCaseMemberNewGroup\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"members") : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":58,"column":16},"end":{"line":77,"column":25}}})) != null ? stack1 : "")
    + "            </div>\r\n";
},"20":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                <div class=\"user d-flex flex-row justify-content-between align-items-center w-100\">\r\n                    <div class=\"w-100 ps-4 d-flex flex-row align-items-center\">\r\n                        <img src="
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"profileIcon") : stack1), depth0))
    + " alt=\"\" width=\"44\" height=\"44\" class=\"rounded-circle me-2\" />\r\n                        <div class=\"d-flex flex-column\">\r\n                            <span aria-label=\"display name\">\r\n                                "
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"displayName") : stack1), depth0))
    + "\r\n                            </span>\r\n                            <span class=\"text-white-50\" aria-label=\"username\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? lookupProperty(stack1,"username") : stack1), depth0))
    + "</span>\r\n                        </div>\r\n                    </div>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? lookupProperty(depths[1],"isGroupOwner") : depths[1]),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":69,"column":20},"end":{"line":75,"column":27}}})) != null ? stack1 : "")
    + "                </div>\r\n";
},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(alias1,(lookupProperty(helpers,"isGroupOwner")||(depth0 && lookupProperty(depth0,"isGroupOwner"))||container.hooks.helperMissing).call(alias1,((stack1 = blockParams[1][0]) != null ? lookupProperty(stack1,"userID") : stack1),(depths[1] != null ? lookupProperty(depths[1],"ownerID") : depths[1]),{"name":"isGroupOwner","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":70,"column":26},"end":{"line":70,"column":63}}}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(22, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":70,"column":20},"end":{"line":74,"column":27}}})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                    <button class=\"btn btn-warning h-75 w-50 me-4 transferOwnership\" id="
    + alias2(alias1(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"userID") : stack1), depth0))
    + ">Give 👑</button>\r\n                    <button class=\"btn btn-danger h-75 w-25 me-4 removeMember\" id="
    + alias2(alias1(((stack1 = blockParams[2][0]) != null ? lookupProperty(stack1,"userID") : stack1), depth0))
    + ">Remove</button>\r\n";
},"24":function(container,depth0,helpers,partials,data) {
    return "border-0";
},"26":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"btn btn-primary\" id=\"updateGroupButton\">\r\n                    Update group\r\n                </button>\r\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "direct";
},"30":function(container,depth0,helpers,partials,data) {
    return "group";
},"32":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"isGroupOwner") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(33, data, 0),"data":data,"loc":{"start":{"line":89,"column":16},"end":{"line":92,"column":23}}})) != null ? stack1 : "");
},"33":function(container,depth0,helpers,partials,data) {
    return "                <button class=\"btn btn-danger\" id=\"leaveGroupButton\">Leave</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"modal-dialog modal-dialog-centered "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":1,"column":47},"end":{"line":1,"column":94}}})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"modal-content bg-black text-white glassmorph\">\r\n        <div class=\"modal-header d-flex flex-column p-0 border-0 position-relative\">\r\n            <h5 class=\"modal-title pt-3\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":4,"column":41},"end":{"line":4,"column":49}}}) : helper)))
    + "</h5>\r\n            <button type=\"button\" class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3 closeModal\"\r\n                data-bs-dismiss=\"modal\" aria-label=\"Close\">\r\n                <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" fill=\"white\" class=\"bi bi-x-lg\"\r\n                    viewBox=\"0 0 16 16\">\r\n                    <path\r\n                        d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n                        stroke=\"white\" stroke-width=\"1.5\" />\r\n                </svg>\r\n            </button>\r\n            <hr class=\"w-100 border-white border-2\" />\r\n            <form class=\"input-group w-100 d-flex justify-content-center align-items-center flex-column\">\r\n                <h6><strong>"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":16,"column":28},"end":{"line":16,"column":102}}})) != null ? stack1 : "")
    + "</strong></h6>\r\n                <div>\r\n                    <input type=\"file\" accept=\"image/*\" class=\"position-absolute visually-hidden\"\r\n                        placeholder=\"Profile icon\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":19,"column":51},"end":{"line":19,"column":110}}})) != null ? stack1 : "")
    + "\r\n                        aria-label=\"user upload files\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":20,"column":55},"end":{"line":20,"column":86}}})) != null ? stack1 : "")
    + " "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGroupOwner") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":20,"column":87},"end":{"line":21,"column":61}}})) != null ? stack1 : "")
    + " />\r\n                    <label for=\"changeGroupProfileIcon\" role=\"button\">\r\n                        <img width=\"100\" height=\"100\" src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"blockParams":blockParams,"loc":{"start":{"line":23,"column":59},"end":{"line":23,"column":74}}}) : helper)))
    + "\" "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":23,"column":76},"end":{"line":24,"column":35}}})) != null ? stack1 : "")
    + " alt=\"please select something to upload\" class=\"rounded rounded-circle\" /></label>\r\n                </div>\r\n            </form>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(15, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":27,"column":12},"end":{"line":35,"column":19}}})) != null ? stack1 : "")
    + "            <hr class=\"w-100 border-white border-2\" />\r\n        </div>\r\n        <div class=\"modal-body d-flex w-100 d-flex flex-column overflow-y-auto gap-4\">\r\n\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGroupOwner") : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":40,"column":12},"end":{"line":53,"column":19}}})) != null ? stack1 : "")
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(19, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":54,"column":12},"end":{"line":79,"column":19}}})) != null ? stack1 : "")
    + "            <div class=\"modal-footer w-100 d-flex justify-content-center align-items-center "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":80,"column":92},"end":{"line":80,"column":123}}})) != null ? stack1 : "")
    + "\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isGroupOwner") : depth0),{"name":"if","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams,"loc":{"start":{"line":81,"column":28},"end":{"line":85,"column":35}}})) != null ? stack1 : "")
    + "                <button class=\"btn btn-primary\" id=\"clearMessage\">Clear "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0, blockParams, depths),"inverse":container.program(30, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":86,"column":72},"end":{"line":86,"column":114}}})) != null ? stack1 : "")
    + " messages</button>\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(32, data, 0, blockParams, depths),"data":data,"blockParams":blockParams,"loc":{"start":{"line":87,"column":16},"end":{"line":93,"column":23}}})) != null ? stack1 : "")
    + "            </div>\r\n        </div>\r\n</div>";
},"useData":true,"useDepths":true,"useBlockParams":true});
})();