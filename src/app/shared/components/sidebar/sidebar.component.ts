import { Component, OnInit } from '@angular/core';
import { User } from '../../../_models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {

  currentUser: User;
  constructor() { }

  ngOnInit(): void { }

}
