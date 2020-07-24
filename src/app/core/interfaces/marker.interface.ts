export interface Marker {
    lat: number;
    lng: number;
    img: string;
    name: string;
    address: string;
    label?: string;
    draggable: boolean;
}