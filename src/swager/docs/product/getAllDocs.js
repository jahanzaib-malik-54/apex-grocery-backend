/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Get all products
 *     description: Retrieves all products with pagination, sorting, and search functionality.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter products.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., "price").
 *     responses:
 *       200:
 *         description: Products fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       quantity:
 *                         type: integer
 *                         example: 12
 *                       productId:
 *                         type: string
 *                         example: "AG00014"
 *                       image:
 *                         type: string
 *                         example: "http://192.168.18.14:4000/uploads/product-image.jpg"
 *                       id:
 *                         type: string
 *                         example: "67c95a6a9ff5b101efe005b4"
 *                       name:
 *                         type: string
 *                         example: "t-shirt"
 *                       description:
 *                         type: string
 *                         example: "Comfortable cotton t-shirt."
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 12.99
 *                       size:
 *                         type: string
 *                         example: "XS,S,M,L,XL"
 *                       category:
 *                         type: string
 *                         example: "cloth"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-06T08:18:50.726Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-03-06T08:18:50.726Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *                     totalProduct:
 *                       type: integer
 *                       example: 14
 *                     rowsPerPage:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Error fetching products.
 */