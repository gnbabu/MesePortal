import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import {
  FilterGridComponent,
  GridColumn,
} from '../../../shared/components/filter-grid/filter-grid.component';

@Component({
  selector: 'app-primary-contact-information',
  imports: [FilterGridComponent],
  templateUrl: './primary-contact-information.component.html',
  styleUrl: './primary-contact-information.component.scss',
})
export class PrimaryContactInformationComponent {
  private router = inject(Router);
  private toastService = inject(ToastService);

  columns: GridColumn[] = [
    { field: 'id', header: 'ID', type: 'number', sortable: true },
    { field: 'name', header: 'Name', type: 'text', sortable: true },
    {
      field: 'department',
      header: 'Department',
      type: 'select',
      sortable: true,
      filterOptions: [
        { label: 'HR', value: 'HR' },
        { label: 'IT', value: 'IT' },
        { label: 'Finance', value: 'Finance' },
      ],
    },
    {
      field: 'joiningDate',
      header: 'Joining Date',
      type: 'date',
      sortable: true,
    },
    {
      field: 'lastLogin',
      header: 'Last Login',
      type: 'date',
      sortable: true,
    },
    { field: 'salary', header: 'Salary', type: 'number', sortable: true },
  ];

  employees = [
    {
      id: 1,
      name: 'Alice',
      department: 'HR',
      joiningDate: '2023-01-15',
      lastLogin: '2025-09-06T10:30:00',
      salary: 50000,
    },
    {
      id: 2,
      name: 'Bob',
      department: 'IT',
      joiningDate: '2022-11-22',
      lastLogin: '2025-09-06T14:15:00',
      salary: 60000,
    },
    {
      id: 3,
      name: 'Charlie',
      department: 'Finance',
      joiningDate: '2021-06-10',
      lastLogin: '2025-09-05T09:45:00',
      salary: 55000,
    },
    {
      id: 4,
      name: 'David',
      department: 'IT',
      joiningDate: '2020-03-18',
      lastLogin: '2025-09-04T16:20:00',
      salary: 70000,
    },
    {
      id: 5,
      name: 'Eva',
      department: 'HR',
      joiningDate: '2019-12-30',
      lastLogin: '2025-09-02T11:10:00',
      salary: 48000,
    },
    {
      id: 6,
      name: 'Frank',
      department: 'Finance',
      joiningDate: '2023-02-05',
      lastLogin: '2025-09-06T12:00:00',
      salary: 52000,
    },
    {
      id: 7,
      name: 'Grace',
      department: 'IT',
      joiningDate: '2021-08-15',
      lastLogin: '2025-09-01T15:50:00',
      salary: 61000,
    },
    {
      id: 8,
      name: 'Hannah',
      department: 'HR',
      joiningDate: '2022-04-25',
      lastLogin: '2025-09-03T13:30:00',
      salary: 53000,
    },
  ];

  goToNext() {
    this.toastService.success(
      'Primary Contact Information saved successfully!'
    );
    this.router.navigateByUrl('/provider-registration/primary-service-address');
  }
  goToPrevious() {
    this.router.navigateByUrl('/provider-registration/provider-information');
  }
}
