export type WebhookTopic = (
    "orders/create" |
    "orders/delete" |
    "orders/updated" |
    "orders/paid" |
    "orders/cancelled" |
    "orders/fulfilled" |
    "orders/partially_fulfilled" |
    "order_transations/create" |
    "carts/create" |
    "carts/update" |
    "checkouts/create" |
    "checkouts/update" |
    "checkouts/delete" |
    "refunds/create" |
    "products/create" |
    "products/update" |
    "products/delete" |
    "collections/create" |
    "collections/update" |
    "collections/delete" |
    "customer_groups/create" |
    "customer_groups/update" |
    "customer_groups/delete" |
    "customers/create" |
    "customers/enable" |
    "customers/disable" |
    "customers/update" |
    "customers/delete" |
    "fulfillments/create" |
    "fulfillments/update" |
    "shop/update" |
    "disputes/create" |
    "disputes/update" |
    "app/uninstalled" |
    "themes/publish" |
    string
)