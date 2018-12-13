export interface Enquiry {
    status?: string;
    loadType: string;
    vehicleType: string;
    vehicleBody: string;
    enquiryId: string;
    length: number;
    width: number;
    height: number;
    weight: number;
    source: string;
    destination: string;
    return?: string;
    specialReq?: string;
    loadingDate: number;
}


