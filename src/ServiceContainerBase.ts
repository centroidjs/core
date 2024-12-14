import {SyncSeriesEventEmitter} from '@themost/events';

declare type ServiceConstructor<T> = new (...args: unknown[]) => T;
declare type AnyServiceConstructor<T> = Function & { prototype: T }
declare type InjectableServiceConstructor<T> = new (container: ServiceContainerBase, ...args: unknown[]) => T;
declare type ServiceFactory<T> = (container: ServiceContainerBase, ...args: unknown[]) => T;

declare interface ServiceEventArgs {
    target: ServiceContainerBase;
    serviceType: new (...args: unknown[]) => unknown;
    instance: unknown;
}

interface ServiceContainerBase {

    readonly serviceLoad: SyncSeriesEventEmitter<ServiceEventArgs>;
    readonly serviceUnload: SyncSeriesEventEmitter<ServiceEventArgs>;

    getService<T>(serviceConstructor?: ServiceConstructor<T> | AnyServiceConstructor<T>): T;
    hasService<T>(serviceConstructor: ServiceConstructor<T> | AnyServiceConstructor<T>): boolean;
    removeService<T>(serviceConstructor: ServiceConstructor<T> | AnyServiceConstructor<T>): boolean;
    useService<T>(serviceConstructor: ServiceConstructor<T> | AnyServiceConstructor<T>,
                  strategyConstructor?: ServiceConstructor<T> | { useFactory: ServiceFactory<T> }): this;
    registerService<T>(serviceConstructor: ServiceConstructor<T> | AnyServiceConstructor<T>,
                  strategyConstructor?: ServiceConstructor<T> | { useFactory: ServiceFactory<T> }): this;
}

export {
    ServiceContainerBase,
    ServiceConstructor,
    AnyServiceConstructor,
    InjectableServiceConstructor,
    ServiceFactory,
    ServiceEventArgs
}
