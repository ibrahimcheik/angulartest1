import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import 'datatables.net';
import { Config } from 'datatables.net';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  data: any[] = [];
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };

    this.dataService.getData().subscribe((data: any[]) => {
      this.data = data;
      this.dtTrigger.next(null);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}