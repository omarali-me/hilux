import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { FieldsService } from './fields.service';

@Injectable()
export class LookupsService {

  constructor(private fieldsService: FieldsService) {}

  loadCompanyTypeOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companiesTypes`, params);
  }

  loadEmiratesOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/emirates`, params);
  }

  loadLicenseTypeOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/licensesTypes`, params);
  }

  loadLicenseIssuerOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/companiesLicensesIssuers`, params);
  }

  loadRegistrationTypes(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/registrationTypes`, params);
  }

  loadUnitsTypesOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/unitsTypes`, params);
  }

  loadUnitsOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/units`, params);
  }

  loadServiceNamesOptions(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/ServiceCategories/listOfServices`, params);
  }

  loadProjects(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/projects`, params);
  }

  loadDevelopers(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/developers`, params);
  }

  loadLands(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/lands`, params);
  }

  loadOldLands(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/Lookups/oldLands`, params);
  }

  loadOwners(params: any = {}) {
    return this.fieldsService.getUrl(`${environment.apiHost}/AjmanLandProperty/index.php/lookups/owners`, params);
  }
}
