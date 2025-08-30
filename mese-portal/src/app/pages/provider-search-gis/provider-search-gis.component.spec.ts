import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSearchGisComponent } from './provider-search-gis.component';

describe('ProviderSearchGisComponent', () => {
  let component: ProviderSearchGisComponent;
  let fixture: ComponentFixture<ProviderSearchGisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderSearchGisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderSearchGisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
