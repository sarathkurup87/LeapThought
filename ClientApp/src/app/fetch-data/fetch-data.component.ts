import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITreeOptions } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public label: any;
  public _LabelTree: any [] = [];

  @ViewChild('tree') 
  private tree: any;
  options: ITreeOptions = { }
  
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Label[]>(baseUrl + 'test/getData').subscribe(result => {
      this.label = result;
      result.forEach(e => { debugger;
        this._LabelTree.push({saveName: e.saveName, json: JSON.parse(e.json)});
      });
    }, error => console.error(error));
  }

  ngAfterViewInit() {
    this.tree.treeModel.expandAll();
  }

}

interface Label {
  saveName: string;
  json: string;
}
