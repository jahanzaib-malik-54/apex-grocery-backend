
/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieves a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID.
 *     responses:
 *       200:
 *         description: Product fetched successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error fetching product.
 */
