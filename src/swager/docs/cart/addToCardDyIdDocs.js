/**
 * @swagger
 * /cart/add/{id}:
 *   post:
 *     summary: Add product to cart
 *     description: Add a product to the user's cart by product ID.
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
 *         description: Product ID to add to cart.
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *       400:
 *         description: Product already in cart.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error adding to cart.
 */
