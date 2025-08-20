import { OdooFalseOr, OdooIdNameTuple, TActivityMixin, TDatabaseAuditDetails, TMailThread } from '../global';

export type TJournalType = 'bank' | 'cash' | 'sale' | 'purchase' | 'general' | string;

export type TDefaultAccountType = 'asset_cash' | 'asset_receivable' | 'liability_payable' | 'income' | 'expense' | string;

export type TInvoiceReferenceType = 'invoice' | 'partner' | 'none' | string;

export type TInvoiceReferenceModel = 'odoo' | 'belgian' | 'european' | string;

export type TBankStatementsSource = 'undefined' | 'file_import' | 'online_sync' | string;

// Journal type for populated journal_id
export type TAccountJournal = {
    id: number;
    name: string;
    code: string;
    active: boolean;
    type: TJournalType;
    account_control_ids: number[];
    default_account_type: TDefaultAccountType;
    default_account_id: OdooIdNameTuple;
    suspense_account_id: OdooIdNameTuple;
    restrict_mode_hash_table: boolean;
    sequence: number;
    invoice_reference_type: TInvoiceReferenceType;
    invoice_reference_model: TInvoiceReferenceModel;
    currency_id: OdooFalseOr<OdooIdNameTuple>;
    company_id: OdooIdNameTuple;
    country_code: string;
    refund_sequence: boolean;
    payment_sequence: boolean;
    sequence_override_regex: OdooFalseOr<string>;
    inbound_payment_method_line_ids: number[];
    outbound_payment_method_line_ids: number[];
    profit_account_id: OdooFalseOr<OdooIdNameTuple>;
    loss_account_id: OdooFalseOr<OdooIdNameTuple>;
    company_partner_id: OdooIdNameTuple;
    bank_account_id: OdooFalseOr<OdooIdNameTuple>;
    bank_statements_source: TBankStatementsSource;
    bank_acc_number: OdooFalseOr<string>;
    bank_id: OdooFalseOr<OdooIdNameTuple>;
    sale_activity_type_id: OdooFalseOr<OdooIdNameTuple>;
    sale_activity_user_id: OdooFalseOr<OdooIdNameTuple>;
    sale_activity_note: OdooFalseOr<string>;
    alias_id: OdooFalseOr<OdooIdNameTuple>;
    alias_domain: string;
    alias_name: OdooFalseOr<string>;
    journal_group_ids: number[];
    secure_sequence_id: OdooFalseOr<OdooIdNameTuple>;
    available_payment_method_ids: number[];
    selected_payment_method_codes: string;

    // Dashboard and display fields
    kanban_dashboard: string;
    kanban_dashboard_graph: string;
    json_activity_data: string;
    show_on_dashboard: boolean;
    color: number;
    current_statement_balance: number;
    has_statement_lines: boolean;
    entries_count: number;
    has_sequence_holes: boolean;

    // EDI and integration fields
    edi_format_ids: number[];
    compatible_edi_ids: number[];
    is_check: boolean;
    is_debit: boolean;
    next_link_synchronization: OdooFalseOr<string>;
    expiring_synchronization_date: OdooFalseOr<string>;
    expiring_synchronization_due_day: number;
    account_online_account_id: OdooFalseOr<OdooIdNameTuple>;
    account_online_link_id: OdooFalseOr<OdooIdNameTuple>;
    account_online_link_state: OdooFalseOr<string>;

    // Expense specific fields
    expenses_filtration: boolean;
    for_expenses: boolean;

    // Saudi Arabia localization fields
    l10n_sa_csr: OdooFalseOr<any>;
    l10n_sa_csr_errors: OdooFalseOr<any>;
    l10n_sa_compliance_csid_json: OdooFalseOr<any>;
    l10n_sa_production_csid_json: OdooFalseOr<any>;
    l10n_sa_production_csid_validity: OdooFalseOr<string>;
    l10n_sa_compliance_checks_passed: boolean;
    l10n_sa_chain_sequence_id: OdooFalseOr<OdooIdNameTuple>;
    l10n_sa_serial_number: OdooFalseOr<string>;
    l10n_sa_latest_submission_hash: OdooFalseOr<string>;
    branch_id: OdooFalseOr<OdooIdNameTuple>;

    // Display and audit fields
    __last_update: string;
    display_name: string;
} & TActivityMixin
    & TMailThread
    & TDatabaseAuditDetails;
