export interface ApiResponse {
    status?: Boolean;
    data?:  [{
        token?: string;
        user_id?: string;
        sub_name?: string;
        section_name?: string;
        branch_name?: string;
        year?: string;
        sub_id?: string;
        section_id?: string;
        name?: string;
        enroll_no?: string;
        mac_id?: string;
     }]; 
    message?: string;
}