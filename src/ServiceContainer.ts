import {SyncSeriesEventEmitter} from '@themost/events';
import {ServiceContainerBase, ServiceConstructor, ServiceFactory, ServiceEventArgs} from './ServiceContainerBase';

/**
 * A container for managing application services.
 * 
 * @class ServiceContainer
 * @template T - The type of the service.
 */
class ServiceContainer implements ServiceContainerBase {

    protected readonly services = new Map<string, unknown>;

    public readonly serviceLoad = new SyncSeriesEventEmitter<ServiceEventArgs>();
    public readonly serviceUnload = new SyncSeriesEventEmitter<ServiceEventArgs>();

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
        const removed = this.services.delete(serviceConstructor.name);
        this.serviceUnload.emit({ target: this, serviceType: serviceConstructor, instance: null });
        return removed;
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
            this.serviceLoad.emit({ target: this, serviceType: serviceConstructor, instance: strategy });
            return this;
        }
        if (typeof strategyConstructor === 'object' && typeof strategyConstructor.useFactory === 'function') {
            const factory = strategyConstructor.useFactory(this);
            this.services.set(serviceConstructor.name, factory);
            this.serviceLoad.emit({ target: this, serviceType: serviceConstructor, instance: factory });
            return this;
        }
        const service = new serviceConstructor(this);
        this.services.set(serviceConstructor.name, service);
        this.serviceLoad.emit({ target: this, serviceType: serviceConstructor, instance: service });
        return this;
    }

    registerService<T>(serviceConstructor: ServiceConstructor<T>, strategyConstructor?: ServiceConstructor<T> | { useFactory: ServiceFactory<T>; }): this {
        return this.useService(serviceConstructor, strategyConstructor);
    }

}

export {
    ServiceContainer
}
