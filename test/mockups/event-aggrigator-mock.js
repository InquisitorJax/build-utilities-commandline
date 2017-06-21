export class EventAggregatorMock {
    subscriptions;

    constructor() {
        this.subscriptions = new Map();
    }

    subscribe(key, callback) {
        this.subscriptions.set(key, callback);
        return new EventAggregatorPointer();
    }

    publish(key, object) {
        if (this.subscriptions.has(key)) {
            this.subscriptions.get(key)(object);
        }
    }
}

export class EventAggregatorPointer {
    dispose() {
    }
}