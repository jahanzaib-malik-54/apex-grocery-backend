
/**
 * @swagger
 * /favorites/{id}:
 *   post:
 *     summary: Add product to favorites
 *     description: Add a product to the authenticated user's favorites.
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to add to favorites.
 *     responses:
 *       200:
 *         description: Product added to favorites successfully.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error adding to favorites.
 *   delete:
 *     summary: Remove product from favorites
 *     description: Remove a product from the authenticated user's favorites.
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID to remove from favorites.
 *     responses:
 *       200:
 *         description: Product removed from favorites successfully.
 *       404:
 *         description: Product is not in favorites.
 *       500:
 *         description: Error removing from favorites.
 */
