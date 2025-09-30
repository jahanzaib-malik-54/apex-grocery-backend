import User from "../models/authModel.js";

const initializeSuperAdminUser = async () => {
    try {
        const superAdminEmail =  process.env.SUPER_ADMIN_EMAIL || null;

        const existingSuperAdmin = await User.findOne({
            $or: [{ role: 'super-admin' }, { email: superAdminEmail }],
        });

        if (!superAdminEmail) {
            // NO NEED TO WARN OR show any consoles as system already has a super admin.
            if (existingSuperAdmin) {
                console.log(
                    '🚀 ~ $$$ ~ initializeSuperAdminUser ~ super admin already created and no super-admin email provided...'
                );
                return;
            }

            // No super admin exists and no credentials provided
            console.error(`
        [WARNING] No super admin user exists in the system, and super admin credentials (SUPER_ADMIN_EMAIL) is missing from the environment variables.
        
        To fix this issue:
        1. Add the following keys to your environment configuration (.env file or deployment settings):
           - SUPER_ADMIN_EMAIL: The email address of the super admin user.
        
        2. Restart the application after setting these variables.

        Note: Without a super admin user, you will not be able to log in or manage the system.
      `);
            return;
        }

        // Check if the provided email is already associated with a super admin so need to do anything.
        if (superAdminEmail && existingSuperAdmin?.email === superAdminEmail) {
            console.log(
                '🚀 ~ $$$ ~ initializeSuperAdminUser ~ super user already created with the provided email:',
                superAdminEmail
            );
            return;
        }

       const newSuperAdmin = new User({
           firstName: 'super',
           lastName: 'admin',
           email: superAdminEmail,
           password: 'Testing1$', 
           role: 'super-admin',
           phone:'00123456789',
       });
        await newSuperAdmin.save();
        console.log(
            "Super admin user created successfully and 'Testing1$' is your default password"
        );
    } catch (error) {
        console.error('Error initializing super admin user:', error.message);
    }
};

export default initializeSuperAdminUser;
