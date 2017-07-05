export class App {
    router = null;

    configureRouter(config, router) {
        config.title = 'Application Title';
        config.map([
            { route: ['', 'welcome'], name: 'welcome', moduleId: 'views/welcome/welcome', nav: true, title: 'Welcome' },
        ]);

        this.router = router;
    }
}