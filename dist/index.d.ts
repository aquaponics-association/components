declare global {
    interface Window {
        AAOrganizationsList: typeof AAOrganizationsList;
    }
}
export interface AAImageFormat {
    name: string;
    url: string;
    width: number;
    height: number;
}
export interface AAImage {
    id: number;
    name: string;
    caption?: string;
    formats: {
        thumbnail: AAImageFormat;
        small: AAImageFormat;
    };
}
export interface AATag {
    id: number;
    name: string;
    description?: string;
    uid: string;
}
export interface AAOrganization {
    id: number;
    name: string;
    email?: string;
    website?: string;
    description?: string;
    logo?: AAImage;
    tags?: AATag[];
}
export default class AAOrganizationsList {
    constructor(selector: string);
    getData(params: {
        tags?: string;
    }): Promise<any>;
    process(el: Element): Promise<void>;
}
