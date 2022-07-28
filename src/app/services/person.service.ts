import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Person } from '../../models/Person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8002/api"

  public getPersonList() {
    return this.http.get<Person[]>(`${this.baseUrl}/person`)
  }

  public getPersonDetails(id: string) {
    return this.http.get<Person>(`${this.baseUrl}/person/${id}`)
  }

  public createPerson(person: Person) {
    return this.http.post<any>(`${this.baseUrl}/person`, person).pipe(tap(() => location.reload()))
  }

  public deletePerson(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/person/${id}`).pipe(tap(() => location.reload()))
  }

  public updatePerson(person: Person) {
    return this.http.patch<any>(`${this.baseUrl}/person/${person.id}`, person).pipe((tap(() => location.reload())))
  }

  public uploadProfilePhoto(id: string, photo: File) {
    const formData = new FormData();
    formData.append('picture', photo, photo.name);
    return this.http.post<any>(`${this.baseUrl}/upload-profile-picture/${id}`, formData).pipe((tap(() => location.reload())))
  }
}
