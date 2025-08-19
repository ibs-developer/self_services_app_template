import { OdooIdNameTuple, OdooFalseOr, TActivityMixin, TMailThread, TDatabaseAuditDetails } from '../global';

/**
 * Payslip structure and type information
 */
export type TPayslipStructure = {
    struct_id: OdooIdNameTuple;
    struct_type_id: OdooIdNameTuple;
    wage_type: 'monthly' | 'weekly' | 'daily' | 'hourly';
};

/**
 * Payslip employee information
 */
export type TPayslipEmployee = {
    employee_id: OdooIdNameTuple;
    department_id: OdooIdNameTuple;
    job_id: OdooIdNameTuple;
};

/**
 * Payslip period and dates
 */
export type TPayslipPeriod = {
    date_from: string; // ISO date string
    date_to: string; // ISO date string
    compute_date: string; // ISO date string
    date: OdooFalseOr<string>; // ISO date string
};

/**
 * Payslip wage calculations
 */
export type TPayslipWages = {
    sum_worked_hours: number;
    normal_wage: number;
    basic_wage: number;
    net_wage: number;
    currency_id: OdooIdNameTuple;
};

/**
 * Payslip state and processing info
 */
export type TPayslipState = {
    state: "draft" | "verify" | "done" | "cancel" | "paid";
    paid: boolean;
    credit_note: boolean;
    has_refund_slip: boolean;
    is_regular: boolean;
    edited: boolean;
    queued_for_pdf: boolean;
};

/**
 * Payslip negative reporting
 */
export type TPayslipNegativeReporting = {
    has_negative_net_to_report: boolean;
    negative_net_to_report_display: OdooFalseOr<string>;
    negative_net_to_report_message: string;
    negative_net_to_report_amount: number;
};

/**
 * Payslip line references
 */
export type TPayslipLines = {
    line_ids: number[]; // Salary computation lines
    worked_days_line_ids: number[]; // Worked days lines
    input_line_ids: number[]; // Input lines
};

/**
 * Payslip contract and run information
 */
export type TPayslipContract = {
    contract_domain_ids: number[];
    contract_id: OdooIdNameTuple;
    payslip_run_id: OdooIdNameTuple;
};

/**
 * Payslip company and location info
 */
export type TPayslipCompany = {
    company_id: OdooIdNameTuple;
    country_id: OdooIdNameTuple;
    country_code: string;
};

/**
 * Payslip attachments and documents
 */
export type TPayslipAttachments = {
    salary_attachment_ids: number[];
    salary_attachment_count: number;
};

/**
 * Payslip accounting information
 */
export type TPayslipAccounting = {
    journal_id: OdooIdNameTuple;
    move_id: OdooFalseOr<OdooIdNameTuple>;
};

/**
 * Complete payslip details from API
 * Used for both list and detail responses as they return the same structure
 */
export type THrPayslip =
    // Core system mixins
    TActivityMixin &
    TMailThread &
    TDatabaseAuditDetails &

    // Payslip specific data
    TPayslipStructure &
    TPayslipEmployee &
    TPayslipPeriod &
    TPayslipWages &
    TPayslipState &
    TPayslipNegativeReporting &
    TPayslipLines &
    TPayslipContract &
    TPayslipCompany &
    TPayslipAttachments &
    TPayslipAccounting & {

        // Core identification
        id: number;
        name: string;
        number: string; // Payslip reference number
        display_name: string;
        __last_update: string;

        // Additional fields
        email_cc: OdooFalseOr<string>;
        note: OdooFalseOr<string>;
        warning_message: OdooFalseOr<string>;
        is_superuser: boolean;
        attendance_count: number;
    };
