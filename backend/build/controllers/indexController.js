"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Indexcontroller {
    index(req, res) {
        res.send("Hello");
    }
}
const indexcontroller = new Indexcontroller();
exports.default = indexcontroller;
