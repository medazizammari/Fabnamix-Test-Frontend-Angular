import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Person } from 'src/models/Person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  firstName = new FormControl("", Validators.required);
  lastname = new FormControl("", Validators.required);
  dateOfBirth = new FormControl("", Validators.required);
  address = new FormControl("", Validators.required);

  constructor(private PersonService: PersonService) { }

  ngOnInit(): void {
  }

  onFormSubmit() {
    if (this.firstName.value && this.lastname.value && this.dateOfBirth.value && this.address.value) {
      const person: Person = {
        id: -1,
        firstname: this.firstName.value,
        lastname: this.lastname.value,
        date_of_birth: this.dateOfBirth.value,
        address: this.address.value,
        age: 0,
        photo_id: ''
      }
      this.PersonService.createPerson(person).subscribe();
    }
  }

}
