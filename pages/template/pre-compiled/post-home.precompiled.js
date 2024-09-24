(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post-home'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "  <div class=\"card bg-black post\" data-post-id="
    + alias4(((helper = (helper = lookupProperty(helpers,"id") || (depth0 != null ? lookupProperty(depth0,"id") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data,"loc":{"start":{"line":2,"column":47},"end":{"line":2,"column":53}}}) : helper)))
    + ">\r\n    <div\r\n      class=\"card-header d-flex flex-row justify-content-between text-white mb-2\"\r\n    >\r\n      <div class=\"uploader\">\r\n        <img\r\n          src=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"profileIcon") || (depth0 != null ? lookupProperty(depth0,"profileIcon") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profileIcon","hash":{},"data":data,"loc":{"start":{"line":8,"column":15},"end":{"line":8,"column":30}}}) : helper)))
    + "\"\r\n          alt=\"\"\r\n          width=\"32\"\r\n          height=\"32\"\r\n          class=\"rounded-circle\"\r\n        />\r\n        <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":14,"column":14},"end":{"line":14,"column":26}}}) : helper)))
    + "</span>\r\n        <span><svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"16\"\r\n            height=\"16\"\r\n            fill=\"currentColor\"\r\n            class=\"bi bi-dot\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path d=\"M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3\" />\r\n          </svg></span>\r\n        <span>"
    + alias4((lookupProperty(helpers,"postAge")||(depth0 && lookupProperty(depth0,"postAge"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"uploadDate") : depth0),{"name":"postAge","hash":{},"data":data,"loc":{"start":{"line":25,"column":14},"end":{"line":25,"column":36}}}))
    + "</span>\r\n      </div>\r\n    </div>\r\n    <div class=\"contentContainer\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"isVideo") : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":29,"column":6},"end":{"line":35,"column":13}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"interactions d-flex flex-row justify-content-between mt-2\">\r\n      <div class=\"d-flex flex-row gap-3 align-items-center\">\r\n        <div class=\"like-button\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasLiked") : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data,"loc":{"start":{"line":40,"column":10},"end":{"line":67,"column":17}}})) != null ? stack1 : "")
    + "        </div>\r\n        <div\r\n          role=\"button\"\r\n          data-bs-toggle=\"modal\"\r\n          data-bs-target=\"#viewComments\"\r\n        >\r\n          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-chat postInteraction\"\r\n            viewBox=\"0 1 16 16\"\r\n          >\r\n            <path\r\n              d=\"M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105\"\r\n            />\r\n          </svg>\r\n        </div>\r\n        <div role=\"button\">\r\n          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-share postInteraction\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3\"\r\n            />\r\n          </svg>\r\n        </div>\r\n      </div>\r\n      <div role=\"button\" class=\"bookmarkButton\">\r\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"hasBookmarked") : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data,"loc":{"start":{"line":103,"column":8},"end":{"line":129,"column":15}}})) != null ? stack1 : "")
    + "      </div>\r\n    </div>\r\n    <div\r\n      class=\"text-white mt-2\"\r\n      role=\"button\"\r\n      data-bs-toggle=\"modal\"\r\n      data-bs-target=\"#viewLikedList\"\r\n    >\r\n      <span class=\"likeCounter\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalLike") || (depth0 != null ? lookupProperty(depth0,"totalLike") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalLike","hash":{},"data":data,"loc":{"start":{"line":138,"column":32},"end":{"line":138,"column":45}}}) : helper)))
    + "</span>\r\n      likes\r\n    </div>\r\n    <div class=\"text-white mt-2 description\">\r\n      <span class=\"fw-bold\" role=\"button\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":142,"column":42},"end":{"line":142,"column":54}}}) : helper)))
    + " </span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"description") || (depth0 != null ? lookupProperty(depth0,"description") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data,"loc":{"start":{"line":142,"column":62},"end":{"line":142,"column":77}}}) : helper)))
    + "\r\n    </div>\r\n"
    + ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||alias2).call(alias1,(depth0 != null ? lookupProperty(depth0,"totalComment") : depth0),1,{"name":"ifEquals","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data,"loc":{"start":{"line":144,"column":4},"end":{"line":169,"column":17}}})) != null ? stack1 : "")
    + "    <div class=\"mt-2 d-flex flex-row\">\r\n      <form class=\"input-group\">\r\n        <div\r\n          type=\"textarea\"\r\n          class=\"text-white bg-black border-0 d-flex form-control noBoxShadow ps-0 pe-0 me-0 ms-0 overflow-y-auto overflow-x-hidden text-wrap text-break commentTextArea input\"\r\n          data-placeholder=\"Send a comment...\"\r\n          contenteditable=\"true\"\r\n        ></div>\r\n      </form>\r\n      <div class=\"d-flex flex-row\">\r\n        <span\r\n          class=\"me-2 text-primary sendQuickComment invisible\"\r\n          role=\"button\"\r\n        >Post</span>\r\n        <span\r\n          class=\"emojiBtn\"\r\n          data-bs-toggle=\"modal\"\r\n          data-bs-target=\"#emojiSelector\"\r\n          onclick=\"setTarget(this)\"\r\n        >\r\n          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"20\"\r\n            height=\"20\"\r\n            fill=\"currentColor\"\r\n            class=\"bi bi-emoji-smile-fill text-white-50\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8\"\r\n            />\r\n          </svg>\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <hr class=\"mt-1\" />\r\n  </div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <video controls class=\"border-1 border user-select-none\">\r\n          <source src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":31,"column":23},"end":{"line":31,"column":35}}}) : helper)))
    + "\" />\r\n        </video>\r\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <img src=\""
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"postLink") || (depth0 != null ? lookupProperty(depth0,"postLink") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"postLink","hash":{},"data":data,"loc":{"start":{"line":34,"column":18},"end":{"line":34,"column":30}}}) : helper)))
    + "\" class=\"border-1 border user-select-none\" />\r\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "            <svg\r\n              xmlns=\"http://www.w3.org/2000/svg\"\r\n              width=\"24\"\r\n              height=\"24\"\r\n              fill=\"red\"\r\n              class=\"bi bi-heart-fill like\"\r\n              viewBox=\"0 0 16 16\"\r\n            >\r\n              <path\r\n                fill-rule=\"evenodd\"\r\n                d=\"M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314\"\r\n              />\r\n            </svg>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "            <svg\r\n              xmlns=\"http://www.w3.org/2000/svg\"\r\n              width=\"24\"\r\n              height=\"24\"\r\n              fill=\"white\"\r\n              class=\"bi bi-heart postInteraction\"\r\n              viewBox=\"0 0 16 16\"\r\n            >\r\n              <path\r\n                d=\"m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15\"\r\n              />\r\n            </svg>\r\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-bookmark-fill bookmark\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2\"\r\n            />\r\n          </svg>\r\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "          <svg\r\n            xmlns=\"http://www.w3.org/2000/svg\"\r\n            width=\"24\"\r\n            height=\"24\"\r\n            fill=\"white\"\r\n            class=\"bi bi-bookmark postInteraction\"\r\n            viewBox=\"0 0 16 16\"\r\n          >\r\n            <path\r\n              d=\"M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z\"\r\n            />\r\n          </svg>\r\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "      <div\r\n        class=\"text-white-50 mt-2\"\r\n        role=\"button\"\r\n        data-bs-toggle=\"modal\"\r\n        data-bs-target=\"#viewComments\"\r\n      >View the only comment</div>\r\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = (lookupProperty(helpers,"ifEquals")||(depth0 && lookupProperty(depth0,"ifEquals"))||container.hooks.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"totalComment") : depth0),0,{"name":"ifEquals","hash":{},"fn":container.program(17, data, 0),"inverse":container.program(19, data, 0),"data":data,"loc":{"start":{"line":152,"column":6},"end":{"line":168,"column":19}}})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    return "        <div\r\n          class=\"text-white-50 mt-2\"\r\n          role=\"button\"\r\n          data-bs-toggle=\"modal\"\r\n          data-bs-target=\"#viewComments\"\r\n        >There is no comment D:</div>\r\n";
},"19":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div\r\n          class=\"text-white-50 mt-2\"\r\n          role=\"button\"\r\n          data-bs-toggle=\"modal\"\r\n          data-bs-target=\"#viewComments\"\r\n        >View all\r\n          <span>"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"commentCount") || (depth0 != null ? lookupProperty(depth0,"commentCount") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"commentCount","hash":{},"data":data,"loc":{"start":{"line":166,"column":16},"end":{"line":166,"column":32}}}) : helper)))
    + "</span>\r\n          comments</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"post") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":207,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();