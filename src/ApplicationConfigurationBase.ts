import {ServiceContainerBase} from './ServiceContainerBase';

interface ServiceConfiguration {
    serviceType: new (...args: unknown[]) => unknown,
    strategyType?: new (...args: unknown[]) => unknown
}

interface ApplicationConfigurationSource extends Record<string, unknown> {
    services?: ServiceConfiguration[],
    settings?: Record<string, unknown>
}

interface ApplicationConfigurationBase extends ServiceContainerBase {
    readonly instant: ApplicationConfigurationSource;
}

export { ApplicationConfigurationBase, ApplicationConfigurationSource };
