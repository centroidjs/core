import {ServiceContainerBase} from './ServiceContainerBase';

interface ServiceConfiguration {
    serviceType: new (...args: unknown[]) => unknown,
    strategyType?: new (...args: unknown[]) => unknown
}

interface ApplicationConfigurationSource {
    [key: string]: unknown,
    services?: ServiceConfiguration[],
    settings?: unknown
}

interface ApplicationConfigurationBase extends ServiceContainerBase{
    readonly instant: ApplicationConfigurationSource;
}

export { ApplicationConfigurationBase, ApplicationConfigurationSource };
