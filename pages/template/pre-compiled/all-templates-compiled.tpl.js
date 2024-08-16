(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["emoji-button"] = template({
    1: function (container, depth0, helpers, partials, data) {
      return (
        '  <div\r\n    class="emojiBtn d-flex justify-content-center align-items-center user-select-none"\r\n  ><div\r\n      class="emoji d-flex rounded-2"\r\n      data-bs-dismiss="modal"\r\n      data-bs-target="#emojiSelector"\r\n    >' +
        container.escapeExpression(container.lambda(depth0, depth0)) +
        "</div></div>\r\n"
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "emojiObject") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 1, column: 0 }, end: { line: 9, column: 9 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
  });
  templates["info-group"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      return '<div class="modal-dialog modal-dialog-centered">\r\n  <div class="modal-content bg-black text-white glassmorph">\r\n    <div class="modal-header d-flex flex-column p-0 border-0 position-relative">\r\n      <h5 class="modal-title pt-3">Create a group</h5>\r\n      <button\r\n        type="button"\r\n        class="bg-transparent border-0 position-absolute end-0 pt-3 pe-3 closeModal"\r\n        data-bs-dismiss="modal"\r\n        aria-label="Close"\r\n      >\r\n        <svg\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          width="24"\r\n          height="24"\r\n          fill="white"\r\n          class="bi bi-x-lg"\r\n          viewBox="0 0 16 16"\r\n        >\r\n          <path\r\n            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"\r\n            stroke="white"\r\n            stroke-width="1.5"\r\n          />\r\n        </svg>\r\n      </button>\r\n      <hr class="w-100 border-white border-2" />\r\n      <form\r\n        class="input-group w-100 d-flex justify-content-center align-items-center flex-column"\r\n      >\r\n        <h6><strong>Group profile icon:</strong></h6>\r\n        <div>\r\n          <input\r\n            type="file"\r\n            accept="image/*"\r\n            class="position-absolute visually-hidden"\r\n            placeholder="Profile icon"\r\n            id="changeGroupProfileIcon"\r\n            aria-label="user upload files"\r\n            disabled\r\n          />\r\n          <label for="changeGroupProfileIcon" role="button">\r\n            <img\r\n              width="100"\r\n              height="100"\r\n              src="https://i.pinimg.com/564x/4e/fe/d2/4efed22f325c636539ad1d2c2dd166dc.jpg"\r\n              id="showUpload"\r\n              alt="please select something to upload"\r\n              class="rounded rounded-circle"\r\n            /></label>\r\n        </div>\r\n      </form>\r\n      <form class="input-group w-100 mt-3">\r\n        <span\r\n          class="input-group-text bg-transparent text-white border-0"\r\n        ><strong>Group name:</strong></span>\r\n        <input\r\n          type="text"\r\n          class="form-control bg-transparent text-white border-0 noBoxShadow"\r\n          placeholder="Enter a group name..."\r\n          id="changeGroupNameInput"\r\n          disabled\r\n        />\r\n      </form>\r\n      <hr class="w-100 border-white border-2" />\r\n    </div>\r\n    <div\r\n      class="modal-body d-flex w-100 d-flex flex-column overflow-y-auto gap-4"\r\n      id="showCaseMemberNewGroup"\r\n    ></div>\r\n    <div\r\n      class="modal-footer w-100 d-flex justify-content-center align-items-center"\r\n    >\r\n      <button class="btn btn-primary w-100" id="updateGroupButton">\r\n        Update group\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>';
    },
    useData: true,
  });
  templates["message-container"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '<div\r\n  class="w-100 pt-3 ps-3 pb-3 border-bottom d-flex flex-row align-items-center justify-content-between border-dark user-select-none"\r\n>\r\n  <div>\r\n    <img\r\n      src="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "profileIcon") ||
              (depth0 != null
                ? lookupProperty(depth0, "profileIcon")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "profileIcon",
                hash: {},
                data: data,
                loc: {
                  start: { line: 6, column: 11 },
                  end: { line: 6, column: 26 },
                },
              })
            : helper)
        ) +
        '"\r\n      alt=""\r\n      width="56"\r\n      height="56"\r\n      class="rounded-circle me-2"\r\n    />\r\n    <span> <strong>' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "name") ||
              (depth0 != null ? lookupProperty(depth0, "name") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "name",
                hash: {},
                data: data,
                loc: {
                  start: { line: 12, column: 19 },
                  end: { line: 12, column: 27 },
                },
              })
            : helper)
        ) +
        '</strong></span>\r\n  </div>\r\n  <div class="pe-2" id="moreInfo"><svg\r\n      xmlns="http://www.w3.org/2000/svg"\r\n      width="24"\r\n      height="24"\r\n      fill="currentColor"\r\n      class="bi bi-info-circle"\r\n      viewBox="0 0 16 16"\r\n    >\r\n      <path\r\n        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"\r\n      />\r\n      <path\r\n        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"\r\n      />\r\n    </svg></div>\r\n</div>\r\n<div id="messageOutput" class="d-flex flex-column w-100 overflow-y-auto h-100">\r\n</div>\r\n<div class="w-100 d-flex align-items-center ps-4 pe-3 bg-black" id="messageBar">\r\n  <form class="input-group d-flex border rounded-5 w-100">\r\n    <div\r\n      class="input-group-text bg-transparent border-0 d-flex"\r\n      data-bs-toggle="modal"\r\n      data-bs-target="#emojiSelector"\r\n    >\r\n      <svg\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        width="24"\r\n        height="24"\r\n        fill="white"\r\n        class="bi bi-emoji-smile"\r\n        viewBox="0 0 16 16"\r\n      >\r\n        <path\r\n          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"\r\n        />\r\n        <path\r\n          d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"\r\n        />\r\n      </svg>\r\n    </div>\r\n    <div\r\n      type="text"\r\n      id="messageTextArea"\r\n      class="text-white bg-black border-0 d-flex form-control noBoxShadow ps-0 pe-0 me-0 ms-0 overflow-y-auto overflow-x-hidden text-wrap text-break"\r\n      data-placeholder="Message..."\r\n      contenteditable="true"\r\n    ></div>\r\n    <div\r\n      class="input-group-text bg-transparent border-0 d-flex text-primary invisible"\r\n      id="sendMessageBtn"\r\n      onClick="sendMessage()"\r\n    >\r\n      Post\r\n    </div>\r\n  </form>\r\n</div>'
      );
    },
    useData: true,
  });
  templates["message-selection"] = template({
    1: function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '      <div class="message ps-2 d-flex flex-row align-items-center ' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "isGroup") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(2, data, 0),
            inverse: container.program(4, data, 0),
            data: data,
            loc: {
              start: { line: 2, column: 66 },
              end: { line: 2, column: 107 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '" id="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "id") ||
              (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "id",
                hash: {},
                data: data,
                loc: {
                  start: { line: 2, column: 113 },
                  end: { line: 2, column: 119 },
                },
              })
            : helper)
        ) +
        '">\r\n       <img src="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "icon") ||
              (depth0 != null ? lookupProperty(depth0, "icon") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "icon",
                hash: {},
                data: data,
                loc: {
                  start: { line: 3, column: 17 },
                  end: { line: 3, column: 25 },
                },
              })
            : helper)
        ) +
        '" alt="profile icon"\r\n           width="56" height="56" class="rounded-circle me-2 profileIcon" />\r\n       <div class="d-flex flex-column w-100">\r\n           <div class="ellipsis" aria-label="name">\r\n               ' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "name") ||
              (depth0 != null ? lookupProperty(depth0, "name") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "name",
                hash: {},
                data: data,
                loc: {
                  start: { line: 7, column: 15 },
                  end: { line: 7, column: 23 },
                },
              })
            : helper)
        ) +
        '\r\n           </div>\r\n           <div class="text-white-50 ellipsis" aria-label="latest message">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "senderName") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(6, data, 0),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 10, column: 12 },
              end: { line: 16, column: 19 },
            },
          }
        )) != null
          ? stack1
          : "") +
        "</div>\r\n       </div>\r\n       </div>\r\n"
      );
    },
    2: function (container, depth0, helpers, partials, data) {
      return "group";
    },
    4: function (container, depth0, helpers, partials, data) {
      return "direct";
    },
    6: function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          (
            lookupProperty(helpers, "currentUserSent") ||
            (depth0 && lookupProperty(depth0, "currentUserSent")) ||
            alias2
          ).call(
            alias1,
            depth0 != null ? lookupProperty(depth0, "senderID") : depth0,
            {
              name: "currentUserSent",
              hash: {},
              data: data,
              loc: {
                start: { line: 11, column: 21 },
                end: { line: 11, column: 47 },
              },
            }
          ),
          {
            name: "if",
            hash: {},
            fn: container.program(7, data, 0),
            inverse: container.program(9, data, 0),
            data: data,
            loc: {
              start: { line: 11, column: 15 },
              end: { line: 15, column: 22 },
            },
          }
        )) != null
          ? stack1
          : "") +
        " said: " +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "message") ||
              (depth0 != null ? lookupProperty(depth0, "message") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === "function"
            ? helper.call(alias1, {
                name: "message",
                hash: {},
                data: data,
                loc: {
                  start: { line: 15, column: 29 },
                  end: { line: 15, column: 40 },
                },
              })
            : helper)
        ) +
        "\r\n            "
      );
    },
    7: function (container, depth0, helpers, partials, data) {
      return "               You\r\n";
    },
    9: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        "               " +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "senderName") ||
              (depth0 != null
                ? lookupProperty(depth0, "senderName")
                : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "senderName",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 14, column: 15 },
                    end: { line: 14, column: 29 },
                  },
                }
              )
            : helper)
        ) +
        "\r\n               "
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "messageList") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 1, column: 0 }, end: { line: 19, column: 15 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
  });
  templates["message"] = template({
    1: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          (
            lookupProperty(helpers, "isNewDay") ||
            (depth0 && lookupProperty(depth0, "isNewDay")) ||
            alias2
          ).call(alias1, data && lookupProperty(data, "index"), {
            name: "isNewDay",
            hash: {},
            data: data,
            blockParams: blockParams,
            loc: {
              start: { line: 2, column: 8 },
              end: { line: 2, column: 25 },
            },
          }),
          {
            name: "if",
            hash: {},
            fn: container.program(2, data, 0, blockParams),
            inverse: container.noop,
            data: data,
            blockParams: blockParams,
            loc: { start: { line: 2, column: 2 }, end: { line: 6, column: 9 } },
          }
        )) != null
          ? stack1
          : "") +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          (
            lookupProperty(helpers, "isSendMessage") ||
            (depth0 && lookupProperty(depth0, "isSendMessage")) ||
            alias2
          ).call(
            alias1,
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "senderID")
              : stack1,
            {
              name: "isSendMessage",
              hash: {},
              data: data,
              blockParams: blockParams,
              loc: {
                start: { line: 7, column: 8 },
                end: { line: 7, column: 40 },
              },
            }
          ),
          {
            name: "if",
            hash: {},
            fn: container.program(4, data, 0, blockParams),
            inverse: container.program(6, data, 0, blockParams),
            data: data,
            blockParams: blockParams,
            loc: {
              start: { line: 7, column: 2 },
              end: { line: 55, column: 9 },
            },
          }
        )) != null
          ? stack1
          : "")
      );
    },
    2: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '    <div class="w-100 text-center">\r\n      ' +
        container.escapeExpression(
          (
            lookupProperty(helpers, "convertToDate") ||
            (depth0 && lookupProperty(depth0, "convertToDate")) ||
            container.hooks.helperMissing
          ).call(
            depth0 != null ? depth0 : container.nullContext || {},
            (stack1 = blockParams[1][0]) != null
              ? lookupProperty(stack1, "time")
              : stack1,
            {
              name: "convertToDate",
              hash: {},
              data: data,
              blockParams: blockParams,
              loc: {
                start: { line: 4, column: 6 },
                end: { line: 4, column: 36 },
              },
            }
          )
        ) +
        "\r\n    </div>\r\n"
      );
    },
    4: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '    <div class="w-100 d-flex justify-content-end pb-3">\r\n      <div\r\n        class="sendMessage rounded-4 bg-primary pt-1 ps-2 pb-1 pe-2 me-3"\r\n        id="' +
        alias2(
          alias1(
            (stack1 = blockParams[1][0]) != null
              ? lookupProperty(stack1, "messageID")
              : stack1,
            depth0
          )
        ) +
        '"\r\n      >\r\n        <span class="message">' +
        alias2(
          alias1(
            (stack1 = blockParams[1][0]) != null
              ? lookupProperty(stack1, "message")
              : stack1,
            depth0
          )
        ) +
        '</span>\r\n        <div class="pt-2 pb-2 pe-2 d-flex justify-content-between">\r\n          <div class="deleteMessage">\r\n            <svg\r\n              xmlns="http://www.w3.org/2000/svg"\r\n              width="16"\r\n              height="16"\r\n              fill="#ff3f4e"\r\n              class="bi bi-trash3-fill"\r\n              viewBox="0 0 16 16"\r\n            >\r\n              <path\r\n                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"\r\n              />\r\n            </svg>\r\n          </div>\r\n          <div>\r\n            ' +
        alias2(
          (
            lookupProperty(helpers, "convertTo12HourTime") ||
            (depth0 && lookupProperty(depth0, "convertTo12HourTime")) ||
            container.hooks.helperMissing
          ).call(
            depth0 != null ? depth0 : container.nullContext || {},
            (stack1 = blockParams[1][0]) != null
              ? lookupProperty(stack1, "time")
              : stack1,
            {
              name: "convertTo12HourTime",
              hash: {},
              data: data,
              blockParams: blockParams,
              loc: {
                start: { line: 30, column: 12 },
                end: { line: 30, column: 48 },
              },
            }
          )
        ) +
        "\r\n          </div></div>\r\n      </div>\r\n    </div>\r\n"
      );
    },
    6: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "icon") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(7, data, 0, blockParams),
            inverse: container.noop,
            data: data,
            blockParams: blockParams,
            loc: {
              start: { line: 35, column: 4 },
              end: { line: 46, column: 11 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '    <div class="w-100 d-flex justify-content-start pb-3">\r\n      <div class="recieveMessage rounded-4 bg-dark pt-1 ps-2 pb-1 pe-2 ms-3">\r\n        <span class="message">' +
        alias2(
          container.lambda(
            (stack1 = blockParams[1][0]) != null
              ? lookupProperty(stack1, "message")
              : stack1,
            depth0
          )
        ) +
        '</span>\r\n        <div\r\n          class="pt-2 pb-2 pe-2 text-end w-100 time-text"\r\n        >' +
        alias2(
          (
            lookupProperty(helpers, "convertTo12HourTime") ||
            (depth0 && lookupProperty(depth0, "convertTo12HourTime")) ||
            container.hooks.helperMissing
          ).call(
            alias1,
            (stack1 = blockParams[1][0]) != null
              ? lookupProperty(stack1, "time")
              : stack1,
            {
              name: "convertTo12HourTime",
              hash: {},
              data: data,
              blockParams: blockParams,
              loc: {
                start: { line: 52, column: 9 },
                end: { line: 52, column: 45 },
              },
            }
          )
        ) +
        "</div>\r\n      </div>\r\n    </div>\r\n"
      );
    },
    7: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '      <div>\r\n        <img\r\n          src="' +
        alias2(
          alias1(
            (stack1 = blockParams[2][0]) != null
              ? lookupProperty(stack1, "icon")
              : stack1,
            depth0
          )
        ) +
        '"\r\n          alt=""\r\n          width="40"\r\n          height="40"\r\n          class="rounded rounded-circle ms-3 mb-1"\r\n        />\r\n        <span>' +
        alias2(
          alias1(
            (stack1 = blockParams[2][0]) != null
              ? lookupProperty(stack1, "displayName")
              : stack1,
            depth0
          )
        ) +
        "</span>\r\n      </div>\r\n"
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "messages") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 1, blockParams),
          inverse: container.noop,
          data: data,
          blockParams: blockParams,
          loc: { start: { line: 1, column: 0 }, end: { line: 56, column: 9 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
    useBlockParams: true,
  });
  templates["post-explore"] = template({
    1: function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '  <div\r\n    class="card bg-black post d-flex flex-row mb-4 w-100 justify-content-center"\r\n    data-post-id=' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "id") ||
              (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(alias1, {
                name: "id",
                hash: {},
                data: data,
                loc: {
                  start: { line: 4, column: 17 },
                  end: { line: 4, column: 23 },
                },
              })
            : helper)
        ) +
        '\r\n  >\r\n    <div class="contentContainer">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "isVideo") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(2, data, 0),
            inverse: container.program(4, data, 0),
            data: data,
            loc: {
              start: { line: 7, column: 6 },
              end: { line: 13, column: 13 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '    </div>\r\n    <div class="side-interactions d-flex flex-column ms-2 justify-content-end">\r\n      <div class="like-button">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "like") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(6, data, 0),
            inverse: container.program(8, data, 0),
            data: data,
            loc: {
              start: { line: 17, column: 8 },
              end: { line: 44, column: 15 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '      </div>\r\n      <div class="text-white d-flex justify-content-center mb-3">4k</div>\r\n      <div role="button" class="mb-3">\r\n        <svg\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          width="24"\r\n          height="24"\r\n          fill="white"\r\n          class="bi bi-chat postInteraction"\r\n          viewBox="0 1 16 16"\r\n        >\r\n          <path\r\n            d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"\r\n          />\r\n        </svg>\r\n      </div>\r\n      <div role="button" class="mb-3">\r\n        <svg\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          width="24"\r\n          height="24"\r\n          fill="white"\r\n          class="bi bi-share postInteraction"\r\n          viewBox="0 0 16 16"\r\n        >\r\n          <path\r\n            d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"\r\n          />\r\n        </svg>\r\n      </div>\r\n      <div role="button" class="bookmarkButton">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "bookmark") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(10, data, 0),
            inverse: container.program(12, data, 0),
            data: data,
            loc: {
              start: { line: 76, column: 8 },
              end: { line: 102, column: 15 },
            },
          }
        )) != null
          ? stack1
          : "") +
        "      </div>\r\n    </div>\r\n    <hr />\r\n  </div>\r\n"
      );
    },
    2: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '        <video controls class="border-1 border user-select-none">\r\n          <source src="' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "mediaSrc") ||
              (depth0 != null ? lookupProperty(depth0, "mediaSrc") : depth0)) !=
            null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "mediaSrc",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 9, column: 23 },
                    end: { line: 9, column: 35 },
                  },
                }
              )
            : helper)
        ) +
        '" />\r\n        </video>\r\n'
      );
    },
    4: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '        <img src="' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "mediaSrc") ||
              (depth0 != null ? lookupProperty(depth0, "mediaSrc") : depth0)) !=
            null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "mediaSrc",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 12, column: 18 },
                    end: { line: 12, column: 30 },
                  },
                }
              )
            : helper)
        ) +
        '" class="border-1 border user-select-none" />\r\n'
      );
    },
    6: function (container, depth0, helpers, partials, data) {
      return '          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="red"\r\n            class="bi bi-heart-fill like"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              fill-rule="evenodd"\r\n              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"\r\n            />\r\n          </svg>\r\n';
    },
    8: function (container, depth0, helpers, partials, data) {
      return '          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-heart postInteraction"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"\r\n            />\r\n          </svg>\r\n';
    },
    10: function (container, depth0, helpers, partials, data) {
      return '          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-bookmark-fill bookmark"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"\r\n            />\r\n          </svg>\r\n';
    },
    12: function (container, depth0, helpers, partials, data) {
      return '          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-bookmark postInteraction"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"\r\n            />\r\n          </svg>\r\n';
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "post") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 1, column: 0 }, end: { line: 107, column: 9 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
  });
  templates["post-home"] = template({
    1: function (container, depth0, helpers, partials, data) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '  <div class="card bg-black post" data-post-id=' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "id") ||
              (depth0 != null ? lookupProperty(depth0, "id") : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "id",
                hash: {},
                data: data,
                loc: {
                  start: { line: 2, column: 47 },
                  end: { line: 2, column: 53 },
                },
              })
            : helper)
        ) +
        '>\r\n    <div\r\n      class="card-header d-flex flex-row justify-content-between text-white mb-2"\r\n    >\r\n      <div>\r\n        <img\r\n          src=' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "profileLink") ||
              (depth0 != null
                ? lookupProperty(depth0, "profileLink")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "profileLink",
                hash: {},
                data: data,
                loc: {
                  start: { line: 8, column: 14 },
                  end: { line: 8, column: 29 },
                },
              })
            : helper)
        ) +
        '\r\n          alt=""\r\n          width="32"\r\n          height="32"\r\n          class="rounded-circle"\r\n        />\r\n        <span>' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "name") ||
              (depth0 != null ? lookupProperty(depth0, "name") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "name",
                hash: {},
                data: data,
                loc: {
                  start: { line: 14, column: 14 },
                  end: { line: 14, column: 22 },
                },
              })
            : helper)
        ) +
        '</span>\r\n        <span><svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="16"\r\n            height="16"\r\n            fill="currentColor"\r\n            class="bi bi-dot"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />\r\n          </svg></span>\r\n        <span>' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "postAge") ||
              (depth0 != null ? lookupProperty(depth0, "postAge") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "postAge",
                hash: {},
                data: data,
                loc: {
                  start: { line: 25, column: 14 },
                  end: { line: 25, column: 25 },
                },
              })
            : helper)
        ) +
        '</span>\r\n      </div>\r\n      <div role="button">\r\n        <svg\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          width="16"\r\n          height="16"\r\n          fill="currentColor"\r\n          class="bi bi-three-dots"\r\n          viewBox="0 0 16 16"\r\n        >\r\n          <path\r\n            d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"\r\n          />\r\n        </svg>\r\n      </div>\r\n    </div>\r\n    <div class="contentContainer">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "isVideo") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(2, data, 0),
            inverse: container.program(4, data, 0),
            data: data,
            loc: {
              start: { line: 43, column: 6 },
              end: { line: 49, column: 13 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '    </div>\r\n    <div class="interactions d-flex flex-row justify-content-between mt-2">\r\n      <div class="d-flex flex-row gap-3 align-items-center">\r\n        <div class="like-button">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "like") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(6, data, 0),
            inverse: container.program(8, data, 0),
            data: data,
            loc: {
              start: { line: 54, column: 10 },
              end: { line: 81, column: 17 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '        </div>\r\n        <div role="button">\r\n          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-chat postInteraction"\r\n            viewBox="0 1 16 16"\r\n          >\r\n            <path\r\n              d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"\r\n            />\r\n          </svg>\r\n        </div>\r\n        <div role="button">\r\n          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-share postInteraction"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"\r\n            />\r\n          </svg>\r\n        </div>\r\n      </div>\r\n      <div role="button" class="bookmarkButton">\r\n' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "bookmark") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(10, data, 0),
            inverse: container.program(12, data, 0),
            data: data,
            loc: {
              start: { line: 113, column: 8 },
              end: { line: 139, column: 15 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '      </div>\r\n    </div>\r\n    <div class="text-white mt-2" role="button">\r\n      <span class="likeCounter">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "likeCount") ||
              (depth0 != null
                ? lookupProperty(depth0, "likeCount")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "likeCount",
                hash: {},
                data: data,
                loc: {
                  start: { line: 143, column: 32 },
                  end: { line: 143, column: 45 },
                },
              })
            : helper)
        ) +
        '</span>\r\n      likes\r\n    </div>\r\n    <div class="text-white mt-2 description">\r\n      <span class="fw-bold" role="button">' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "name") ||
              (depth0 != null ? lookupProperty(depth0, "name") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "name",
                hash: {},
                data: data,
                loc: {
                  start: { line: 147, column: 42 },
                  end: { line: 147, column: 50 },
                },
              })
            : helper)
        ) +
        " </span>" +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "description") ||
              (depth0 != null
                ? lookupProperty(depth0, "description")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "description",
                hash: {},
                data: data,
                loc: {
                  start: { line: 147, column: 58 },
                  end: { line: 147, column: 73 },
                },
              })
            : helper)
        ) +
        "\r\n    </div>\r\n" +
        ((stack1 = (
          lookupProperty(helpers, "ifEquals") ||
          (depth0 && lookupProperty(depth0, "ifEquals")) ||
          alias2
        ).call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "commentCount") : depth0,
          1,
          {
            name: "ifEquals",
            hash: {},
            fn: container.program(14, data, 0),
            inverse: container.program(16, data, 0),
            data: data,
            loc: {
              start: { line: 149, column: 4 },
              end: { line: 155, column: 17 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '    <div class="mt-2 d-flex flex-row">\r\n      <form class="input-group">\r\n        <div\r\n          type="text"\r\n          class="text-white bg-black border-0 d-flex form-control noBoxShadow ps-0 pe-0 me-0 ms-0 overflow-y-auto overflow-x-hidden text-wrap text-break commentTextArea"\r\n          data-placeholder="Send a comment..."\r\n          contenteditable="true"\r\n        ></div>\r\n      </form>\r\n      <div class="d-flex flex-row">\r\n        <span\r\n          class="me-2 text-primary sendQuickComment d-none"\r\n          role="button"\r\n        >Post</span>\r\n        <span\r\n          class="emojiBtn"\r\n          data-bs-toggle="modal"\r\n          data-bs-target="#emojiSelector"\r\n        >\r\n          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="20"\r\n            height="20"\r\n            fill="currentColor"\r\n            class="bi bi-emoji-smile-fill text-white-50"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8"\r\n            />\r\n          </svg>\r\n        </span>\r\n      </div>\r\n    </div>\r\n    <hr class="mt-1" />\r\n  </div>\r\n'
      );
    },
    2: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '        <video controls class="border-1 border user-select-none">\r\n          <source src="' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "mediaSrc") ||
              (depth0 != null ? lookupProperty(depth0, "mediaSrc") : depth0)) !=
            null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "mediaSrc",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 45, column: 23 },
                    end: { line: 45, column: 35 },
                  },
                }
              )
            : helper)
        ) +
        '" />\r\n        </video>\r\n'
      );
    },
    4: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '        <img src="' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "mediaSrc") ||
              (depth0 != null ? lookupProperty(depth0, "mediaSrc") : depth0)) !=
            null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "mediaSrc",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 48, column: 18 },
                    end: { line: 48, column: 30 },
                  },
                }
              )
            : helper)
        ) +
        '" class="border-1 border user-select-none" />\r\n'
      );
    },
    6: function (container, depth0, helpers, partials, data) {
      return '            <svg\r\n              xmlns="http://www.w3.org/2000/svg"\r\n              width="24"\r\n              height="24"\r\n              fill="red"\r\n              class="bi bi-heart-fill like"\r\n              viewBox="0 0 16 16"\r\n            >\r\n              <path\r\n                fill-rule="evenodd"\r\n                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"\r\n              />\r\n            </svg>\r\n';
    },
    8: function (container, depth0, helpers, partials, data) {
      return '            <svg\r\n              xmlns="http://www.w3.org/2000/svg"\r\n              width="24"\r\n              height="24"\r\n              fill="white"\r\n              class="bi bi-heart postInteraction"\r\n              viewBox="0 0 16 16"\r\n            >\r\n              <path\r\n                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"\r\n              />\r\n            </svg>\r\n';
    },
    10: function (container, depth0, helpers, partials, data) {
      return '          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-bookmark-fill bookmark"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2"\r\n            />\r\n          </svg>\r\n';
    },
    12: function (container, depth0, helpers, partials, data) {
      return '          <svg\r\n            xmlns="http://www.w3.org/2000/svg"\r\n            width="24"\r\n            height="24"\r\n            fill="white"\r\n            class="bi bi-bookmark postInteraction"\r\n            viewBox="0 0 16 16"\r\n          >\r\n            <path\r\n              d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"\r\n            />\r\n          </svg>\r\n';
    },
    14: function (container, depth0, helpers, partials, data) {
      return '      <div class="text-white-50 mt-2" role="button">View the only comment</div>\r\n';
    },
    16: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '      <div class="text-white-50 mt-2" role="button">View all\r\n        <span>' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "commentCount") ||
              (depth0 != null
                ? lookupProperty(depth0, "commentCount")
                : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "commentCount",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 153, column: 14 },
                    end: { line: 153, column: 30 },
                  },
                }
              )
            : helper)
        ) +
        "</span>\r\n        comments</div>\r\n"
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "post") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 0),
          inverse: container.noop,
          data: data,
          loc: { start: { line: 1, column: 0 }, end: { line: 192, column: 9 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
  });
  templates["search-user"] = template({
    1: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '  <div\r\n    class="d-flex justify-content-between w-100 user"\r\n    id="user-' +
        alias2(
          alias1(
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "userID")
              : stack1,
            depth0
          )
        ) +
        '"\r\n  >\r\n    <div class="w-100 ps-4 d-flex flex-row align-items-center">\r\n      <img\r\n        src=' +
        alias2(
          alias1(
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "profileIcon")
              : stack1,
            depth0
          )
        ) +
        '\r\n        alt=""\r\n        width="44"\r\n        height="44"\r\n        class="rounded-circle me-2"\r\n      />\r\n      <div class="d-flex flex-column">\r\n        <span aria-label="display name">\r\n          ' +
        alias2(
          alias1(
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "DisplayName")
              : stack1,
            depth0
          )
        ) +
        '\r\n        </span>\r\n        <span\r\n          class="text-white-50"\r\n          aria-label="username"\r\n        >' +
        alias2(
          alias1(
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "Username")
              : stack1,
            depth0
          )
        ) +
        '</span>\r\n      </div>\r\n    </div>\r\n    <div\r\n      class="checkboxContainer d-flex align-items-center position-relative me-3"\r\n    >\r\n      <input type="checkbox" class="d-flex z-3 opacity-0" />\r\n      <span\r\n        class="checkmark d-flex position-absolute rounded-circle border border-2 border-white"\r\n      >\r\n        <svg\r\n          xmlns="http://www.w3.org/2000/svg"\r\n          fill="currentColor"\r\n          class="bi bi-check-circle-fill w-100 h-100 d-none"\r\n          viewBox="0 0 16 16"\r\n        >\r\n          <path\r\n            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"\r\n          />\r\n        </svg>\r\n      </span>\r\n    </div>\r\n  </div>\r\n'
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "users") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 1, blockParams),
          inverse: container.noop,
          data: data,
          blockParams: blockParams,
          loc: { start: { line: 1, column: 0 }, end: { line: 44, column: 9 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
    useBlockParams: true,
  });
  templates["selected-tag"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      var helper,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '<div\r\n  class="d-flex btn btn-primary rounded-0 justify-content-center align-items-center position-relative"\r\n>\r\n  <div aria-label="tag name" class="d-flex">' +
        container.escapeExpression(
          ((helper =
            (helper =
              lookupProperty(helpers, "tag") ||
              (depth0 != null ? lookupProperty(depth0, "tag") : depth0)) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "tag",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 4, column: 44 },
                    end: { line: 4, column: 51 },
                  },
                }
              )
            : helper)
        ) +
        '</div>\r\n  <span class="btn btn-close position-absolute end-0 me-3"> </span>\r\n</div>'
      );
    },
    useData: true,
  });
  templates["selected-user"] = template({
    1: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        alias1 = container.lambda,
        alias2 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '  <div\r\n    class="d-flex btn btn-primary rounded-2 justify-content-center align-items-center selectedUser"\r\n    id="selectedUser-' +
        alias2(
          alias1(
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "id")
              : stack1,
            depth0
          )
        ) +
        '"\r\n  ><span aria-label="display name">' +
        alias2(
          alias1(
            (stack1 = blockParams[0][0]) != null
              ? lookupProperty(stack1, "DisplayName")
              : stack1,
            depth0
          )
        ) +
        '</span><span\r\n      class="btn btn-close d-flex"\r\n    ></span></div>\r\n'
      );
    },
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data, blockParams) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "users") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 1, blockParams),
          inverse: container.noop,
          data: data,
          blockParams: blockParams,
          loc: { start: { line: 1, column: 0 }, end: { line: 8, column: 9 } },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
    useBlockParams: true,
  });
  templates["sidebar"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      return '<div\r\n  class="col d-flex flex-column position-absolute h-100 ps-4 border-end border-dark"\r\n  id="sideBar"\r\n>\r\n  <div class="d-flex flex-row justify-content-between mt-2">\r\n    <span class="fs-3 d-flex name user-select-none"> Instabun </span>\r\n    <!--When sidebar closes, the button does not really works for some reason-->\r\n    <span\r\n      class="d-flex align-self-end justify-content-end"\r\n      role="button"\r\n      id="toggleSideBar"\r\n    >\r\n      <svg\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        width="25"\r\n        height="25"\r\n        fill="currentColor"\r\n        class="bi bi-list"\r\n        viewBox="0 0 16 16"\r\n      >\r\n        <path\r\n          fill-rule="evenodd"\r\n          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"\r\n        />\r\n      </svg>\r\n    </span>\r\n  </div>\r\n  <hr />\r\n  <ul\r\n    class="nav nav-pills d-flex flex-column mb-auto align-items-center row-gap-4"\r\n  >\r\n    <li\r\n      class="fs-4 d-flex align-items-center justify-content-center w-100 rounded-2"\r\n    >\r\n      <svg\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        width="20"\r\n        height="20"\r\n        fill="currentColor"\r\n        class="bi bi-house me-1"\r\n        viewBox="0 -1 16 16"\r\n      >\r\n        <path\r\n          d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"\r\n        />\r\n      </svg>\r\n      <span class="name user-select-none" onclick="toHome()"> Home </span>\r\n    </li>\r\n    <li\r\n      class="fs-4 d-flex align-items-center justify-content-center w-100 rounded-2"\r\n    >\r\n      <svg\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        width="20"\r\n        height="20"\r\n        fill="currentColor"\r\n        class="bi bi-search me-1"\r\n        viewBox="0 0 16 16"\r\n      >\r\n        <path\r\n          d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"\r\n        />\r\n      </svg>\r\n      <span class="name user-select-none" onclick="toExplore()">\r\n        Explore\r\n      </span>\r\n    </li>\r\n    <li\r\n      class="fs-4 d-flex align-items-center justify-content-center w-100 rounded-2"\r\n    >\r\n      <svg\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        width="20"\r\n        height="20"\r\n        fill="currentColor"\r\n        class="bi bi-plus-square me-1"\r\n        viewBox="0 0 16 16"\r\n      >\r\n        <path\r\n          d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"\r\n        />\r\n        <path\r\n          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"\r\n        />\r\n      </svg>\r\n      <span class="name user-select-none" onclick="toCreate()">\r\n        Create\r\n      </span>\r\n    </li>\r\n    <li\r\n      class="fs-4 d-flex align-items-center justify-content-center w-100 rounded-2"\r\n    >\r\n      <svg\r\n        xmlns="http://www.w3.org/2000/svg"\r\n        width="20"\r\n        height="20"\r\n        fill="currentColor"\r\n        class="bi bi-chat-right-dots me-1"\r\n        viewBox="0 -1 16 16"\r\n      >\r\n        <path\r\n          d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z"\r\n        />\r\n        <path\r\n          d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"\r\n        />\r\n      </svg>\r\n      <span class="name user-select-none" onclick="toMessage()">\r\n        Message\r\n      </span>\r\n    </li>\r\n  </ul>\r\n  <hr />\r\n  <div class="dropdown">\r\n    <a\r\n      href="#"\r\n      class="d-flex align-items-center text-white text-decoration-none dropdown-toggle mb-3"\r\n      id="dropdownUser1"\r\n      data-bs-toggle="dropdown"\r\n      aria-expanded="false"\r\n    >\r\n      <img\r\n        src="https://github.com/mdo.png"\r\n        alt=""\r\n        width="32"\r\n        height="32"\r\n        class="rounded-circle me-2"\r\n      />\r\n      <strong>mdo</strong>\r\n    </a>\r\n    <ul\r\n      class="dropdown-menu dropdown-menu-dark text-small shadow"\r\n      aria-labelledby="dropdownUser1"\r\n    >\r\n      <li><a class="dropdown-item" href="#">New project...</a></li>\r\n      <li><a class="dropdown-item" href="#">Settings</a></li>\r\n      <li><a class="dropdown-item" href="#">Profile</a></li>\r\n      <li>\r\n        <hr class="dropdown-divider" />\r\n      </li>\r\n      <li><a class="dropdown-item" href="#">Sign out</a></li>\r\n    </ul>\r\n  </div>\r\n</div>';
    },
    useData: true,
  });
  templates["story"] = template({
    1: function (
      container,
      depth0,
      helpers,
      partials,
      data,
      blockParams,
      depths
    ) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '        <div class="story-icon" id="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 2, column: 36 },
                  end: { line: 2, column: 46 },
                },
              })
            : helper)
        ) +
        '">\r\n            <div\r\n              class="rounded-circle story-icon-background ' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "closeFriend") : depth0,
          {
            name: "if",
            hash: {},
            fn: container.program(2, data, 0, blockParams, depths),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 4, column: 58 },
              end: { line: 4, column: 92 },
            },
          }
        )) != null
          ? stack1
          : "") +
        ' d-flex justify-content-center align-items-center"\r\n              data-bs-toggle="modal"\r\n              data-bs-target="#storyModal-' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 6, column: 42 },
                  end: { line: 6, column: 52 },
                },
              })
            : helper)
        ) +
        '"\r\n            >\r\n              <img\r\n                src=' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "profileIcon") ||
              (depth0 != null
                ? lookupProperty(depth0, "profileIcon")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "profileIcon",
                hash: {},
                data: data,
                loc: {
                  start: { line: 9, column: 20 },
                  end: { line: 9, column: 35 },
                },
              })
            : helper)
        ) +
        '\r\n                alt=""\r\n                width="66"\r\n                height="66"\r\n                class="rounded-circle"\r\n              />\r\n            </div>\r\n            <div class="story-icon-username text-center">\r\n              ' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "username") ||
              (depth0 != null ? lookupProperty(depth0, "username") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "username",
                hash: {},
                data: data,
                loc: {
                  start: { line: 17, column: 14 },
                  end: { line: 17, column: 26 },
                },
              })
            : helper)
        ) +
        '\r\n            </div>\r\n        </div>\r\n        <div\r\n          class="modal fade overflow-hidden glassmorph"\r\n          id="storyModal-' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 22, column: 25 },
                  end: { line: 22, column: 35 },
                },
              })
            : helper)
        ) +
        '"\r\n          tabindex="-1"\r\n          aria-hidden="true"\r\n          data-bs-backdrop="static"\r\n        >\r\n          <div class="modal-dialog modal-dialog-centered position-relative">\r\n            <div class="modal-content bg-transparent border-0">\r\n              <div class="modal-header border-0 d-flex flex-column m-0 p-0">\r\n                <div class="d-flex flex-row justify-content-between w-100">\r\n                  <div>\r\n                    <img\r\n                      src="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "profileIcon") ||
              (depth0 != null
                ? lookupProperty(depth0, "profileIcon")
                : depth0)) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "profileIcon",
                hash: {},
                data: data,
                loc: {
                  start: { line: 33, column: 27 },
                  end: { line: 33, column: 42 },
                },
              })
            : helper)
        ) +
        '"\r\n                      alt=""\r\n                      width="32"\r\n                      height="32"\r\n                      class="rounded-circle"\r\n                    />\r\n                    <span>' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "username") ||
              (depth0 != null ? lookupProperty(depth0, "username") : depth0)) !=
            null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "username",
                hash: {},
                data: data,
                loc: {
                  start: { line: 39, column: 26 },
                  end: { line: 39, column: 38 },
                },
              })
            : helper)
        ) +
        '</span>\r\n                    <span><svg\r\n                        xmlns="http://www.w3.org/2000/svg"\r\n                        width="16"\r\n                        height="16"\r\n                        fill="currentColor"\r\n                        class="bi bi-dot"\r\n                        viewBox="0 0 16 16"\r\n                      >\r\n                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />\r\n                      </svg></span>\r\n                    <span class="storyAge">' +
        alias4(
          (
            lookupProperty(helpers, "storyAge") ||
            (depth0 && lookupProperty(depth0, "storyAge")) ||
            alias2
          ).call(
            alias1,
            (stack1 =
              (stack1 =
                depth0 != null ? lookupProperty(depth0, "stories") : depth0) !=
              null
                ? lookupProperty(stack1, "0")
                : stack1) != null
              ? lookupProperty(stack1, "uploadDate")
              : stack1,
            {
              name: "storyAge",
              hash: {},
              data: data,
              loc: {
                start: { line: 50, column: 43 },
                end: { line: 50, column: 76 },
              },
            }
          )
        ) +
        '</span>\r\n                  </div>\r\n                  <button\r\n                    type="button"\r\n                    class="bg-transparent border-0"\r\n                    data-bs-dismiss="modal"\r\n                    aria-label="Close"\r\n                  >\r\n                    <svg\r\n                      xmlns="http://www.w3.org/2000/svg"\r\n                      width="24"\r\n                      height="24"\r\n                      fill="white"\r\n                      class="bi bi-x-lg"\r\n                      viewBox="0 0 16 16"\r\n                    >\r\n                      <path\r\n                        d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"\r\n                        stroke="white"\r\n                        stroke-width="1.5"\r\n                      />\r\n                    </svg>\r\n                  </button>\r\n                </div>\r\n                <div class="w-100 d-flex flex-row gap-1">\r\n' +
        ((stack1 = lookupProperty(helpers, "each").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "stories") : depth0,
          {
            name: "each",
            hash: {},
            fn: container.program(4, data, 0, blockParams, depths),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 75, column: 16 },
              end: { line: 78, column: 27 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '                </div>\r\n              </div>\r\n              <div class="modal-body p-0 m-0 bg-black bg-opacity-25">\r\n                <div id="carouselStory-' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 82, column: 39 },
                  end: { line: 82, column: 49 },
                },
              })
            : helper)
        ) +
        '" class="carousel carousel-dark slide w-100 h-100 d-flex flex-row">\r\n                  <div class="carousel-inner h-100 w-100">\r\n' +
        ((stack1 = lookupProperty(helpers, "each").call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "stories") : depth0,
          {
            name: "each",
            hash: {},
            fn: container.program(7, data, 0, blockParams, depths),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 84, column: 20 },
              end: { line: 94, column: 29 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '                  </div>\r\n                </div>\r\n                <div class="position-absolute top-50 start-0 leftStory visually-hidden pointer">\r\n                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gray" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">\r\n                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>\r\n                  </svg></div>\r\n                <div class="position-absolute top-50 end-0 rightStory ' +
        ((stack1 = (
          lookupProperty(helpers, "ifEquals") ||
          (depth0 && lookupProperty(depth0, "ifEquals")) ||
          alias2
        ).call(
          alias1,
          (stack1 =
            depth0 != null ? lookupProperty(depth0, "stories") : depth0) != null
            ? lookupProperty(stack1, "length")
            : stack1,
          1,
          {
            name: "ifEquals",
            hash: {},
            fn: container.program(14, data, 0, blockParams, depths),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 101, column: 70 },
              end: { line: 101, column: 128 },
            },
          }
        )) != null
          ? stack1
          : "") +
        ' pointer"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="gray" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">\r\n                  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>\r\n                </svg></div>\r\n              </div>\r\n              <div class="modal-footer bg-transparent border-0 ps-0 pe-0 d-flex flex-row input-group">\r\n                <input\r\n                type="text"\r\n                name=""\r\n                id=""\r\n                class="form-control rounded rounded-3 text-dark m-0"\r\n              />\r\n              <button class="btn bg-primary ms-2 rounded-3">Send</button>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n'
      );
    },
    2: function (container, depth0, helpers, partials, data) {
      return " friend ";
    },
    4: function (
      container,
      depth0,
      helpers,
      partials,
      data,
      blockParams,
      depths
    ) {
      var stack1,
        helper,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        alias2 = container.hooks.helperMissing,
        alias3 = "function",
        alias4 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '                <button data-bs-target="#carouselStory-' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 76, column: 55 },
                  end: { line: 76, column: 65 },
                },
              })
            : helper)
        ) +
        '" data-bs-slide-to="' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 76, column: 85 },
                  end: { line: 76, column: 95 },
                },
              })
            : helper)
        ) +
        '"  class="border-0 custom-carousel-indicator mt-2 mb-2 ' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          data && lookupProperty(data, "first"),
          {
            name: "if",
            hash: {},
            fn: container.program(5, data, 0, blockParams, depths),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 76, column: 150 },
              end: { line: 76, column: 177 },
            },
          }
        )) != null
          ? stack1
          : "") +
        '"\r\n                  aria-label="Slide ' +
        alias4(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : alias2),
          typeof helper === alias3
            ? helper.call(alias1, {
                name: "index",
                hash: {},
                data: data,
                loc: {
                  start: { line: 77, column: 36 },
                  end: { line: 77, column: 46 },
                },
              })
            : helper)
        ) +
        '" style = "width : ' +
        alias4(
          (
            lookupProperty(helpers, "width") ||
            (depth0 && lookupProperty(depth0, "width")) ||
            alias2
          ).call(
            alias1,
            (stack1 =
              depths[1] != null
                ? lookupProperty(depths[1], "stories")
                : depths[1]) != null
              ? lookupProperty(stack1, "length")
              : stack1,
            {
              name: "width",
              hash: {},
              data: data,
              loc: {
                start: { line: 77, column: 65 },
                end: { line: 77, column: 92 },
              },
            }
          )
        ) +
        '" disabled></button>\r\n'
      );
    },
    5: function (container, depth0, helpers, partials, data) {
      return "active";
    },
    7: function (container, depth0, helpers, partials, data) {
      var stack1,
        alias1 = depth0 != null ? depth0 : container.nullContext || {},
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '                    <div class="carousel-item ' +
        ((stack1 = lookupProperty(helpers, "if").call(
          alias1,
          data && lookupProperty(data, "first"),
          {
            name: "if",
            hash: {},
            fn: container.program(8, data, 0),
            inverse: container.noop,
            data: data,
            loc: {
              start: { line: 85, column: 46 },
              end: { line: 85, column: 75 },
            },
          }
        )) != null
          ? stack1
          : "") +
        ' w-100 h-100">\r\n                      <div class="d-flex justify-content-center align-items-center h-100 user-select-none">\r\n' +
        ((stack1 = (
          lookupProperty(helpers, "ifEquals") ||
          (depth0 && lookupProperty(depth0, "ifEquals")) ||
          container.hooks.helperMissing
        ).call(
          alias1,
          depth0 != null ? lookupProperty(depth0, "isVideo") : depth0,
          1,
          {
            name: "ifEquals",
            hash: {},
            fn: container.program(10, data, 0),
            inverse: container.program(12, data, 0),
            data: data,
            loc: {
              start: { line: 87, column: 24 },
              end: { line: 91, column: 37 },
            },
          }
        )) != null
          ? stack1
          : "") +
        "                      </div>\r\n                    </div>\r\n"
      );
    },
    8: function (container, depth0, helpers, partials, data) {
      return " active ";
    },
    10: function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '                        <video  controls src="' +
        alias1(
          container.lambda(
            depth0 != null ? lookupProperty(depth0, "url") : depth0,
            depth0
          )
        ) +
        '" class="d-block h-100 object-fit-cover" id="' +
        alias1(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "index",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 88, column: 103 },
                    end: { line: 88, column: 113 },
                  },
                }
              )
            : helper)
        ) +
        '"></video>\r\n'
      );
    },
    12: function (container, depth0, helpers, partials, data) {
      var helper,
        alias1 = container.escapeExpression,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (
        '                        <img src="' +
        alias1(
          container.lambda(
            depth0 != null ? lookupProperty(depth0, "url") : depth0,
            depth0
          )
        ) +
        '" class="d-block h-100 object-fit-cover" id="' +
        alias1(
          ((helper =
            (helper =
              lookupProperty(helpers, "index") ||
              (data && lookupProperty(data, "index"))) != null
              ? helper
              : container.hooks.helperMissing),
          typeof helper === "function"
            ? helper.call(
                depth0 != null ? depth0 : container.nullContext || {},
                {
                  name: "index",
                  hash: {},
                  data: data,
                  loc: {
                    start: { line: 90, column: 91 },
                    end: { line: 90, column: 101 },
                  },
                }
              )
            : helper)
        ) +
        '">\r\n'
      );
    },
    14: function (container, depth0, helpers, partials, data) {
      return "visually-hidden";
    },
    compiler: [8, ">= 4.3.0"],
    main: function (
      container,
      depth0,
      helpers,
      partials,
      data,
      blockParams,
      depths
    ) {
      var stack1,
        lookupProperty =
          container.lookupProperty ||
          function (parent, propertyName) {
            if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
              return parent[propertyName];
            }
            return undefined;
          };

      return (stack1 = lookupProperty(helpers, "each").call(
        depth0 != null ? depth0 : container.nullContext || {},
        depth0 != null ? lookupProperty(depth0, "users") : depth0,
        {
          name: "each",
          hash: {},
          fn: container.program(1, data, 1, blockParams, depths),
          inverse: container.noop,
          data: data,
          loc: {
            start: { line: 1, column: 1 },
            end: { line: 117, column: 15 },
          },
        }
      )) != null
        ? stack1
        : "";
    },
    useData: true,
    useDepths: true,
  });
})();
