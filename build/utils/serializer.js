"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const notAllowedAttributes = ["trips", "sessions"];
exports.default = async (data) => data.map((e) => lodash_1.omit(e._doc, notAllowedAttributes));
//# sourceMappingURL=serializer.js.map