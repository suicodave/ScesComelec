import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ElectionService {
  addedElectionSource = new BehaviorSubject<number>(0);
  electionState = this.addedElectionSource.asObservable();
  constructor(private authService: AuthService, private http: HttpClient) { }

  getElections(myElection = 0, isActive = 0, isPublished = 0, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue)
      .set('is_active', isActive.toString())
      .set('my_election', myElection.toString())
      .set('is_published', isPublished.toString());
    return this.http.get(apiUrl + 'elections', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });



  }




  // tslint:disable-next-line:max-line-length
  registerElection(syId, description, depIds, enableParty = false, enableColRep = false) {
    const body = {
      'school_year_id': syId,
      'description': description,
      'department_ids': depIds,
      'is_party_enabled': enableParty,
      'is_colrep_enabled': enableColRep
    };
    return this.http.post(apiUrl + 'elections', body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
    });
  }

  deleteElection(electionId) {

    return this.http.delete(apiUrl + `elections/${electionId}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
    });
  }






}
