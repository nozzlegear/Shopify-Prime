export interface AppliedDiscount {
    /**
     * Title of the discount.
     */
    title: string;

    /**
     * Reason for the discount.
     */
    description: string;

    /**
     * he value of the discount. If the type of the discount is fixed_amount, then this is a fixed dollar amount. If the type is percentage, then this is the percentage.
     */
    value: string;

    /**
     * The type of discount. Known values are "percentage" and "fixed_amount".
     */
    value_type: "percentage" | "fixed_amount";

    /**
     * The applied amount of the discount, based on the setting of value_type.
     * When ValueType is set to fixed_amount discount amount = quantity * value
     * When ValueType is set to percentage discount amount = floor(price * quantity * value) / 100
     */
    amount?: number;
}
