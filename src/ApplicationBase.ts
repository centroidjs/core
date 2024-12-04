import {ApplicationConfigurationBase} from './ApplicationConfigurationBase';
import {ServiceContainerBase} from './ServiceContainerBase';

interface ApplicationBase extends ServiceContainerBase {
    readonly configuration: ApplicationConfigurationBase;
}

export {
    ApplicationBase
}
