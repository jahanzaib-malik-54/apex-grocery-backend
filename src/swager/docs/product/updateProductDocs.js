

/**
 * @swagger
 * /product/update/{id}:
 *   patch:
 *     summary: Update product by ID
 *     description: Updates a product's information by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated product name.
 *               description:
 *                 type: string
 *                 description: Updated product description.
 *               price:
 *                 type: number
 *                 description: Updated product price.
 *               size:
 *                 type: string
 *                 description: Updated product size.
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error updating product.
 */