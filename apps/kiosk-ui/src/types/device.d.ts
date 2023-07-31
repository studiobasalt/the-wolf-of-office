
type Device = {
    id?: string;
    name: string;
    views?: _deviceView[];
}

type _deviceView = {
    id: string;
    timeout?: number;
}