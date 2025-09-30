/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product with details including name, description, price, category, size, and image.
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name.
 *               description:
 *                 type: string
 *                 description: Product description.
 *               price:
 *                 type: number
 *                 description: Product price.
 *               category:
 *                 type: string
 *                 description: Product category.
 *               size:
 *                 type: string
 *                 description: Product size.
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product.
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "images/3ccfba3c-f651-4238-8326-9583b4c82d14.webp"
 *                     fileName:
 *                       type: string
 *                       example: "DALLA high-quality image of a fresh bunch .webp"
 *                     url:
 *                       type: string
 *                       example: "https://apex-grocery-image.s3.eu-north-1.amazonaws.com/images/3ccfba3c-f651-4238-8326-9583b4c82d14.webp"
 *     responses:
 *       201:
 *         description: Product created successfully.
 *       400:
 *         description: Image is required.
 *       500:
 *         description: Error creating product.
 */
