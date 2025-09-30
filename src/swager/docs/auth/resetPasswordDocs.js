/**
 * @swagger
 * /auth/resetPassword:
 *   post:
 *     summary: Reset user password
 *     description: Resets the user's password using a valid reset token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The password reset token.
 *               newPassword:
 *                 type: string
 *                 description: The new password.
 *     responses:
 *       200:
 *         description: Password reset successfully.
 *       400:
 *         description: Token and new password are required.
 *       403:
 *         description: Invalid reset token.
 *       500:
 *         description: Internal Server Error.
 */
