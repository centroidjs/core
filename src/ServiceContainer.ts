
declare type ServiceConstructor<T> = new (...args: unknown[]) => T;

declare type InjectableServiceConstructor<T> = new (container: ServiceContainer, ...args: unknown[]) => T;

declare type ServiceFactory<T> = (container: ServiceContainer, ...args: unknown[]) => T;

/**
 * A container for managing application services.
 * 
 * @class ServiceContainer
 * @template T - The type of the service.
 */
class ServiceContainer {

    protected readonly services = new Map<string, unknown>;
    
    /**
     * Retrieves a service instance from the service container.
     *
     * @template T - The type of the service to retrieve.
     * @param {ServiceConstructor<T>} [serviceConstructor] - The constructor of the service to retrieve.
     * @returns {T} The instance of the requested service.
     */
    public getService<T>(serviceConstructor?: ServiceConstructor<T>): T {
        return this.services.get(serviceConstructor.name) as T;
    }

    /**
     * Checks if a service is registered in the service container.
     *
     * @template T - The type of the service.
     * @param {ServiceConstructor<T>} serviceConstructor - The constructor of the service to check.
     * @returns {boolean} - Returns `true` if the service is registered, otherwise `false`.
     */
    public hasService<T>(serviceConstructor: ServiceConstructor<T>): boolean {
        return this.services.has(serviceConstructor.name);
    }

    /**
     * Removes a service from the service container.
     *
     * @template T - The type of the service to be removed.
     * @param {ServiceConstructor<T>} serviceConstructor - The constructor of the service to be removed.
     * @returns {boolean} - Returns `true` if the service was successfully removed, otherwise `false`.
     */
    public removeService<T>(serviceConstructor: ServiceConstructor<T>): boolean {
        return this.services.delete(serviceConstructor.name);
    }

    /**
     * Registers a service with the service container.
     *
     * @template T - The type of the service.
     * @param {ServiceConstructor<T>} serviceConstructor - The constructor of the service to be registered.
     * @param {ServiceConstructor<T> | { useFactory: ServiceFactory<T> }} [strategyConstructor] - Optional. Either a constructor for a strategy or an object containing a factory function to create the service.
     * @returns {this} The current instance of the service container.
     */
    public useService<T>(
        serviceConstructor: ServiceConstructor<T>,
        strategyConstructor?: ServiceConstructor<T> | { useFactory: ServiceFactory<T> }
    ): this {
        if (typeof strategyConstructor === 'function') {
            const strategy = new strategyConstructor(this);
            this.services.set(serviceConstructor.name, strategy);
            return this;
        }
        if (typeof strategyConstructor === 'object' && typeof strategyConstructor.useFactory === 'function') {
            const strategy = strategyConstructor.useFactory(this);
            this.services.set(serviceConstructor.name, strategy);
            return this;
        }
        this.services.set(serviceConstructor.name, new serviceConstructor(this));
        return this;
    }

}

export {
    ServiceConstructor,
    InjectableServiceConstructor,
    ServiceFactory,
    ServiceContainer
}