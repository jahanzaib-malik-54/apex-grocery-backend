/**
 * @swagger
 * /user/updateMyUserInfo:
 *   patch:
 *     summary: Update logged-in user's information
 *     description: Updates the profile information of the currently authenticated user.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               address:
 *                 type: object
 *                 properties:
 *                   street:
 *                     type: string
 *                     example: "456 New Street"
 *                   city:
 *                     type: string
 *                     example: "Los Angeles"
 *                   postalCode:
 *                     type: string
 *                     example: "90001"
 *                   country:
 *                     type: string
 *                     example: "USA"
 *     responses:
 *       200:
 *         description: User information updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User information updated successfully.
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
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
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                           example: "456 New Street"
 *                         city:
 *                           type: string
 *                           example: "Los Angeles"
 *                         postalCode:
 *                           type: string
 *                           example: "90001"
 *                         country:
 *                           type: string
 *                           example: "USA"
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