class CustomEventMock {
    name;
    details;

    constructor(name, details) {
        this.name = name;
        this.details = details;
    }
}

global.CustomEvent = CustomEventMock;