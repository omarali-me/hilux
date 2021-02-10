import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { FieldsService } from './fields.service';

@Injectable()
export class LookupsService {

  constructor(private fieldsService: FieldsService) {}

  loadCompanyTypeOptions() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companiesTypes`);
  }

  loadEmiratesOptions() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/emirates`);
  }

  loadLicenseTypeOptions() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/licensesTypes`);
  }

  loadLicenseIssuerOptions() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companiesLicensesIssuers`);
  }

  loadRegistrationTypes() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/registrationTypes`);
  }

  loadUnitsTypesOptions() {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/unitsTypes`);
  }
}
