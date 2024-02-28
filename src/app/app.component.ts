import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef,GridApi,GridReadyEvent } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AgGridAngular,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  userList: any[] = [];
  private gridApi!: GridApi;


  colDefs: ColDef[] = [
    { field: "name",headerName:'Name' },
    { field: "username", headerName:"User Name" ,filter:'agSetColumnFilter'},
    { field: "phone" , headerName:"PH Number"},
    { field: "website" , headerName:"Website Link"}
  ];
  public defaultColDef: ColDef = {
    editable: true,
    minWidth: 100,
    flex: 1,
  };
  

  constructor(private http: HttpClient) {

  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    debugger;
    
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((res: any) => {
      this.userList = res;
      console.log(this.userList);
    })
  }
}
