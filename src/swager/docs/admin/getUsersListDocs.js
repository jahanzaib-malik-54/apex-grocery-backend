/**
 * @swagger
 * /admin/getUsersList:
 *   get:
 *     summary: Get paginated list of users (Admin only)
 *     description: Retrieve a paginated list of users with optional search and role filtering. Admin access required.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of users per page.
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter users by name, email, or role.
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *           enum: [admin, consumer]
 *         description: Filter users by role (admin or consumer).
 *     responses:
 *       200:
 *         description: Users fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Users fetched successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "65f1a2b3c4d5e6f7890ab123"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       firstName:
 *                         type: string
 *                         example: "John"
 *                       lastName:
 *                         type: string
 *                         example: "Doe"
 *                       email:
 *                         type: string
 *                         example: "john@example.com"
 *                       role:
 *                         type: string
 *                         example: "consumer"
 *                       favorites:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["product123", "product456"]
 *                       cart:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             productId:
 *                               type: string
 *                               example: "product789"
 *                             quantity:
 *                               type: integer
 *                               example: 2
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-05T12:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-03-05T12:30:00Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *                     totalUsers:
 *                       type: integer
 *                       example: 100
 *                     rowsPerPage:
 *                       type: integer
 *                       example: 10
 *       400:
 *         description: Invalid role provided.
 *       401:
 *         description: Unauthorized - Admin access required.
 *       500:
 *         description: Error fetching users.
 */
