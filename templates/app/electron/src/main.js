export function configure(aurelia) {
    return new Promise((resolve) => {
        aurelia.use
            .standardConfiguration()
            .developmentLogging()
            .globalResources()
            .plugin();

        aurelia.start().then(() => {
            aurelia.setRoot();
            resolve();
        });
    });
}