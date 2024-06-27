// environment.ts

interface EnvironmentConfig {
  apiUrl: string;
  port: string;
  DemeterUrl: string;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  // Environment-specific logic
  const defaultPort = "5029"; // Default port if not specified
  const apiUrl = process.env.VITE_DEMETER_URL
    ? `https://${process.env.VITE_DEMETER_URL}`
    : `http://localhost:${defaultPort}`;

  return {
    apiUrl: `${apiUrl}/api`,
    port: (process.env.PORT as string) ?? defaultPort,
    DemeterUrl: (process.env.VITE_DEMETER_URL as string) ?? "localhost",
  };
};

export const environment = getEnvironmentConfig();
