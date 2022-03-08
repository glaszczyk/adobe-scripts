const application: Application = app;
let activeDocument: Document;

type IterableCollection = Pages | TextFrames

type CollectionWithLength<T> = T & { length: number }

type TextFrameContent = string | TextFrameContents | SpecialCharacters;

const getVersion = (application: Application): string => application.version;

const runTest = () => {
    activeDocument = app.documents.item(0);
    const version: string = getVersion(application);
    alert(`Adobe ID version ${version}. Document title ${activeDocument.name}`);
}

const getDocumentPagesCollection = (): Pages => {
    activeDocument = app.activeDocument
    return activeDocument.pages;
}

const getPage = (allPages: Pages, idx: number) => allPages[idx];

const getPageTextFrames = (page: Page) => page.textFrames;

const getTextFrameContent = (textFrame: TextFrame) => textFrame.contents

const alertAllTextContent = () => {
    const allPages = getDocumentPagesCollection();
    forEach<Pages, Page>(allPages, (page) => {
        const pageTextFrames = getPageTextFrames(page);
        forEachReverse<TextFrames, TextFrame>(pageTextFrames, (textFrame) => {
            const frameContent = getTextFrameContent(textFrame);
            alert(`${frameContent}`);
        })
    })
}

const isEmptyFrame = (frame: TextFrame) => {
    if (frame.contentType === ContentType.TEXT_TYPE) {
        if (frame.contents === '' || frame.words.length === 0 ) return true
    }
    return false;
}

const mapContent = () => {
    const allPages = getDocumentPagesCollection();
    const allTextFramesContent = allPages.everyItem().textFrames.everyItem().contents;
    const contentPerPage = forEach<Pages, Page>(allPages, (page: Page) => {
        alert(`${page.textFrames.everyItem().contents}`)
    })
}

const useGrep = () => {
    activeDocument = application.documents.item(0);
    
    if (isFindGrepPreference(application.findGrepPreferences) && isChangeGrepPreference(application.changeGrepPreferences)) {
        application.findGrepPreferences.findWhat = "ius"
        application.changeGrepPreferences.changeTo = "OOO"
        const result = activeDocument.changeGrep(false);
        alert(`${result}`);
    }
}

const checkEmptyPages = () => {
    activeDocument = application.documents.item(0);
    const allPages = activeDocument.pages.everyItem();
    const allFramesArray = allPages.textFrames.everyItem().getElements() as TextFrame[];
    const result = filter(allFramesArray, isEmptyFrame )
    alert(`${result}`)
    const contentArray = map<TextFrame, string>(result, (text) => text.toSpecifier());
    alert(`${contentArray}`);
}

try {
    checkEmptyPages();
} catch (error) {
    alert(error)
}

function reduce<C,T>(array:C[], callback: (acc: T, element:C) => T, initial: T) {
    let result = initial;
    for (const element of array) {
        result = callback(result, element);
    }
    return result;
}

function forEach<C, T>(collection: CollectionWithLength<C>, callback: (element: T) => void) {
    for (let index = 0; index < collection.length; index++) {
        const element: T = collection[index];
        callback(element)
    }
}

function forEachReverse<C, T>(collection: CollectionWithLength<C> & { length: number }, callback: (element: T) => void) {
    for (let index = collection.length; index > 0; index--) {
        const element: T = collection[index - 1];
        callback(element)
    }
}

function filter<C>(collection: C[], predicate: (element: C) => boolean): C[] {
    let result: C[] = [];
    for (let index = 0; index < collection.length; index++) {
        const element = collection[index];
        const predicateResult: boolean = predicate(element)
        result = predicateResult ? [...result, element] : result;
    }
    return result;
}
function map<T, O>(array: T[], callback: (element: T) => O): O[] {
    let result: O[] = [];
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const callbackResult: O = callback(element)
        result = [...result, callbackResult]
    }
    return result;
}

function mapReverse<C, T>(collection: CollectionWithLength<C>, callback: <O>(element: T) => O[]) {
    for (let index = collection.length; index > 0; index--) {
        const element = collection[index - 1];
        return callback(element)
    }
}

function isFindGrepPreference(property: FindGrepPreference | NothingEnum): property is FindGrepPreference {
    return (property as FindGrepPreference).findWhat !== undefined;
}

function isChangeGrepPreference(property: ChangeGrepPreference | NothingEnum): property is ChangeGrepPreference {
    return (property as ChangeGrepPreference).changeTo !== undefined;
}
