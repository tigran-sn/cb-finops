import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentReportsComponent } from './sent-reports.component';

describe('SentReportsComponent', () => {
  let component: SentReportsComponent;
  let fixture: ComponentFixture<SentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
