import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Reg1099AddressComponent } from './reg-1099-address.component';

describe('Reg1099AddressComponent', () => {
  let component: Reg1099AddressComponent;
  let fixture: ComponentFixture<Reg1099AddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Reg1099AddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Reg1099AddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
