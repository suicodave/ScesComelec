import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  elections = [
    {
      sy: '2010',
      department: 'Senior High',
      user: 'dada',
      // tslint:disable-next-line:max-line-length
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur incidunt doloremque animi sapiente ex illo laborum sequi enim hic vitae alias repudiandae molestiae eveniet iste illum, soluta id mollitia tempora?'
    },
    {
      sy: '2010',
      department: 'Senior High',
      user: 'dada',
      description: 'asd'
    },
    {
      sy: '2010',
      department: 'Senior High',
      user: 'dada',
      description: 'asd'
    },
    {
      sy: '2010',
      department: 'Senior High',
      user: 'dada',
      description: 'asd'
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
