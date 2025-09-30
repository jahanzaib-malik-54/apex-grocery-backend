import { Router } from 'express';
import { APP_PACKAGE_NAME } from '../config/appconfig';

const router = Router();

router.get('/open-mind-hue-app', (req, res) => {
    const { token } = req.query;

    // Deep link to open the app
    const deepLink = `td-mindhue://reset-password?token=${token}`;

    res.send(`
    <html>
        <body>
            <script>
                // Try to open the app via deep link
                window.location.href = '${deepLink}';

                // Fallback after 2 seconds if the app is not installed
                setTimeout(function() {
                    const userAgent = navigator.userAgent.toLowerCase();

                    if (/android/.test(userAgent)) {
                        // Redirect to Play Store for Android
                        window.location.href = 'https://play.google.com/store/apps/details?id=${APP_PACKAGE_NAME}';
                    } else if (/iphone|ipad|ipod/.test(userAgent)) {
                        // Redirect to App Store for iOS
                        window.location.href = 'https://apps.apple.com/app/idYOUR_APP_ID';
                    } else {
                        // Handle other platforms or show a message
                        alert('App is not supported on this platform.');
                    }
                }, 2000);
            </script>
        </body>
    </html>
    `);
});

export default router;