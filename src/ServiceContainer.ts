declare type ApplicationServiceConstructor<T> = new (...args: unknown[]) => T;
declare type InjectableApplicationService = new (...args: unknown[]) => unknown;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function injectable(configuration?: { providers: ApplicationServiceConstructor<unknown>[] }) {
    return (target: InjectableApplicationService) => {
        const original = target;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ctor: any = function (...args: unknown[]): unknown {
            return new original(...args) as unknown;
        }
        const {prototype} = original;
        Object.assign(ctor, {
            prototype
        });
        return ctor;
    };
}

class ServiceContainer {

    private readonly services = new Map<string, unknown>;
    
    public get<T>(serviceConstructor?: ApplicationServiceConstructor<T>): T {
        return this.services.get(serviceConstructor.name) as T;
    }

    public has<T>(serviceConstructor: ApplicationServiceConstructor<T>): boolean {
        return this.services.has(serviceConstructor.name);
    }

    public delete<T>(serviceConstructor: ApplicationServiceConstructor<T>): boolean {
        return this.services.delete(serviceConstructor.name);
    }

    public use<T>(
        serviceConstructor: ApplicationServiceConstructor<T>,
        strategyConstructor?: ApplicationServiceConstructor<T>
    ): this {
        if (strategyConstructor) {
            const strategy = new strategyConstructor();
            this.services.set(serviceConstructor.name, strategy);
            return this;
        }
        this.services.set(serviceConstructor.name, new serviceConstructor());
        return this;
    }

}

export {
    ServiceContainer,
    injectable
}