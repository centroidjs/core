import { ServiceContainer, injectable } from '@centroidjs/common';

@injectable()
class AnotherService {
    public readonly enabled = true;
}

@injectable({
    providers: [
        AnotherService
    ]
})
class Service1 {
    constructor(protected another: AnotherService) {
        //
    }
    getMessage() {
        return {
            message: 'Hello World',
            enabled: this.another.enabled
        };
    }
}

@injectable({
    providers: [
        AnotherService
    ]
})
class Service2 extends Service1 {
    constructor(protected another: AnotherService) {
        super(another);
    }
    getMessage() {
        return {
            message: 'Hello World',
            enabled: this.another.enabled
        };
    }
}

describe('ServiceContainer', () => {
    it('should create instance', () => {
        const container = new ServiceContainer();
        container.use(Service1);
        const service1 = container.get(Service1);
        expect(service1).toBeTruthy();
        expect(container.has(Service1)).toBeTruthy();
    });

    it('should use service', () => {
        const container = new ServiceContainer();
        container.use(Service1, Service2);
        const service = container.get(Service1);
        expect(service).toBeTruthy();
        expect(service.getMessage().message).toEqual('Hello World!');
    });

    it('should delete service', () => {
        const container = new ServiceContainer();
        container.use(Service1, Service2);
        const service = container.get(Service1);
        expect(service).toBeTruthy();
        container.delete(Service1);
        expect(container.has(Service1)).toBeFalsy();
    });
});
