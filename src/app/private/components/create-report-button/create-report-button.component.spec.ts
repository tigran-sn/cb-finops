import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportButtonComponent } from './create-report-button.component';

describe('CreateReportButtonComponent', () => {
  let component: CreateReportButtonComponent;
  let fixture: ComponentFixture<CreateReportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReportButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateReportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
