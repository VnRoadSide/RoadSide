// environment.ts

interface EnvironmentConfig {
  apiUrl: string;
  port: string;
  appName: string;
  appUrl: string;
  mode: string;
  algolia: {
    appId: string;
    apiKey: string;
  }
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  // Environment-specific logic
  const defaultPort = "5029"; // Default port if not specified
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
    ? `https://${process.env.NEXT_PUBLIC_API_URL}`
    : `http://localhost:${defaultPort}`;

  return {
    apiUrl: `${apiUrl}/api`,
    port: (process.env.PORT as string) ?? defaultPort,
    appName: (process.env.NEXT_PUBLIC_APP_NAME as string) ?? "RoadSide",
    appUrl: process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000',
    mode: process.env.NODE_ENV ?? "development",
    algolia: {
      appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
      apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string
    }
  };
};

export const environment = getEnvironmentConfig();
