import { Enquiry } from './enquiry';

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

    /** Below are additional read_only fields
     * received using get request*/
    transporter_str?: string;
    enquiry_no?: string;
    places_source?: string[];
    places_destination?: string[];
    enquiry?: Enquiry;
    length?: number;
    width?: number;
    height?: number;
    weight?: number;
}


