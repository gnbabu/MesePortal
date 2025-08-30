import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicaidHomeComponent } from './medicaid-home.component';

describe('MedicaidHomeComponent', () => {
  let component: MedicaidHomeComponent;
  let fixture: ComponentFixture<MedicaidHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicaidHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicaidHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
