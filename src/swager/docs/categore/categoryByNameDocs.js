/**
 * @swagger
 * /category/getByName:
 *   post:
 *     summary: Get products by category
 *     description: Retrieve a paginated list of products for a given category, with optional search and sorting.
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *                 description: The category to filter products by.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of products per page.
 *     responses:
 *       200:
 *         description: Products for the category fetched successfully.
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
 *                       productId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                       size:
 *                         type: string
 *                       quantity:
 *                         type: integer
 *                       category:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       images:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                             fileName:
 *                               type: string
 *                             url:
 *                               type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalProduct:
 *                       type: integer
 *                     rowsPerPage:
 *                       type: integer
 *       400:
 *         description: Category is required.
 *       404:
 *         description: No products found for this category.
 *       500:
 *         description: Error fetching products by category.
 */
