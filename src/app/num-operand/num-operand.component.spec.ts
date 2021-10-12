import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumOperandComponent } from './num-operand.component';

describe('NumOperandComponent', () => {
  let component: NumOperandComponent;
  let fixture: ComponentFixture<NumOperandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumOperandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumOperandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
