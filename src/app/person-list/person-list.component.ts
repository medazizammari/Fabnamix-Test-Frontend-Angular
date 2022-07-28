import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {

  constructor(private PersonService: PersonService) { }

  readonly personList$ = this.PersonService.getPersonList();

  ngOnInit(): void {
  }

  deletePerson(id: number) {
    this.PersonService.deletePerson(id).subscribe();
  }

}
