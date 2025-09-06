import { Component, OnInit, inject } from '@angular/core';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { GridColumn } from '../../../core/models/core.models';
import { AppDropdownComponent } from '../../../shared/components/app-dropdown/app-dropdown.component';
import { FormsModule } from '@angular/forms';
import { AppDatepickerComponent } from '../../../shared/components/app-datepicker/app-datepicker.component';

@Component({
  selector: 'app-provider-information',
  standalone: true,
  imports: [
    FormsModule,
    DataGridComponent,
    AppDropdownComponent,
    AppDatepickerComponent,
  ],
  templateUrl: './provider-information.component.html',
  styleUrl: './provider-information.component.scss',
})
export class ProviderInformationComponent implements OnInit {
  private router = inject(Router);
  private toastService = inject(ToastService);

  attachmentColumns: GridColumn[] = [];
  attachments: any[] = [];
  providerTypes: any[] = [];
  regions: any[] = [];
  selectedProviderType: any = null;
  selectedRegion: any = null;
  dob: string | null = null;

  ngOnInit(): void {
    this.providerTypes = [
      { id: 1, name: 'Hospital' },
      { id: 2, name: 'Clinic' },
      { id: 3, name: 'Pharmacy' },
    ];

    this.regions = [
      { id: 1, name: 'North' },
      { id: 2, name: 'South' },
      { id: 3, name: 'East' },
      { id: 4, name: 'West' },
    ];
    this.attachmentColumns = [
      { field: 'fileName', header: 'File Name', sortable: true, type: 'text' },
      { field: 'fileType', header: 'Type', sortable: true, type: 'text' },
      {
        field: 'uploadedBy',
        header: 'Uploaded By',
        sortable: true,
        type: 'text',
      },
      {
        field: 'uploadedOn',
        header: 'Uploaded On',
        sortable: true,
        type: 'date',
      },
    ];

    this.attachments = [
      {
        fileName: 'Provider_Agreement.pdf',
        fileType: 'PDF',
        uploadedBy: 'Admin',
        uploadedOn: '2025-09-03',
      },
      {
        fileName: 'License_Certificate.png',
        fileType: 'Image',
        uploadedBy: 'Reviewer A',
        uploadedOn: '2025-09-01',
      },
      {
        fileName: 'Insurance_Policy.pdf',
        fileType: 'PDF',
        uploadedBy: 'Reviewer B',
        uploadedOn: '2025-08-25',
      },
      {
        fileName: 'Background_Check.docx',
        fileType: 'Word Document',
        uploadedBy: 'Admin',
        uploadedOn: '2025-08-20',
      },
      {
        fileName: 'Tax_Form_1099.pdf',
        fileType: 'PDF',
        uploadedBy: 'Reviewer A',
        uploadedOn: '2025-08-15',
      },
      {
        fileName: 'Business_Permit.jpg',
        fileType: 'Image',
        uploadedBy: 'Reviewer B',
        uploadedOn: '2025-08-10',
      },
      {
        fileName: 'Training_Certificate.pdf',
        fileType: 'PDF',
        uploadedBy: 'Admin',
        uploadedOn: '2025-08-05',
      },
    ];
  }

  onProviderTypeChange(event: any) {
    console.log('Selected Provider Type:', event);
  }

  onRegionChange(event: any) {
    console.log('Selected Region:', event);
  }

  onDateChanged(date: string) {
    console.log('Date changed (event):', date);
  }

  goToNext() {
    this.toastService.success('Provider Information saved successfully!');
    this.router.navigateByUrl(
      '/provider-registration/primary-contact-information'
    );
  }
}
