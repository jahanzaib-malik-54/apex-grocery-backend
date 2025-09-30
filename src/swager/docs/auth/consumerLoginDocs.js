/**
 * @swagger
 * /auth/consumer/login:
 *   post:
 *     summary: Consumer Login
 *     tags: [Auth]
 *     description: Authenticate a consumer using email or phone and receive access and refresh tokens.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: consumer@example.com
 *               password:
 *                 type: string
 *                 example: password123$
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 accessToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Missing email/phone or password
 *       401:
 *         description: Invalid email/phone or password
 *       500:
 *         description: Internal server error
 */
