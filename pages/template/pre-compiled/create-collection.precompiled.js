(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['create-collection'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div\r\n  class=\"modal-dialog modal-dialog-centered modal-fullscreen modal-dialog-scrollable\"\r\n>\r\n  <div class=\"modal-content bg-black text-white glassmorph\">\r\n    <div class=\"modal-header d-flex flex-column p-0 position-relative pb-4\">\r\n      <h5 id=\"modalTitle\" class=\"modal-title pt-3\">Collection</h5>\r\n      <button\r\n        type=\"button\"\r\n        class=\"bg-transparent border-0 position-absolute end-0 pt-3 pe-3\"\r\n        data-bs-dismiss=\"modal\"\r\n        aria-label=\"Close modal\"\r\n      >\r\n        <svg\r\n          xmlns=\"http://www.w3.org/2000/svg\"\r\n          width=\"24\"\r\n          height=\"24\"\r\n          fill=\"white\"\r\n          class=\"bi bi-x-lg\"\r\n          viewBox=\"0 0 16 16\"\r\n        >\r\n          <path\r\n            d=\"M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z\"\r\n            stroke=\"white\"\r\n            stroke-width=\"1.5\"\r\n          />\r\n        </svg>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body d-flex w-100 flex-row m-0 p-0\">\r\n      <div\r\n        class=\"ms-3 d-flex justify-content-center border-end\"\r\n        id=\"mediaContainer\"\r\n      >\r\n        <div\r\n          class=\"d-flex align-items-center justify-content-center pe-3 position-relative\"\r\n        >\r\n          <input\r\n            type=\"file\"\r\n            accept=\"image/*\"\r\n            class=\"position-absolute visually-hidden\"\r\n            placeholder=\"Cover\"\r\n            id=\"newCollectionCoverInput\"\r\n            aria-label=\"user upload files\"\r\n          />\r\n          <label for=\"newCollectionCoverInput\" role=\"button\">\r\n            <img\r\n              src=\"https://uploads.dailydot.com/2024/07/that-two-thousand-yard-stare.jpg\"\r\n              id=\"newCollectionCover\"\r\n            />\r\n          </label>\r\n        </div>\r\n      </div>\r\n      <div\r\n        id=\"newCollectionInformationContainer\"\r\n        class=\"d-flex flex-column w-100 mt-3 ms-3 me-3 position-relative\"\r\n      >\r\n        <div>\r\n          <h3 class=\"mb-4 mt-4\">Title:</h3>\r\n          <input\r\n            type=\"text\"\r\n            class=\"form-control noBoxShadow\"\r\n            placeholder=\"collection\"\r\n            id=\"newCollectionTitleInput\"\r\n            aria-label=\"collection\"\r\n          />\r\n        </div>\r\n        <h3 class=\"mt-3\">Is public:</h3>\r\n        <input\r\n          class=\"form-check-input visibilityCheckBox\"\r\n          type=\"checkbox\"\r\n          value=\"0\"\r\n          id=\"collectionVisibilityAll\"\r\n        />\r\n\r\n        <hr class=\"invisible\" />\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer d-flex w-100 flex-row\">\r\n      <button\r\n        id=\"collectionCreateButton\"\r\n        class=\"btn btn-primary\"\r\n      >Create</button>\r\n    </div>\r\n  </div>\r\n</div>";
},"useData":true});
})();