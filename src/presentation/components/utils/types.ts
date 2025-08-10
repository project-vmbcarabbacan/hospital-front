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