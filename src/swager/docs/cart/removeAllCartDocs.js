
/**
 * @swagger
 * /cart/deleteAll:
 *   delete:
 *     summary: Clear cart
 *     description: Remove all items from the user's cart.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All cart items cleared successfully.
 *       500:
 *         description: Error clearing cart.
 */
