/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Logs out the user by blacklisting the access and refresh tokens.
  *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: The refresh token to invalidate.
 *     responses:
 *       200:
 *         description: Logout successfully.
 *       401:
 *         description: Refresh token required.
 *       500:
 *         description: Failed to logout.
 */
