import {
  OdooIdNameTuple,
  OdooFalseOr,
  TActivityMixin,
  TMailThread,
  TDatabaseAuditDetails,
} from '../global';

export type THrLoan = {
  id: number;
  name: string;
  date: string;
  employee_id: OdooIdNameTuple;
  department_id: OdooFalseOr<OdooIdNameTuple>;
  installment: number;
  payment_date: string;
  loan_line_ids: number[] | THrLoanLine[];
  company_id: OdooIdNameTuple;
  currency_id: OdooIdNameTuple;
  job_position_id: OdooFalseOr<OdooIdNameTuple>;
  loan_amount: number;
  total_amount: number;
  balance_amount: number;
  total_paid_amount: number;
  state: 'draft' | 'approve' | 'refuse' | 'cancel' | 'waiting_approval_1';
  display_name: string;
  message_main_attachment_id?: OdooFalseOr<number>;
} & TActivityMixin & TMailThread & TDatabaseAuditDetails;

export type THrLoanLine = {
  id: number;
  date: string;
  employee_id: OdooIdNameTuple;
  amount: number;
  paid: boolean;
  loan_id: OdooIdNameTuple;
  payslip_id: OdooFalseOr<OdooIdNameTuple>;
  display_name: string;
} & TDatabaseAuditDetails;

// For create/update operations - making most fields optional
export type THrLoanCreate = Partial<
  Omit<THrLoan, 'id' | 'display_name' | keyof TActivityMixin | keyof TMailThread | keyof TDatabaseAuditDetails>
> & {
  employee_id: number | OdooIdNameTuple;
  loan_amount: number;
  installment: number;
  payment_date: string;
};

export type THrLoanUpdate = Partial<THrLoanCreate>;

// Utility types for handling populated vs non-populated loan lines
export type THrLoanWithPopulatedLines = Omit<THrLoan, 'loan_line_ids'> & {
  loan_line_ids: THrLoanLine[];
};

export type THrLoanWithIds = Omit<THrLoan, 'loan_line_ids'> & {
  loan_line_ids: number[];
};

// Type guard functions
export const hasPopulatedLoanLines = (loan: THrLoan): loan is THrLoanWithPopulatedLines => {
  return loan.loan_line_ids.length > 0 && typeof loan.loan_line_ids[0] === 'object';
};

export const hasLoanLineIds = (loan: THrLoan): loan is THrLoanWithIds => {
  return loan.loan_line_ids.length > 0 && typeof loan.loan_line_ids[0] === 'number';
};