"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var puppeteer = require('puppeteer');
var promptClient = require('prompt');
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, categories, genreInt, genre, categoryLinks, categoryUrl, booksLink, booksLinkUrl, amazonButton, productUrlAmazon;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, puppeteer.launch({ headless: true })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto('https://www.goodreads.com/choiceawards/best-books-2020')];
            case 3:
                _a.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return Array.from(document.querySelectorAll('.category h4')).map(function (item, index) { return (index + 1 + " - " + item.innerText); });
                    })];
            case 4:
                categories = _a.sent();
                genreInt = -1;
                _a.label = 5;
            case 5:
                if (!!categories[genreInt]) return [3 /*break*/, 7];
                console.log('Please select the number of your option: ', categories);
                return [4 /*yield*/, promptClient.get(['genre'])];
            case 6:
                genre = (_a.sent()).genre;
                genreInt = parseInt(genre) - 1;
                return [3 /*break*/, 5];
            case 7: return [4 /*yield*/, page.$$('.category > a')];
            case 8:
                categoryLinks = _a.sent();
                return [4 /*yield*/, categoryLinks[genreInt].getProperty('href')];
            case 9: return [4 /*yield*/, (_a.sent()).jsonValue()];
            case 10:
                categoryUrl = _a.sent();
                console.log('Category URL:', categoryUrl);
                return [4 /*yield*/, page.goto(categoryUrl)];
            case 11:
                _a.sent();
                return [4 /*yield*/, page.$$('.pollAnswer__bookLink')];
            case 12:
                booksLink = _a.sent();
                return [4 /*yield*/, booksLink[Math.floor(Math.random() * booksLink.length)].getProperty('href')];
            case 13: return [4 /*yield*/, (_a.sent()).jsonValue()];
            case 14:
                booksLinkUrl = _a.sent();
                console.log('Book URL:', booksLinkUrl);
                return [4 /*yield*/, page.goto(booksLinkUrl)];
            case 15:
                _a.sent();
                return [4 /*yield*/, page.$('#buyButton')];
            case 16:
                amazonButton = _a.sent();
                return [4 /*yield*/, amazonButton.getProperty('href')];
            case 17: return [4 /*yield*/, (_a.sent()).jsonValue()];
            case 18:
                productUrlAmazon = _a.sent();
                console.log('Amazon url:', productUrlAmazon);
                return [4 /*yield*/, browser.close()];
            case 19:
                _a.sent();
                return [4 /*yield*/, puppeteer.launch({ headless: false, defaultViewport: null })];
            case 20:
                browser = _a.sent(); // default is true
                return [4 /*yield*/, browser.newPage()];
            case 21:
                page = _a.sent();
                return [4 /*yield*/, page.goto(productUrlAmazon)];
            case 22:
                _a.sent();
                return [4 /*yield*/, page.click('#add-to-cart-button')];
            case 23:
                _a.sent();
                return [4 /*yield*/, page.waitForNavigation()];
            case 24:
                _a.sent();
                return [4 /*yield*/, page.click('#hlb-ptc-btn-native')];
            case 25:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
