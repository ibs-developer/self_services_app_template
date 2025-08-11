export type OdooListResponse<T> = {
  status: boolean;
  data: T[];
  pagination: {
    total_count: number;
    page_size: number;
    current_page: number;
    num_pages: number;
    next: string | null;
    previous: string | null;
  };
};

export type OdooShowResponse<T> = {
  status: boolean;
  data: T[];
};

export type OdooResponse<T> = OdooListResponse<T> | OdooShowResponse<T>;

export type OdooCreateUpdateResponse = {
  status: boolean;
  message?: string;
  data?: any;
};

export type updateResponse = OdooCreateUpdateResponse;
