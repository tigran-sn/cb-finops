import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepotsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: RepotsComponent;
  let fixture: ComponentFixture<RepotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepotsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
