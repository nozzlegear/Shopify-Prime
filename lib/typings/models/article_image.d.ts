export interface ArticleImage {
    /**
     * A base64 image string only used when creating an image. It will be converted to the src property.
     */
    attachment?: string;

    /**
     * The date and time the image was created.
     */
    created_at?: string;

    /**
     * The image's src URL.
     */
    src?: string;
}