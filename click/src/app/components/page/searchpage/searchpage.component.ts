import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceData, ServiceQueryData } from 'src/app/data/dataType';
import { FetchService} from 'src/app/services/fetch.service'

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.scss']
})
export class SearchpageComponent implements OnInit {
service!: ServiceData[];
public search!: string;
constructor(
    private route: ActivatedRoute,
    private fetch: FetchService,
    private router:Router
          ) { }

  ngOnInit() {
        const routeParams = this.route.snapshot.paramMap;
        const searchFor = routeParams.get('inputSearch');
        if(searchFor != undefined && searchFor != ""){
          this.search = searchFor;
          console.log(searchFor.split(" "));
          this.fetch.queryService(new ServiceQueryData(searchFor.split(" "),null,null,null,'30'))?.subscribe(
            data=>{
              this.service = data;
             
            }
          );
        }else{
          this.router.navigate(['homepage']);
        }
        
  }

}

