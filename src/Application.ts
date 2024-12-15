import {ApplicationBase} from './ApplicationBase';
import {ApplicationConfigurationBase} from './ApplicationConfigurationBase';
import {ServiceContainer} from './ServiceContainer';

class Application extends ServiceContainer implements ApplicationBase {
    constructor(public readonly configuration: ApplicationConfigurationBase) {
        super();
    }
}

export {
    Application
};
