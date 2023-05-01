import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledReportsComponent } from './filled-reports.component';

describe('FilledReportsComponent', () => {
  let component: FilledReportsComponent;
  let fixture: ComponentFixture<FilledReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilledReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilledReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
