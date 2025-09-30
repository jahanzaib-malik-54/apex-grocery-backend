/**
 * @swagger
 * /auth/forgotPassword:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset link to the user's email address.
  *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *     responses:
 *       200:
 *         description: Password reset link sent successfully.
 *       404:
 *         description: Invalid email address.
 *       500:
 *         description: Internal Server Error.
 */
