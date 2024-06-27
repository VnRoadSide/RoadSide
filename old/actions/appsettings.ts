import { AppSettings } from "../models/settings";
import { defineApi } from "../utils";

const baseUrl = "/settings";

export async function getSettings() {
  const { data, error } = await defineApi().get<AppSettings[]>(baseUrl);

  if (error) {
    console.error("Error: ", error);
    return;
  }

  return data;
}

export async function createSettings(setting: AppSettings) {
  const { data, error } = await defineApi().post<AppSettings[]>(
    baseUrl,
    setting
  );

  if (error) {
    console.error("Error: ", error);
    return;
  }

  return data;
}

export async function updateSettings(setting: AppSettings[]) {
  const url = `${baseUrl}/update`;
  const { data, error } = await defineApi().post<AppSettings[]>(url, setting);

  if (error) {
    console.error("Error: ", error);
    return;
  }

  return data;
}

export async function deleteSettings(id: string) {
  const url = `${baseUrl}/delete`;
  const { data, error } = await defineApi().delete<AppSettings[]>(url, {
    data: { id },
  });

  if (error) {
    console.error("Error: ", error);
    return;
  }

  return data;
}
