/**
 * Validate required environment variables
 */
export const validateEnv = (): void => {
  const requiredEnvVars = [
    'MONGODB_URI',
    'JWT_SECRET',
  ];

  const missingVars: string[] = [];

  requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
      missingVars.push(varName);
    }
  });

  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach((varName) => {
      console.error(`   - ${varName}`);
    });
    console.error('\nPlease check your .env file and ensure all required variables are set.');
    process.exit(1);
  }

  // Warn about using default values
  if (process.env.JWT_SECRET === 'fallback_secret_key_for_development') {
    console.warn('⚠️  WARNING: Using default JWT_SECRET. Please set a secure secret in production!');
  }

  if (process.env.NODE_ENV === 'production' && !process.env.FRONTEND_URL) {
    console.warn('⚠️  WARNING: FRONTEND_URL not set in production environment');
  }

  console.log('✅ Environment variables validated successfully');
};

