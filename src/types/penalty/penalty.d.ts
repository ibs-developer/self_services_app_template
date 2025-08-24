import { OdooFalseOr, OdooIdNameTuple, TActivityMixin, TDatabaseAuditDetails, TMailThread } from '../global';

export type TPenalty = {
    id: number;
    state: string;
    name: OdooFalseOr<string>;
    date: string;
    employee_id: OdooIdNameTuple;
    payslip_id: OdooFalseOr<OdooIdNameTuple>;
    penality_group: OdooIdNameTuple;
    sub_penality: OdooFalseOr<OdooIdNameTuple>;
    computation: OdooFalseOr<string>;
    days: number;
    type: string;
    reason: OdooFalseOr<string>;
    company_id: OdooIdNameTuple;
    department_id: OdooIdNameTuple;
    division: OdooFalseOr<string>;
    job_id: OdooIdNameTuple;
    parent_id: OdooIdNameTuple;
    emp_code: OdooFalseOr<string>;
    withholding_type: OdooFalseOr<string>;
    value: number;
    days_value: number;
    display_name: string;
} & TActivityMixin & TMailThread & TDatabaseAuditDetails;
