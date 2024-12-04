import {ApplicationConfiguration} from '@centroidjs/common';

interface LocaleConfigurationSettings {
    locales: string[],
    defaultLocale: string
}

describe('ApplicationConfiguration', () => {
    it('should create instance', () => {
       const configuration = new ApplicationConfiguration({
           settings: {
               locales: ['en', 'fr'],
               defaultLocale: 'en'
           }
       });
       expect(configuration).toBeTruthy();
       const applicationLocale = configuration.instant.settings as LocaleConfigurationSettings;
       expect(applicationLocale?.locales).toBeTruthy();
       expect(applicationLocale?.defaultLocale).toEqual('en');
    });
});
