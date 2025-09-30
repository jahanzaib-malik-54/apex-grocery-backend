/**
 * @swagger
 * /category/all:
 *   get:
 *     summary: Get product categories with images
 *     description: Retrieve a list of product categories, each with a sample image.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Categories fetched successfully.
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
 *                       category:
 *                         type: string
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
 *       404:
 *         description: No categories found.
 *       500:
 *         description: Error fetching categories.
 */
