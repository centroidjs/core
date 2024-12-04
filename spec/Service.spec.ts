import {ServiceContainer, ServiceEventArgs} from '@centroidjs/common';

class AnotherService {
    public counter = 0;
}

class Service1 {
    constructor(protected another: AnotherService) {
        //
    }
    getMessage() {
        return {
            message: 'Hello World',
            counter: this.another.counter++
        };
    }
}

class Service2 extends Service1 {
    constructor(protected another: AnotherService) {
        super(another);
    }
    getMessage() {
        return {
            message: 'Hello World!',
            counter: this.another.counter++
        };
    }
}

describe('ServiceContainer', () => {
    it('should create instance', () => {
        const container = new ServiceContainer();
        const onLoading = (event: ServiceEventArgs) => {
            expect(event.target).toEqual(container);
        }
        container.serviceLoad.subscribe(onLoading);
        container.useService(Service1, {
            useFactory: () => new Service1(new AnotherService())
        });
        const service1 = container.getService(Service1);
        expect(service1).toBeTruthy();
        expect(container.hasService(Service1)).toBeTruthy();
    });

    it('should use service', () => {
        const container = new ServiceContainer();
        container.useService(AnotherService);
        container.useService(Service1, {
            useFactory: (serviceContainer) => new Service2(serviceContainer.getService(AnotherService))
        });
        const service = container.getService(Service1);
        expect(service).toBeTruthy();
        expect(service.getMessage().message).toEqual('Hello World!');
    });

    it('should delete service', () => {
        const container = new ServiceContainer();
        const onUnloading = (event: ServiceEventArgs) => {
            expect(event.target).toEqual(container);
        };
        container.serviceUnload.subscribe(onUnloading);
        container.useService(Service1);
        const service = container.getService(Service1);
        expect(service).toBeTruthy();
        container.removeService(Service1);
        expect(container.hasService(Service1)).toBeFalsy();
    });
});
