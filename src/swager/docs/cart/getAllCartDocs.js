/**
 * @swagger
 * /cart/all:
 *   get:
 *     summary: Get all cart items
 *     description: Retrieve all products in the user's cart with product details.
 *     tags:
 *       - Cart
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Cart fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "67c962d97c169aa27d81033e"
 *                       quantity:
 *                         type: integer
 *                         example: 1
 *                       product:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "67c95a6a9ff5b101efe005b4"
 *                           name:
 *                             type: string
 *                             example: "t-shirt"
 *                           description:
 *                             type: string
 *                             example: "t-shirt for men"
 *                           price:
 *                             type: number
 *                             example: 10
 *                           category:
 *                             type: string
 *                             example: "cloth"
 *                           size:
 *                             type: string
 *                             example: "L"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-06T08:18:50.726Z"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             example: "2025-03-06T08:50:19.819Z"
 *       500:
 *         description: Error fetching cart.
 */
