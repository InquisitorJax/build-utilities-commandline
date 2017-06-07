export class TemplateEngineMockup {
    element;
    context;

    enhance(option) {
        this.element = option.element;
        this.context = option.bindingContext;
    }
}