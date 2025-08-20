import { Odoo_Domain, admin_email, admin_password, db_name } from '@env';

export const odoo = Odoo_Domain;
export const db = db_name;
export const email = admin_email;
export const password = admin_password;

const ENDPOINTS = {
  login: '/api/v1/auth/token',
  logout: '/api/v1/auth/token',
  register: '/api/v1/register/create',
  hr: {
    leave: {
      list: '/api/v1/resources/hr.leave',
      show: (id: string) => `/api/v1/resources/hr.leave/${id}`,
      create: '/api/v1/resources/hr.leave',
      types: {
        list: '/api/v1/resources/hr.leave.type',
      },
      update: (id: string) => `/api/v1/resources/hr.leave/${id}`,
      delete: (id: string) => `/api/v1/resources/hr.leave/${id}`,
    },
    attendance: {
      list: '/api/v1/resources/hr.attendance',
      show: (id: string) => `/api/v1/resources/hr.attendance/${id}`,
      create: '/api/v1/resources/hr.attendance',
      update: (id: string) => `/api/v1/resources/hr.attendance/${id}`,
    },
    loan: {
      list: '/api/v1/resources/hr.loan',
      show: (id: string) => `/api/v1/resources/hr.loan/${id}`,
      create: '/api/v1/resources/hr.loan',
      update: (id: string) => `/api/v1/resources/hr.loan/${id}`,
      delete: (id: string) => `/api/v1/resources/hr.loan/${id}`,
    },
    payslip: {
      list: '/api/v1/resources/hr.payslip',
      show: (id: string) => `/api/v1/resources/hr.payslip/${id}`
      // create: '/api/v1/resources/hr.payslip',
      // update: (id: string) => `/api/v1/resources/hr.payslip/${id}`,
      // delete: (id: string) => `/api/v1/resources/hr.payslip/${id}`,
    }
  },
  expense: {
    list: '/api/v1/resources/expense.expense',
    show: (id: string) => `/api/v1/resources/expense.expense/${id}`,
    create: '/api/v1/resources/expense.expense',
    update: (id: string) => `/api/v1/resources/expense.expense/${id}`,
    delete: (id: string) => `/api/v1/resources/expense.expense/${id}`,
  },
  crm: {
    lead: {
      list: '/api/v1/resources/crm.lead',
      show: (id: string) => `/api/v1/resources/crm.lead/${id}`,
      create: '/api/v1/resources/crm.lead',
      update: (id: string) => `/api/v1/resources/crm.lead/${id}`,
      delete: (id: string) => `/api/v1/resources/crm.lead/${id}`,
      visit: {
        list: '/api/v1/resources/crm.lead.visit',
        show: (id: string) => `/api/v1/resources/crm.lead.visit/${id}`,
        create: '/api/v1/resources/crm.lead.visit',
        update: (id: string) => `/api/v1/resources/crm.lead.visit/${id}`,
      },
    },

  },
  ir: {
    attachment: {
      list: '/api/v1/resources/ir.attachment',
      show: (id: string) => `/api/v1/resources/ir.attachment/${id}`,
      create: '/api/v1/resources/ir.attachment',
    },
  },
  hr_employee: {
    login: '/api/v1/employee/login',
    forgetPassword: '/api/v1/employee/request-reset',
    resetPassword: '/api/v1/employee/reset-password',
    list: '/api/v1/resources/hr.employee',
    details: (id: string) => `/api/v1/resources/hr.employee/${id}`,
    create: '/api/v1/resources/hr.employee',
    update: (id: string) => `/api/v1/resources/hr.employee/${id}`,
  },
};

export default ENDPOINTS;
