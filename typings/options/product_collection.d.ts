import { ListOptions, PublishedOptions, FieldOptions } from "./base";

export interface CollectionListOptions extends ListOptions, FieldOptions, PublishedOptions {
    ids?: string
    title?: string
    product_id?: number
    handle?: string
    since_id?: number
}
