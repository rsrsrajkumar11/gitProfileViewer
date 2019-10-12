import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from '../loader.service'
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input()
  private show = false;
  constructor(private loader: LoaderService) {
    // this.show = this.loader.showLoader;
  }

  ngOnInit() {
  }

}
