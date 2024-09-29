(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['setting-post'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div\r\n  class=\"d-flex flex-column align-items-start justify-content-center w-100 mt-5 ms-5 ps-3 mb-5\"\r\n>\r\n  <div class=\"d-flex flex-row\">\r\n    <h4 class=\"me-4 pe-2\">Before:</h4>\r\n    <input\r\n      type=\"datetime-local\"\r\n      name=\"\"\r\n      id=\"filterDateTimeStartInput\"\r\n      class=\"form-control w-50\"\r\n    />\r\n  </div>\r\n  <div class=\"d-flex flex-row mt-4\">\r\n    <h4 class=\"me-5\">After:</h4>\r\n    <input\r\n      type=\"datetime-local\"\r\n      name=\"\"\r\n      id=\"filterDateTimeEndInput\"\r\n      class=\"form-control w-50\"\r\n    />\r\n  </div>\r\n  <button class=\"btn btn-primary mt-4 w-25\">Filter</button>\r\n</div>\r\n<div id=\"posts\" class=\"col vh-100 w-100 overflow-x-hidden\">\r\n</div>";
},"useData":true});
})();