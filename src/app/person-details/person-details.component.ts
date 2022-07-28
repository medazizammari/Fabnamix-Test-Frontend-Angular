import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, first, last, switchMap, tap } from 'rxjs';
import { Person } from 'src/models/Person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss']
})
export class PersonDetailsComponent implements OnInit {

  constructor(private PersonService: PersonService, private route: ActivatedRoute) { }

  firstName = new FormControl("", Validators.required);
  lastname = new FormControl("", Validators.required);
  dateOfBirth = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);
  file: File | null = null;

  readonly personDetails$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      if (id)
        return this.PersonService.getPersonDetails(id).pipe(tap((person) => {
          this.firstName.setValue(person.firstname)
          this.lastname.setValue(person.lastname)
          this.dateOfBirth.setValue(person.date_of_birth)
          this.address.setValue(person.address)
        }))
      else return EMPTY;
    }
  ))

  ngOnInit(): void {

  }

  savePerson() {
    console.log(this.firstName.value);
    console.log(this.lastname.value);
    console.log(this.dateOfBirth.value);
    console.log(this.address.value);
    if (this.firstName.value && this.lastname.value && this.dateOfBirth.value && this.address.value) {
      this.route.paramMap.pipe(
        first(),
        switchMap((params) => {
          const person: Person = {
            id: parseInt(params.get("id") as string),
            firstname: this.firstName.value as string,
            lastname: this.lastname.value as string,
            address: this.address.value as string,
            date_of_birth: this.dateOfBirth.value as string,
            age: 0,
            photo_id: ''
          }
          return this.PersonService.updatePerson(person);
        }
      )).subscribe();
    }
  }

  uploadPhoto(event: Event) {
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      this.route.paramMap.pipe(
        first(),
        switchMap((params) => {
          return this.PersonService.uploadProfilePhoto(params.get("id") as string, file);
        })
      ).subscribe();
    }
  }

}
