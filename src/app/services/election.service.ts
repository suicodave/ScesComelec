import { Injectable } from '@angular/core';
import { apiHeaders, apiUrl } from '../interfaces/global';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable()
export class ElectionService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getElections(my_election = 0, is_active = 0, is_published = 0, items = 15, orderBy = 'id', orderValue = 'desc') {
    const params = new HttpParams()
      .set('items', items.toString())
      .set('orderBy', orderBy)
      .set('orderValue', orderValue)
      .set('is_active', is_active.toString())
      .set('my_election', my_election.toString())
      .set('is_published', is_published.toString());
    return this.http.get(apiUrl + 'elections', {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`),
      params: params
    });
  }






  // tslint:disable-next-line:max-line-length
  registerElection(firstname: string, middlename: string, lastname: string, email: string, birthdate: string, home_address: string, gender: string, father_name: string, mother_name: string, department: number, college: number, year_level: number, school_year: number) {

    const body = {
      first_name: firstname,
      middle_name: middlename,
      last_name: lastname,
      email: email,
      birthdate: birthdate,
      home_address: home_address,
      gender: gender,
      father_name: father_name,
      mother_name: mother_name,
      department_id: department,
      college_id: college,
      year_level_id: year_level,
      school_year_id: school_year
    };
    return this.http.post(apiUrl + `elections`, body, {
      headers: apiHeaders.append('Authorization', `Bearer ${this.authService.checkToken()}`)
    });
  }






}
