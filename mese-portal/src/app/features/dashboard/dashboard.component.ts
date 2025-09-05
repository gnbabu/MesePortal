import {
  Component,
  inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { GridColumn } from '../../core/models/core.models';
import { DataGridComponent } from '../../shared/components/data-grid/data-grid.component';
import { Router } from '@angular/router';
import { HasPermissionDirective } from '../../shared/directives/app-permission/has-permission.directive';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DataGridComponent, HasPermissionDirective, DateFormatPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  @ViewChild('dateTemplate', { static: true })
  dateTemplate!: TemplateRef<any>;

  columns: GridColumn[] = [];

  private router = inject(Router);

  ngOnInit(): void {
    this.columns = [
      { field: 'regId', header: 'Reg ID', sortable: true },
      { field: 'provider', header: 'Provider', sortable: true },
      { field: 'status', header: 'Status', sortable: true },
      { field: 'providerType', header: 'Provider Type' },
      { field: 'npi', header: 'NPI' },
      { field: 'medicaidId', header: 'Medicaid ID' },
      { field: 'specialty', header: 'Specialty' },
      { field: 'location', header: 'Location' },
      {
        field: 'effectiveDate',
        header: 'Effective Date',
        sortable: true,
        cellTemplate: this.dateTemplate,
      },
      {
        field: 'submitDate',
        header: 'Submit Date',
        sortable: true,
        cellTemplate: this.dateTemplate,
      },
      { field: 'revalidationDueDate', header: 'Revalidation Due Date' },
    ];
  }
  providers = [
    {
      regId: '562480',
      provider: 'LAHRENN THIBODEAU',
      status: 'Complete',
      providerType: '96 - Behavioral Health Para-Professionals',
      npi: '1942925011',
      medicaidId: '0006734',
      specialty: 'QUALIFIED MH SPECIALIST',
      location: '',
      effectiveDate: '2022-10-03',
      submitDate: '2023-08-14',
      revalidationDueDate: '2027-10-03',
    },
    {
      regId: '562481',
      provider: 'JAMES ANDERSON',
      status: 'In Progress',
      providerType: '10 - Physicians',
      npi: '1938475612',
      medicaidId: '0006735',
      specialty: 'INTERNAL MEDICINE',
      location: 'New York',
      effectiveDate: '2023-01-15',
      submitDate: '2023-07-20',
      revalidationDueDate: '2028-01-15',
    },
    {
      regId: '562482',
      provider: 'MARIA GONZALEZ',
      status: 'Pending',
      providerType: '20 - Nurses',
      npi: '1883749201',
      medicaidId: '0006736',
      specialty: 'REGISTERED NURSE',
      location: 'Texas',
      effectiveDate: '2023-05-10',
      submitDate: '2023-08-01',
      revalidationDueDate: '2028-05-10',
    },
    {
      regId: '562483',
      provider: 'DAVID SMITH',
      status: 'Complete',
      providerType: '40 - Dentists',
      npi: '1902837465',
      medicaidId: '0006737',
      specialty: 'GENERAL DENTISTRY',
      location: 'California',
      effectiveDate: '2021-11-05',
      submitDate: '2022-12-10',
      revalidationDueDate: '2026-11-05',
    },
    {
      regId: '562484',
      provider: 'LINDA JOHNSON',
      status: 'Complete',
      providerType: '30 - Pharmacists',
      npi: '1729384756',
      medicaidId: '0006738',
      specialty: 'PHARMACY',
      location: 'Florida',
      effectiveDate: '2022-03-18',
      submitDate: '2022-09-25',
      revalidationDueDate: '2027-03-18',
    },
    {
      regId: '562485',
      provider: 'ROBERT BROWN',
      status: 'In Progress',
      providerType: '96 - Behavioral Health Para-Professionals',
      npi: '1872639450',
      medicaidId: '0006739',
      specialty: 'COUNSELOR',
      location: 'Ohio',
      effectiveDate: '2023-06-21',
      submitDate: '2023-08-22',
      revalidationDueDate: '2028-06-21',
    },
    {
      regId: '562486',
      provider: 'EMILY DAVIS',
      status: 'Pending',
      providerType: '50 - Therapists',
      npi: '1658293740',
      medicaidId: '0006740',
      specialty: 'PHYSICAL THERAPIST',
      location: 'Washington',
      effectiveDate: '2023-02-09',
      submitDate: '2023-06-12',
      revalidationDueDate: '2028-02-09',
    },
    {
      regId: '562487',
      provider: 'MICHAEL CLARK',
      status: 'Complete',
      providerType: '60 - Optometrists',
      npi: '1549382716',
      medicaidId: '0006741',
      specialty: 'VISION CARE',
      location: 'Illinois',
      effectiveDate: '2021-07-12',
      submitDate: '2022-01-19',
      revalidationDueDate: '2026-07-12',
    },
    {
      regId: '562488',
      provider: 'SOPHIA MARTINEZ',
      status: 'Complete',
      providerType: '70 - Midwives',
      npi: '1637482910',
      medicaidId: '0006742',
      specialty: 'CERTIFIED NURSE MIDWIFE',
      location: 'Georgia',
      effectiveDate: '2022-08-25',
      submitDate: '2023-01-15',
      revalidationDueDate: '2027-08-25',
    },
    {
      regId: '562489',
      provider: 'WILLIAM TAYLOR',
      status: 'In Progress',
      providerType: '80 - Chiropractors',
      npi: '1928374650',
      medicaidId: '0006743',
      specialty: 'CHIROPRACTIC CARE',
      location: 'Arizona',
      effectiveDate: '2023-04-30',
      submitDate: '2023-08-10',
      revalidationDueDate: '2028-04-30',
    },
  ];

  goToRegistration() {
    this.router.navigateByUrl('/provider-registration');
  }
}
