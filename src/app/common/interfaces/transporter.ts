export interface Transporter {
    transporter_id?: number;
    transporter: string;
    primary_mobile: number;
    primary_contact?: string;
    primary_person?: string;
    other_contact?: string;
    address?: string;
}
