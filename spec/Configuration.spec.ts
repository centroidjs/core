import {ApplicationConfiguration} from '@centroidjs/common';

describe('ApplicationConfiguration', () => {
    it('should create instance', () => {
       const configuration = new ApplicationConfiguration({
           settings: {
               locales: ['en', 'fr'],
               defaultLocale: 'en'
           }
       });
       expect(configuration).toBeTruthy();
       expect(configuration.instant.settings?.locales).toBeTruthy();
       expect(configuration.instant.settings?.defaultLocale).toEqual('en');
    });
});
