export interface CustomerSearchOptions {
  /**
   * Text to search for in the shop's customer data.
   */
  query?: string;

  /**
   * Set the field and direction by which to order results.
   */
  order?: string;
}