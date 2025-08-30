import { Component, inject } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-progress-bar',
  imports: [NgIf, AsyncPipe],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  constructor(public loader: LoadingService) {}
}
