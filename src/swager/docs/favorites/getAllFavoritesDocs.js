/**
 * @swagger
 * /favoritesProduct/all:
 *   get:
 *     summary: Get all favorite products
 *     description: Retrieve a list of all favorite products for the authenticated user.
 *     tags:
 *       - Favorites
 *     responses:
 *       200:
 *         description: Favorites fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                       image:
 *                         type: string
 *       500:
 *         description: Error fetching favorites.
 */
