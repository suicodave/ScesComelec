import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class CandidateService {

  candidateBehaviorSource = new BehaviorSubject<number>(0);
  candidateState = this.candidateBehaviorSource.asObservable();
  constructor(private authService: AuthService, private http: HttpClient) { }

  registerCandidate(electionId, file, studentId, positonId, aboutMe, partylistId = 0) {
    const customHeader = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Bearer ${this.authService.checkToken()}`
    });
    const form = new FormData();

    form.append('student_id', studentId);
    form.append('election_id', electionId);
    form.append('position_id', positonId);
    form.append('partylist_id', partylistId.toString());
    form.append('about_me', aboutMe);
    form.append('profile_image', file);

    return this.http.post(apiUrl + `elections/${electionId}/candidates`, form, {
      headers: customHeader
    });
  }

  getCandidates(electionId, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue);
    return this.http.get(apiUrl + `elections/${electionId}/candidates`, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }

  findStudents(query = ' ') {
    const params = new HttpParams()
      .set('search', query);
    return this.http.get(apiUrl + 'students', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }


}
