import { Component, OnInit } from '@angular/core';
import { TabService } from 'src/app/_services/tab.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  tabs: any;
  errorMessage = '';

  constructor(private tabService: TabService) { }

  ngOnInit() {
    this.tabService.getTab()
    .subscribe(
      res => {
        console.log('restab', res);
        this.tabService = res;
      }, error => {
        console.log('errtab', error);
        // this.errorMessage = error.error.message;
        this.errorMessage = error;
      });
  }

}
