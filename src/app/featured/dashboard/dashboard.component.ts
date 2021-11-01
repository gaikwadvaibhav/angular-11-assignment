import { Component, OnInit } from '@angular/core';
import { HttpService } from './../../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  companiesUrl = `https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies`
  companies: any;
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.httpService.get(this.companiesUrl).subscribe((response: any) => {
      console.log('response', response)
      this.companies = response;

    })
  }

}
