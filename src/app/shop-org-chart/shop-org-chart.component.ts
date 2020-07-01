import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-shop-org-chart',
  templateUrl: './shop-org-chart.component.html',
  styleUrls: ['./shop-org-chart.component.css']
})
export class ShopOrgChartComponent implements OnInit {

  constructor() { }



  data: TreeNode[];

  ngOnInit() {
      this.data = [{
          label: 'Root',
          children: [
              {
                  label: 'Child 1',
                  children: [
                      {
                          label: 'Grandchild 1.1'
                      },
                      {
                          label: 'Grandchild 1.2'
                      }
                  ]
              },
              {
                  label: 'Child 2',
                  children: [
                      {
                          label: 'Child 2.1'
                      },
                      {
                          label: 'Child 2.2'
                      }
                  ]
              }
          ]
      }];
}

}
