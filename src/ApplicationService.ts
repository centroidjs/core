import {ApplicationBase} from './ApplicationBase';
import {enumerable} from './Decorators';

abstract class ApplicationService {
    private readonly _application: ApplicationBase;
    protected constructor(application: ApplicationBase) {
        this._application = application;
    }
    @enumerable(false)
    public get application(): ApplicationBase {
        return this._application;
    }
}

export {
    ApplicationService
}
