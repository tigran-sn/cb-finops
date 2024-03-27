import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogBasicComponent } from './confirm-dialog-basic.component';

describe('ConfirmDialogBasicComponent', () => {
  let component: ConfirmDialogBasicComponent;
  let fixture: ComponentFixture<ConfirmDialogBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
