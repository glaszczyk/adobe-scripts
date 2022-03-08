var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var application = app;
var activeDocument;
var getVersion = function (application) { return application.version; };
var runTest = function () {
    activeDocument = app.documents.item(0);
    var version = getVersion(application);
    alert("Adobe ID version ".concat(version, ". Document title ").concat(activeDocument.name));
};
var getDocumentPagesCollection = function () {
    activeDocument = app.activeDocument;
    return activeDocument.pages;
};
var getPage = function (allPages, idx) { return allPages[idx]; };
var getPageTextFrames = function (page) { return page.textFrames; };
var getTextFrameContent = function (textFrame) { return textFrame.contents; };
var alertAllTextContent = function () {
    var allPages = getDocumentPagesCollection();
    forEach(allPages, function (page) {
        var pageTextFrames = getPageTextFrames(page);
        forEachReverse(pageTextFrames, function (textFrame) {
            var frameContent = getTextFrameContent(textFrame);
            alert("".concat(frameContent));
        });
    });
};
var isEmptyFrame = function (frame) {
    if (frame.contentType === ContentType.TEXT_TYPE) {
        if (frame.contents === '' || frame.words.length === 0)
            return true;
    }
    return false;
};
var mapContent = function () {
    var allPages = getDocumentPagesCollection();
    var allTextFramesContent = allPages.everyItem().textFrames.everyItem().contents;
    var contentPerPage = forEach(allPages, function (page) {
        alert("".concat(page.textFrames.everyItem().contents));
    });
};
var useGrep = function () {
    activeDocument = application.documents.item(0);
    if (isFindGrepPreference(application.findGrepPreferences) && isChangeGrepPreference(application.changeGrepPreferences)) {
        application.findGrepPreferences.findWhat = "ius";
        application.changeGrepPreferences.changeTo = "OOO";
        var result = activeDocument.changeGrep(false);
        alert("".concat(result));
    }
};
var checkEmptyPages = function () {
    activeDocument = application.documents.item(0);
    var allPages = activeDocument.pages.everyItem();
    var allFramesArray = allPages.textFrames.everyItem().getElements();
    var result = filter(allFramesArray, isEmptyFrame);
    alert("".concat(result));
    var contentArray = map(result, function (text) { return text.toSpecifier(); });
    alert("".concat(contentArray));
};
try {
    checkEmptyPages();
}
catch (error) {
    alert(error);
}
function reduce(array, callback, initial) {
    var result = initial;
    for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
        var element = array_1[_i];
        result = callback(result, element);
    }
    return result;
}
function forEach(collection, callback) {
    for (var index = 0; index < collection.length; index++) {
        var element = collection[index];
        callback(element);
    }
}
function forEachReverse(collection, callback) {
    for (var index = collection.length; index > 0; index--) {
        var element = collection[index - 1];
        callback(element);
    }
}
function filter(collection, predicate) {
    var result = [];
    for (var index = 0; index < collection.length; index++) {
        var element = collection[index];
        var predicateResult = predicate(element);
        result = predicateResult ? __spreadArray(__spreadArray([], result, true), [element], false) : result;
    }
    return result;
}
function map(array, callback) {
    var result = [];
    for (var index = 0; index < array.length; index++) {
        var element = array[index];
        var callbackResult = callback(element);
        result = __spreadArray(__spreadArray([], result, true), [callbackResult], false);
    }
    return result;
}
function mapReverse(collection, callback) {
    for (var index = collection.length; index > 0; index--) {
        var element = collection[index - 1];
        return callback(element);
    }
}
function isFindGrepPreference(property) {
    return property.findWhat !== undefined;
}
function isChangeGrepPreference(property) {
    return property.changeTo !== undefined;
}
