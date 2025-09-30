/**
 * @swagger
 * /user/getMyUserInfo:
 *   get:
 *     summary: Get logged-in user's information
 *     description: Retrieves the profile information of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User information fetched successfully.
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65f34b9c4a3b3e001f0a4d5c"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     firstName:
 *                       type: string
 *                       example: "John"
 *                     lastName:
 *                       type: string
 *                       example: "Doe"
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "+1234567890"
 *                     role:
 *                       type: string
 *                       example: "user"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-02-20T14:30:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2023-02-25T18:45:00Z"
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
