export interface Row {
    [key: string]: string | number | boolean
}

export interface Column {
    value: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'center';
    action?: (value: Row) => void;
}

export interface LabelValue {
    label: string
    value: string | number
}

export interface Value {
    value: number
}

export interface ProfileInformation {
    user_id: number,
    name: string,
    email: string,
    contact: string,
    department: string,
    avatar_url: string,
    rating: number,
    role: string,
    status: string,
}

export interface BasicInformation {
    employee_id: number,
    hired_date: string,
    work_for: string,
    license_number: string,
    license_expiry: string,
    birth_date: string,
    address: string,
    days_of_working: string,
    work_timing: string,
    occupation_type: string,
}
