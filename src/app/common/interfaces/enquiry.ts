export interface Enquiry {
    status?: string;
    load_type: string;
    vehicle_type: number[];
    vehicle_body: number[];
    enquiry_no: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    source: string;
    destination: string;
    return?: string;
    comments?: string;
    loading_date: Date;
    extraExpenses: number[];
}


