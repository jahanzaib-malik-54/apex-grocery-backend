/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     description: Deletes a product by its ID.
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
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error deleting product.
 */
