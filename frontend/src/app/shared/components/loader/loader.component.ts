import { Component } from '@angular/core';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
  standalone: false,
})
export class LoaderComponent {
  loading$ = this.loadingService.loading$();

  constructor(private loadingService: LoadingService) {}
}
