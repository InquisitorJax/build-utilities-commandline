const fsPath = require('fs-path');
const paths = require('./../project-paths');
const event = require('events');

const doneEventEmitter = new event.EventEmitter();

class TestKeysHelper {
    constructor() {
        this.supportedKeysMap = new Map();
        this.supportedKeysMap.set("return", testWebDriver.webdriver.Key.RETURN);
        this.supportedKeysMap.set("enter", testWebDriver.webdriver.Key.ENTER);
        this.supportedKeysMap.set("backspace", testWebDriver.webdriver.Key.BACK_SPACE);
        this.supportedKeysMap.set("tab", testWebDriver.webdriver.Key.TAB);
        this.supportedKeysMap.set("shift", testWebDriver.webdriver.Key.SHIFT);
        this.supportedKeysMap.set("ctrl", testWebDriver.webdriver.Key.CONTROL);
        this.supportedKeysMap.set("alt", testWebDriver.webdriver.Key.ALT);
        this.supportedKeysMap.set("spacebar", testWebDriver.webdriver.Key.SPACE);
        this.supportedKeysMap.set("esc", testWebDriver.webdriver.Key.ESCAPE);
        this.supportedKeysMap.set("page-up", testWebDriver.webdriver.Key.PAGE_UP);
        this.supportedKeysMap.set("page-down", testWebDriver.webdriver.Key.PAGE_DOWN);
        this.supportedKeysMap.set("end",testWebDriver.webdriver.Key.END);
        this.supportedKeysMap.set("home",testWebDriver.webdriver.Key.HOME);
        this.supportedKeysMap.set("left-arrow",testWebDriver.webdriver.Key.ARROW_LEFT);
        this.supportedKeysMap.set("right-arrow",testWebDriver.webdriver.Key.ARROW_RIGHT);
        this.supportedKeysMap.set("up-arrow",testWebDriver.webdriver.Key.ARROW_UP);
        this.supportedKeysMap.set("down-arrow",testWebDriver.webdriver.Key.ARROW_DOWN);
        this.supportedKeysMap.set("insert",testWebDriver.webdriver.Key.INSERT);
        this.supportedKeysMap.set("delete",testWebDriver.webdriver.Key.DELETE);
        this.supportedKeysMap.set("f1",testWebDriver.webdriver.Key.F1);
        this.supportedKeysMap.set("f2",testWebDriver.webdriver.Key.F2);
        this.supportedKeysMap.set("f3",testWebDriver.webdriver.Key.F3);
        this.supportedKeysMap.set("f4",testWebDriver.webdriver.Key.F4);
        this.supportedKeysMap.set("f5",testWebDriver.webdriver.Key.F5);
        this.supportedKeysMap.set("f6",testWebDriver.webdriver.Key.F6);
        this.supportedKeysMap.set("f7",testWebDriver.webdriver.Key.F7);
        this.supportedKeysMap.set("f8",testWebDriver.webdriver.Key.F8);
        this.supportedKeysMap.set("f9",testWebDriver.webdriver.Key.F9);
        this.supportedKeysMap.set("f10",testWebDriver.webdriver.Key.F10);
        this.supportedKeysMap.set("f11",testWebDriver.webdriver.Key.F11);
        this.supportedKeysMap.set("f12",testWebDriver.webdriver.Key.F12);
        this.supportedKeysMap.set("command",testWebDriver.webdriver.Key.COMMAND);
    }

    generateInputFromKeys(keys) {
        const processedKeys = [];

        if (Array.isArray(keys)) {
            for(let i = 0; i < keys.length; i++) {
                let key = keys[i].toLowerCase();
                processedKeys.push(this.supportedKeysMap.has(key) ? this.supportedKeysMap.get(key) : key);
            }
        }
        else {
            processedKeys.push(this.supportedKeysMap.has(keys) ? this.supportedKeysMap.get(keys) : key);
        }

        return testWebDriver.webdriver.Key.chord(processedKeys);
    }

}

class TestWebDriver {
    constructor() {
        this.webdriver = require('selenium-webdriver');
        this.by = this.webdriver.By;
        this.until = this.webdriver.until;
        this.driver = new this.webdriver.Builder().forBrowser('chrome').build();
        this.WebElement = this.webdriver.WebElement;
        this.action = new this.webdriver.ActionSequence(this.driver);
        this.Condition = this.webdriver.Condition;
    }

    hasElement(id) {
        return this.driver.findElements(By.id(id)).size() != 0;
    }
}

let testWebDriver = null;
let keysHelper = null;

const supportedCommands = {
    open: "open",
    type: "type",
    visible: "visible",
    invisible: "invisible",
    enabled: "enabled",
    disabled: "disabled",
    click: "click",
    dblclick: "dblclick",
    pressKeys: "pressKeys",
    wait: "wait",
    required: "required",
    selected: "selected",
    checked: "checked",
    readonly: "readonly",
    valid: "valid",
    invalid: "invalid",
    clear: "clear",
    hasElement: "hasElement",
    hasAttribute: "hasAttribute",
    setAttribute: "setAttribute",
    attributeValue: "attributeValue",
    hasClass: "hasClass",
    hasNotClass: "hasNotClass",
    cssAttribute: "cssAttribute",
    hasFocus: "hasFocus",
    focus: "focus"
};

let globalUrl = "";

class GlobalSummary {
    constructor() {
        this.globalErrors = [];
        this.tests = [];

        doneEventEmitter.on('done', this.saveToFile.bind(this));
    }

    addGlobalError(error) {
        this.globalErrors.push(error);
    }

    addTest(testSummary) {
        this.tests.push(testSummary);
    }

    generateContentToSave() {
        let result = {};
        let errorCount = 0;

        if (this.globalErrors.length > 0) {
            errorCount += this.globalErrors.length;
            result.globalErrors = this.globalErrors;
        }

        result.numberOfTests = this.tests.length;

        for (let i = 0; i < this.tests.length; i++) {
            const test = this.tests[i];
            const testErrorCount = test.getNumberOfErrors();
            errorCount += testErrorCount;

            if (testErrorCount > 0) {
                if (!result.failedTests) {
                    result.failedTests = [];
                }

                result.failedTests.push({
                    testSource: test.sourceFile,
                    testResult: test.resultsFile,
                    errorCount: testErrorCount
                });
            }
        }

        result.totalErrorCount = errorCount;

        return result;
    }

    saveTestsToFile() {
        for (let i = 0; i < this.tests.length; i++) {
            this.tests[i].saveToFile();
        }
    }

    saveToFile() {
        this.saveTestsToFile();

        const content = JSON.stringify(this.generateContentToSave(), null, 4);
        console.log(content + "\n");

        fsPath.writeFile(paths.e2eResultsPath('summary.json'), content, function(error) {
            if (error) {
                console.log(error);
            }
        });

        if (this.numberOfErrors > 0) {
            console.error(`There were ${this.numberOfErrors} error/s: please review the summary file under e2e_results.`);
        }
    }
}

class Test {
    constructor(json) {
        this.globalErrors = [];
        this.json = json;
        this.sourceFile = json.test.path;
        this.steps = [];

        this.getResultsFile();
        this.processJson();
    }

    processJson() {
        if (!this.json.steps) {
            this.addGlobalError("steps are not defined");
            return currentTestSummary;
        }

        let undefined = "undefined";

        for(let i = 0; i < this.json.steps.length; i++) {
            let step = this.json.steps[i];

            if (typeof step[supportedCommands.open] !== undefined) {
                this.steps.push(new OpenStep(step));
            }
            else if (typeof step[supportedCommands.type] !== undefined) {
                this.steps.push(new TypeStep(step));
            }
            else if (typeof step[supportedCommands.click] !== undefined) {
                this.steps.push(new ClickStep(step));
            }
            else if (typeof step[supportedCommands.dblclick] !== undefined) {
                this.steps.push(new DoubleClickStep(step));
            }
            else if (typeof step[supportedCommands.pressKeys] !== undefined) {
                this.steps.push(new PressKeysStep(step));
            }
            else if (typeof step[supportedCommands.wait] !== undefined) {
                this.steps.push(new WaitStep(step));
            }
            else if (typeof step[supportedCommands.visible] !== undefined) {
                this.steps.push(new VisibleStep(step));
            }
            else if (typeof step[supportedCommands.invisible] !== undefined) {
                this.steps.push(new InvisibleStep(step));
            }
            else if (typeof step[supportedCommands.enabled] !== undefined) {
                this.steps.push(new EnabledStep(step));
            }
            else if (typeof step[supportedCommands.disabled] !== undefined) {
                this.steps.push(new DisabledStep(step));
            }
            else if (typeof step[supportedCommands.required] != undefined) {
                this.steps.push(new RequiredStep(step));
            }
            else if (typeof step[supportedCommands.selected] != undefined) {
                this.steps.push(new SelectedStep(step));
            }
            else if (typeof step[supportedCommands.checked] != undefined) {
                this.steps.push(new CheckedStep(step));
            }
            else if (typeof step[supportedCommands.readonly] != undefined) {
                this.steps.push(new ReadOnlyStep(step));
            }
            else if (typeof step[supportedCommands.valid] != undefined) {
                this.steps.push(new ValidValueStep(step));
            }
            else if (typeof step[supportedCommands.invalid] != undefined) {
                this.steps.push(new InvalidStep(step));
            }
            else if (typeof step[supportedCommands.clear] != undefined) {
                this.steps.push(new ClearStep(step));
            }
            else if (typeof step[supportedCommands.hasElement] != undefined) {
                this.steps.push(new HasElementStep(step));
            }
            else if (typeof step[supportedCommands.hasAttribute] != undefined) {
                this.steps.push(new HasAttributeStep(step));
            }
            else if (typeof step[supportedCommands.setAttribute] != undefined) {
                this.steps.push(new SetAttributeStep(step));
            }
            else if (typeof step[supportedCommands.attributeValue] != undefined) {
                this.steps.push(new AttributeValueStep(step));
            }
            else if (typeof step[supportedCommands.hasClass] != undefined) {
                this.steps.push(new HasClassStep(step))
            }
            else if (typeof step[supportedCommands.hasNotClass] != undefined) {
                this.steps.push(new HasNotClassStep(step))
            }
            else if (typeof step[supportedCommands.cssAttribute] != undefined) {
                this.steps.push(new CssAttributeStep(step))
            }
            else if (typeof step[supportedCommands.hasFocus] != undefined) {
                this.steps.push(new HasFocusStep(step))
            }
            else if (typeof step[supportedCommands.focus] != undefined) {
                this.steps.push(new Focus(step))
            }
        }
    }

    performSteps() {
        for (let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];

            try {
                step.perform();
            }
            catch(error) {
                step.logError(error.message);
            }
        }
    }

    addGlobalError(error) {
        this.globalErrors.push(error);
    }

    addStepResult(stepResult) {
        this.stepResults.push(stepResult);
    }

    getNumberOfErrors() {
        const errors = this.steps.filter(function(step) {
            return step.success === false;
        });

        return errors.length + this.globalErrors.length;
    }

    getResultsFile() {
        if (this.resultsFile != null) {
            return this.resultsFile;
        }

        const index = this.json.test.path.indexOf('e2e');
        const path = this.json.test.path.slice(index + 4);
        this.resultsFile = paths.e2eResultsPath(path);

        return this.resultsFile;
    }

    generateContentToSave() {
        let result = {};
        let errorCount = 0;

        if (this.globalErrors.length > 0) {
            errorCount += this.globalErrors.length;
            result.globalErrors = this.globalErrors;
        }

        result.totalErrorCount;

        result.steps = [];
        for(let i = 0; i < this.steps.length; i++) {
            const step = this.steps[i];
            const stepResult = {
                success: step.success,
                details: step.step
            };

            if (step.error) {
                stepResult.error = step.error;
                errorCount++;
            }

            result.steps.push(stepResult);
        }

        result.totalErrorCount = errorCount;

        return result;
    }

    saveToFile(sourceTestPath) {
        const content = JSON.stringify(this.generateContentToSave(), null, 4);

        fsPath.writeFile(this.resultsFile, content, function(error) {
            if (error) {
                console.log(error);
            }
        });
    }
}

class Step {
    constructor(step) {
        this.step = step;
        this.success = true;
    }

    perform() {
        this.logError('override this method');
    }

    logError(error) {
        this.success = false;
        this.error = error;
    }

    getElementById(elementName) {
        return testWebDriver.driver.findElement(this.getTargetLocator(elementName));
    }

    getTargetLocator(elementName) {
        if (elementName[0] === "?") {
            return testWebDriver.by.css(elementName.split("?")[1]);
        }

        return testWebDriver.by.id(elementName);
    }

    checkHasFocus(elementName) {
        const currentActiveElement = testWebDriver.driver.switchTo().activeElement();
        const checkActiveElement = this.getElementById(elementName);

        testWebDriver.WebElement.equals(checkActiveElement, currentActiveElement).then(areEqual => {
            if (!areEqual) {
                this.logError(`${elementName} should be focused`);
            }

            testWebDriver.driver.switchTo().defaultContent();
        });
    }

    focusElement(elementName) {
        const element = this.getElementById(elementName);

        element.getTagName().then((tagName) => {
            if (tagName == "input") {
                element.sendKeys(`document.getElementById(${elementName}).focus()`);
            }
            else {
                testWebDriver.driver.executeScript(`document.getElementById("${elementName}").focus();`)
            }
        });
    }

    setAttribute(elementName, attribute, value) {
        const script = `document.getElementById("${elementName}").setAttribute("${attribute}", "${value}");`;
        testWebDriver.driver.executeScript(script);
    }

    checkAttribute(elementName, attribute, value, allowNullAttribute) {
        const element = this.getElementById(elementName);
        element.getAttribute(attribute).then(function(attr) {
            if (!attr && !allowNullAttribute) {
                this.logError(`${elementName} should have attribute ${attribute}`);
            }

            if (attr && attr !== value) {
                this.logError(`${elementName} expected ${attribute} to be ${value} but was ${attr}`);
            }
        }.bind(this));
    }

    checkContainsClass(elementName, classValue) {
        const element = this.getElementById(elementName);
        element.getAttribute("class").then(function(attr) {
            const classCollection = attr.split(" ");
            if (classCollection.indexOf(classValue) === -1) {
                this.logError(`${elementName} should have a css class ${classValue} in class attribute`);
            }
        }.bind(this));
    }

    checkDoesNotContainClass(elementName, className) {
        const element = this.getElementById(elementName);
        element.getAttribute("class").then(function(attr) {
            const classCollection = attr.split(" ");
            if (classCollection.indexOf(className) > -1) {
                this.logError(`${elementName} should not have a css class ${classValue} in class attribute`);
            }
        }.bind(this));
    };

    checkCss(elementName, cssAttribute, value, alternative){
        const element = this.getElementById(elementName);
        element.getCssValue(cssAttribute).then(function(cssValue) {
            if (value != cssValue && alternative != cssValue) {
                this.logError(`${elementName} expected css value for ${cssAttribute} to be ${value} but was ${cssValue.length > 0 ? cssValue : 'not defined'}`);
            }
        }.bind(this));
    }

    checkAttributePresent(elementName, attribute, shouldBeThere) {
        const element = this.getElementById(elementName);
        element.getAttribute(attribute).then(function(attr) {
            if (!attr && shouldBeThere) {
                this.logError(`${elementName} expected to have attribute "${attribute}" but it was not present`);
            }

            if (attr && !shouldBeThere) {
                this.logError(`${elementName} should not have attribute "${attribute}" but it was present`)
            }
        }.bind(this));
    }

    checkHasElement(elementName) {
        const hasElement = testWebDriver.hasElement(elementName);

        if (!hasElement) {
            this.logError(`${elementName} was not found but expected in dom`);
        }

        return hasElement;
    }
}

class QuitStep extends Step {
    perform() {
        testWebDriver.driver.quit().then(function() {
            doneEventEmitter.emit('done');
        });
    }
}

class OpenStep extends Step {
    perform() {
        const url = this.step[supportedCommands.open];
        testWebDriver.driver.get(url.length > 0 ? url : globalUrl);
    }
}

class TypeStep extends Step {
    perform() {
        const type = this.step[supportedCommands.type];
        const text = type.text;
        const target = type.target;

        if (!target || target.length === 0) {
            this.logError('target is required');
        }

        if (!text || text.length === 0) {
            this.logError(`text is required for ${target}`);
        }

        const element = this.getElementById(target);
        element.clear();
        element.sendKeys(text).catch(error => {
            this.logError(error);
        });
    }
}

class ClickStep extends Step {
    perform() {
        const target = this.step[supportedCommands.click];

        if (!target) {
            this.logError('click target needs to be defined')
        }

        return this.getElementById(target).click().catch(error => {
            this.logError(error);
        });
    }
}

class DoubleClickStep extends Step {
    perform() {
        const target = this.step[supportedCommands.dblclick];
        const element = this.getElementById(target);
        testWebDriver.action.doubleClick(element).perform();
    }
}

class PressKeysStep extends Step {
    perform() {
        const pressKeys = this.step[supportedCommands.pressKeys];
        const keys = keysHelper.generateInputFromKeys(pressKeys.keys);
        const target = pressKeys.target;

        const element = this.getElementById(target);
        element.sendKeys(keys).catch(error => {
            this.logError(error);
        });
    }
}

class WaitStep extends Step {
    perform() {
        const waiter = this.step[supportedCommands.wait];
        let timeout = waiter["timeout"];
        const titleIs = waiter["title"];
        const text = waiter["text"];
        const type = waiter["type"];
        const target = waiter["target"];

        if (typeof titleIs !== "undefined") {
            testWebDriver.driver.wait(testWebDriver.until.titleIs(titleIs), Number(timeout));
        }
        else if (typeof text !== "undefined") {
            const attribute = waiter["attribute"];

            if (typeof attribute !== "undefined") {
                this.waitForAttributeToChange(target, attribute, text, timeout);
            }
            else {
                this.waitForTextToChange(target, text, timeout);
            }
        }
        else if (typeof type !== "undefined") {
            this.waitForTypeToChange(target, type, timeout)
        }
        else {
            const target = waiter["target"];
            this.waitForElementToExist(target, timeout);
        }
    }

    waitForTypeToChange(target, type, timeout) {
        let elementType = "";
        const locator = this.getTargetLocator(target);

        const condition = new testWebDriver.Condition('for element ' + target, function () {
            const element = testWebDriver.driver.findElement(locator);
            element.getTagName().then(tagName => {
                elementType = tagName;
            });

            return elementType == type;
        });

        if (!timeout) {
            timeout = 5000;
        }

        testWebDriver.driver.wait(condition, Number(timeout)).catch(error => {
            this.logError(error.message);
        });
    }

    waitForElementToExist(target, timeout) {
        let hasElement = false;
        const locator = this.getTargetLocator(target);

        const condition = new testWebDriver.Condition('for element to exist in dom ' + target, function() {
            return testWebDriver.hasElement(locator);
        });

        if (!timeout) {
            timeout = 5000;
        }

        testWebDriver.driver.wait(condition, Number(timeout)).catch(error => {
            this.logError(error.message);
        });
    }

    waitForTextToChange(target, text, timeout) {
        if (!target || !text) {
            this.logError("waitForTextToChange requires both target and text");
        }

        if (!timeout) {
            timeout = 1000;
        }

        const element = this.getElementById(target);
        let tagName = "";
        let hasChanged = false;

        const condition = new testWebDriver.Condition('for text change on ' + target, function() {
            if (tagName === "label" || tagName === "div" || tagName === "h1" || tagName === "h2" ) {
                element.getAttribute('innerHTML').then(attribute => {
                    hasChanged = attribute === text;
                });
            }
            else {
                element.getAttribute('value').then(attribute => {
                    hasChanged = attribute === text;
                })
            }

            return hasChanged;
        });

        element.getTagName().then((elementTagName) => {
            tagName = elementTagName;
            testWebDriver.driver.wait(condition, Number(timeout)).catch(error => {
                this.logError(error.message);
            });
        });
    }

    waitForAttributeToChange(target, attribute, text, timeout) {
        if (!timeout) {
            timeout = 1000;
        }

        const element = this.getElementById(target);

        let hasChanged = false;

        const condition = new testWebDriver.Condition('for attibute change on' + target, function() {
            element.getAttribute(attribute).then(attribute => {
                hasChanged = attribute === text;
            });

            return hasChanged;
        });

        testWebDriver.driver.wait(condition, Number(timeout)).catch(error => {
            this.logError(error.message);
        })
    }
}

class VisibleStep extends Step {
    perform() {
        this.checkAttribute(this.step[supportedCommands.visible], "aria-hidden", "false", true);
    }
}

class InvisibleStep extends Step {
    perform() {
        this.checkAttribute(this.step[supportedCommands.invisible], "aria-hidden", "true");
    }
}

class EnabledStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.enabled];
        this.checkAttribute(elementName, "aria-disabled", "false", true);
        this.checkAttributePresent(elementName, "disabled", false);
    }
}

class DisabledStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.disabled];
        this.checkAttribute(elementName, "aria-disabled", "true");
        this.checkAttributePresent(elementName, "disabled", true);
    }
}

class RequiredStep extends Step {
    perform() {
        this.checkAttribute(this.step[supportedCommands.required], "aria-required", "true");
    };
}

class SelectedStep extends Step {
    perform() {
        this.checkAttribute(this.step[supportedCommands.selected], "aria-selected", "true");
    }
}

class CheckedStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.checked];
        this.checkAttribute(elementName, "aria-checked", "true");
        this.checkAttributePresent(elementName, "checked", true);
    }
}

class ReadOnlyStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.readonly];
        this.checkAttribute(elementName, "aria-readonly", "true");
        this.checkAttributePresent(elementName, "readonly", true);
    }
}

class ValidValueStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.valid];
        this.checkAttribute(elementName, "aria-invalid", "false", true);
    }
}

class InvalidStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.invalid];
        this.checkAttribute(elementName, "aria-invalid", "true");
    }
}

class ClearStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.clear];
        const element = this.getElementById(elementName);
        element.clear();
    }
}

class HasElementStep extends Step {
    perform() {
        const elementName = this.step[supportedCommands.hasElement];
        this.checkHasElement(elementName);
    }
}

class HasAttributeStep extends Step {
    perform() {
        const hasAttribute = this.step[supportedCommands.hasAttribute];
        const target = hasAttribute.target;
        const attribute = hasAttribute.attribute;
        const exists = typeof hasAttribute.exists === "undefined" ? true : hasAttribute.exists;
        this.checkAttributePresent(target, attribute, exists);
    }
}

class AttributeValueStep extends Step {
    perform() {
        const attributeValue = this.step[supportedCommands.attributeValue];
        const target = attributeValue.target;
        const attribute = attributeValue.attribute;
        const text = attributeValue.text;

        this.checkAttribute(target, attribute, text, false);
    }
}

class HasClassStep extends Step {
    perform() {
        const hasClass = this.step[supportedCommands.hasClass];
        const target = hasClass.target;
        const classValue = hasClass.class;

        this.checkContainsClass(target, classValue);
    }
}

class SetAttributeStep extends Step {
    perform() {
        const setAttribute = this.step[supportedCommands.setAttribute];
        const target = setAttribute.target;
        const attribute = setAttribute.attribute;
        const value = setAttribute.value;

        this.setAttribute(target, attribute, value);
    }
}

class HasNotClassStep extends Step {
    perform() {
        const hasNotClass = this.step[supportedCommands.hasNotClass];
        const target = hasNotClass.target;
        const classValue = hasNotClass.class;

        this.checkDoesNotContainClass(target, classValue);
    }
}

class CssAttributeStep extends Step {
    perform() {
        const cssAttribute = this.step[supportedCommands.cssAttribute];
        const target = cssAttribute.target;
        const attribute = cssAttribute.attribute;
        const value = cssAttribute.value;
        const alt = cssAttribute.alt;

        this.checkCss(target, attribute, value, alt);
    }
}

class HasFocusStep extends Step {
    perform() {
        const target = this.step[supportedCommands.hasFocus];
        this.checkHasFocus(target);
    }
}

class Focus extends Step {
    perform() {
        const target = this.step[supportedCommands.focus];
        this.focusElement(target);
    }
}

class AutomationTestRunner {
    constructor(url) {
        testWebDriver = new TestWebDriver();
        keysHelper = new TestKeysHelper();
        globalUrl = url;
        this.httpServer = null;
        this.summary = new GlobalSummary();
        doneEventEmitter.on('done', this.exit.bind(this));
    }

    exit() {
        if (this.doneCallback != null) {
            this.doneCallback();
        }
    }

    run(json, callback) {
        this.doneCallback = callback;

        try {

            if (Array.isArray(json))
            {
                for(let i = 0; i < json.length; i++) {
                    this.runAndMonitorJson(json[i]);
                }
            }
            else {
                this.runAndMonitorJson(json)
            }

            testWebDriver.driver.quit().then(function() {
                doneEventEmitter.emit('done');
            });
        }
        catch(error) {
            this.summary.addGlobalError(error.message);
            console.error("E2E URGENT ERROR: " + error.message);
            this.exit();
        }
    }

    runAndMonitorJson(json) {
        const test = new Test(json);
        this.summary.addTest(test);

        test.performSteps();
    }
}

module.exports = AutomationTestRunner;