export class ViewCompilerMockup {
    compile(html, resource) {
        return new ViewFactoryMockup();
    }
}

export class ViewFactoryMockup {
    create(container) {
        return new ViewMockup();
    }
}

export class ViewMockup {
    bind(context) {
    }

    appendNodesTo() {}

    attached() {}
}