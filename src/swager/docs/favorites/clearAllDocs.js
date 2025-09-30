
/**
 * @swagger
 * /favorites/deleteAll:
 *   delete:
 *     summary: Clear all favorites
 *     description: Remove all products from the authenticated user's favorites.
 *     tags:
 *       - Favorites
 *     responses:
 *       200:
 *         description: All favorites cleared successfully.
 *       404:
 *         description: No favorites to clear.
 *       500:
 *         description: Error clearing favorites.
 */
