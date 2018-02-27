import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class ElectionService {
  behaviorSource = new BehaviorSubject<number>(0);
  behaviorState = this.behaviorSource.asObservable();
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


  candidateStanding(electionId, isMasked = 0) {
    const params = new HttpParams()
      .set('is_masked', isMasked.toString());
    return this.http.get(apiUrl + `elections/${electionId}/standings`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
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

  delete(id, electionId) {
    return this.http.delete(apiUrl + `elections/${electionId}`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  voterStatus(electionId) {
    return this.http.get(apiUrl + `elections/${electionId}/voter-status`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }

  updateElection(electionId, method, value) {
    let body = {};
    if (method == 'start' || method == 'end') {
      body = {
        is_active: value
      };
    } else if (method == 'publish') {
      body = {
        is_published: value
      };
    }
    return this.http.put(apiUrl + `elections/${electionId}`, body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
    });
  }






}
