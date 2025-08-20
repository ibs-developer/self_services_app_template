import { TAccountJournal } from '../account';
import { OdooFalseOr, OdooIdNameTuple, TActivityMixin, TDatabaseAuditDetails, TMailThread } from '../global';

export type THrExpenseState = 'draft' | 'approved' | 'confirm' | string;


// Individual expense line item
export type THrExpenseLine = {
    id: number;

    // Invoice reference
    invoice_id: OdooIdNameTuple;

    // Product and description
    product_ids: OdooFalseOr<any>;
    name: string;

    // Account information
    account_id: OdooIdNameTuple;
    analytic_account_id: OdooFalseOr<OdooIdNameTuple>;

    // Quantities and amounts
    quantity: number;
    price_unit: number;
    tax_ids: number[];
    price_subtotal: number;

    // Display and audit fields
    __last_update: string;
    display_name: string;
} & TDatabaseAuditDetails;

// Main expense report/sheet
export type THrExpense = {
    id: number;

    // Header information
    seq: string; // e.g., "Exp001"
    name: string; // ref
    employee_id: OdooIdNameTuple;
    expense_date: string;

    journal_entry_id: OdooFalseOr<OdooIdNameTuple>;
    journal_id: OdooIdNameTuple | TAccountJournal;

    // Expense lines
    expense_line_ids: number[];
    expenses_ids: number[] | THrExpenseLine[]; // Alternative field name

    // Totals
    total: number;
    tax: number;
    amount_taxed: number;
    untaxed_amount?: number;

    // State and workflow
    state: THrExpenseState;

    // Display fields
    __last_update: string;
    display_name: string;
} & TActivityMixin
    & TMailThread
    & TDatabaseAuditDetails;