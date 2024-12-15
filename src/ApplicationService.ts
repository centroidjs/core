import {ApplicationBase} from './ApplicationBase';
import {configurable, enumerable} from './Decorators';

abstract class ApplicationService {
    private readonly _application: ApplicationBase;
    constructor(application: ApplicationBase) {
        this._application = application;
    }
    @enumerable(false)
    @configurable(false)
    public get application(): ApplicationBase {
        return this._application;
    }
}

export {
    ApplicationService
}
