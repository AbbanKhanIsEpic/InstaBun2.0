(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['message-container'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "onclick=\"window.open('http://127.0.0.1:5500/pages/profile.html?userID="
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"id","hash":{},"data":data,"loc":{"start":{"line":11,"column":92},"end":{"line":11,"column":98}}}) : helper)))
    + "', '_self');\"\r\n      role=\"button\"";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div\r\n  class=\"w-100 pt-3 ps-3 pb-3 border-bottom d-flex flex-row align-items-center justify-content-between border-dark user-select-none\"\r\n>\r\n  <div>\r\n    <img\r\n      src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":6,"column":11},"end":{"line":6,"column":26}}}) : helper)))
    + "\"\r\n      alt=\"\"\r\n      width=\"56\"\r\n      height=\"56\"\r\n      class=\"rounded-circle me-2\"\r\n      "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isDirect") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":11,"column":6},"end":{"line":12,"column":26}}})) != null ? stack1 : "")
    + "\r\n    />\r\n    <span> <strong>"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":14,"column":19},"end":{"line":14,"column":27}}}) : helper)))
    + "</strong></span>\r\n  </div>\r\n  <div class=\"pe-2\" id=\"moreInfo\"><svg\r\n      xmlns=\"http://www.w3.org/2000/svg\"\r\n      width=\"24\"\r\n      height=\"24\"\r\n      fill=\"currentColor\"\r\n      class=\"bi bi-info-circle\"\r\n      viewBox=\"0 0 16 16\"\r\n    >\r\n      <path\r\n        d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"\r\n      />\r\n      <path\r\n        d=\"m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0\"\r\n      />\r\n    </svg></div>\r\n</div>\r\n<div id=\"messageOutput\" class=\"d-flex flex-column w-100 overflow-y-auto h-100\">\r\n</div>\r\n<div class=\"w-100 d-flex align-items-center ps-4 pe-3 bg-black\" id=\"messageBar\">\r\n  <form class=\"input-group d-flex border rounded-5 w-100\">\r\n    <div\r\n      class=\"input-group-text bg-transparent border-0 d-flex\"\r\n      data-bs-toggle=\"modal\"\r\n      data-bs-target=\"#emojiSelector\"\r\n      onclick=\"setTarget(this)\"\r\n    >\r\n      <svg\r\n        xmlns=\"http://www.w3.org/2000/svg\"\r\n        width=\"24\"\r\n        height=\"24\"\r\n        fill=\"white\"\r\n        class=\"bi bi-emoji-smile\"\r\n        viewBox=\"0 0 16 16\"\r\n      >\r\n        <path\r\n          d=\"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16\"\r\n        />\r\n        <path\r\n          d=\"M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5\"\r\n        />\r\n      </svg>\r\n    </div>\r\n    <div\r\n      role=\"textbox\"\r\n      aria-multiline=\"true\"\r\n      id=\"messageTextArea\"\r\n      class=\"text-white bg-black border-0 d-flex form-control noBoxShadow ps-0 pe-0 me-0 ms-0 overflow-y-auto overflow-x-hidden text-wrap text-break input\"\r\n      data-placeholder=\"Message...\"\r\n      contenteditable=\"true\"\r\n    ></div>\r\n    <div\r\n      class=\"input-group-text bg-transparent border-0 d-flex text-primary invisible\"\r\n      id=\"sendMessageBtn\"\r\n      role=\"button\"\r\n    >\r\n      Post\r\n    </div>\r\n  </form>\r\n</div>";
},"useData":true});
})();