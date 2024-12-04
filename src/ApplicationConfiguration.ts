import {ServiceContainer} from './ServiceContainer';
import {ApplicationConfigurationBase, ApplicationConfigurationSource} from './ApplicationConfigurationBase';

class ApplicationConfiguration extends ServiceContainer implements ApplicationConfigurationBase {

    constructor(protected readonly source: ApplicationConfigurationSource) {
        super();
    }

    public get instant() {
        return this.source;
    }

}

export {
    ApplicationConfiguration
};
