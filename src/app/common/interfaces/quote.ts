export interface Quote {
    quote_id?: number;
    enquiry_id: number;
    transporter_id: number;
    freight: number;
    including_fine: string;
    vehicle_avail: string;
    vehicle_type_id: number[];
    vehicle_body_id?: number[];
    user_id: number;
    comments: string;
}


