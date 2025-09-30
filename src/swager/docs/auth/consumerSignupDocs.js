/**
 * @swagger
 * /auth/consumer/signup:
 *   post:
 *     summary: consumer Signup
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "consumer@mailinator.com"
 *               password:
 *                 type: string
 *                 example: "password123$"
 *     responses:
 *       201:
 *         description: User created successfully
 */