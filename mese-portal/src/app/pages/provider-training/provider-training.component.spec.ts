import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderTrainingComponent } from './provider-training.component';

describe('ProviderTrainingComponent', () => {
  let component: ProviderTrainingComponent;
  let fixture: ComponentFixture<ProviderTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
