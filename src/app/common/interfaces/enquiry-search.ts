export interface EnquiriesSearch {
    from_date?: Date;
    to_date?: Date;
    source_lat?: number;
    source_lng?: number;
    source_rad?: number;
    dest_lat?: number;
    dest_lng?: number;
    dest_rad?: number;
    vehicle_type?: number[];
    status?: string;
}
