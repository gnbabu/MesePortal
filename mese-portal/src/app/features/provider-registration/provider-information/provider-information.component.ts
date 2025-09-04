import { Component, inject } from '@angular/core';
import { DataGridComponent } from '../../../shared/components/data-grid/data-grid.component';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-provider-information',
  imports: [DataGridComponent],
  templateUrl: './provider-information.component.html',
  styleUrl: './provider-information.component.scss',
})
export class ProviderInformationComponent {
  private router = inject(Router);
  private toastService = inject(ToastService);
  attachmentColumns = [
    { field: 'fileName', header: 'File Name', sortable: true },
    { field: 'fileType', header: 'Type', sortable: true },
    { field: 'uploadedBy', header: 'Uploaded By', sortable: true },
    { field: 'uploadedOn', header: 'Uploaded On', sortable: true },
  ];

  attachments = [
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

  goToNext() {
    this.toastService.success('Provider Information saved successfully!');
    this.router.navigateByUrl(
      '/provider-registration/primary-contact-information'
    );
  }
}
