import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class RepotsComponent {
  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  create() {
    this.router.navigate(['create'], {
      relativeTo: this.activatedRoute,
    });
  }
}
