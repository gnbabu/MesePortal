import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderDirectoryComponent } from './provider-directory.component';

describe('ProviderDirectoryComponent', () => {
  let component: ProviderDirectoryComponent;
  let fixture: ComponentFixture<ProviderDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
