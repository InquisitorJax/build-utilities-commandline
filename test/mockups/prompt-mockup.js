class PromptMockup {
    start() {
        return;
    }

    get(schema, callback) {
        callback(null, {
            name: "test",
            prompt: "testPath"
        })
    }
}


module.exports = {
    prompt: new PromptMockup()
};