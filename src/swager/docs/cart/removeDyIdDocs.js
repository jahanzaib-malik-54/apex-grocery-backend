
/**
 * @swagger
 * /cart/removeBYId/{id}:
 *   delete:
 *     summary: Remove product from cart
 *     description: Remove a product from the user's cart by product ID.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove from cart.
 *     responses:
 *       200:
 *         description: Product removed from cart.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error removing from cart.
 */
