import {expect} from "chai";
import {component, named} from "./../../src/lib/schemas";

describe("schama tests", function() {
    it("componentSchema", function() {
        expect(component).to.not.be.null;
        expect(component.properties.name).to.not.be.null;
        expect(component.properties.path).to.not.be.null;
    });

    it("namedSchema", function() {
        expect(named).to.not.be.null;
        expect(named.properties.name).to.not.be.null;
    })
});