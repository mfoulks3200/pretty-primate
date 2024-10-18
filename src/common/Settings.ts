import { useEffect, useState } from "react";
import packageJson from "../../package.json";

interface SettingsCategory {
    title: string;
    description: string;
}

export const SettingsCategories: { [k: string]: SettingsCategory } = {
    general: {
        title: "General",
        description: "General settings."
    },
    defaults: {
        title: "Defaults",
        description: "Change the default information for new scripts."
    },
    appearance: {
        title: "Appearance",
        description: "Appearance settings."
    },
    scripts: {
        title: "Scripts",
        description: "Script settings."
    }
};

type SupportedSettingValue = string | number | boolean | string[] | number[];

interface SettingsItemControl {
    type: "select" | "input" | "textarea" | "switch" | "spinner" | "slider";
    min?: number;
    max?: number;
    regex?: RegExp;
    errorMessage?: string;
};

export interface SettingsItem {
    id: string;
    categoryId?: string;
    value: SupportedSettingValue;
    defaultValue: SupportedSettingValue;
    enum?: SupportedSettingValue[];
    createdTime: number;
    createdVersion: string;
    lastUpdatedTime: number;
    lastUpdatedVersion: string;
    control?: SettingsItemControl;
}

export interface DisplayableSettingsItem extends SettingsItem {
    title: string;
    description: string;
}

export const DefaultSettings: (Omit<SettingsItem, "createdTime" | "createdVersion" | "lastUpdatedTime" | "lastUpdatedVersion"> |
    Omit<DisplayableSettingsItem, "createdTime" | "createdVersion" | "lastUpdatedTime" | "lastUpdatedVersion">)[] = [
        {
            id: "colorMode",
            categoryId: "appearance",
            title: "Theme",
            description: "The color mode of pretty primate.",
            value: "system",
            defaultValue: "system",
            enum: ["system", "light", "dark"],
            control: {
                type: "select"
            }
        },
        {
            id: "defaultAuthorName",
            categoryId: "defaults",
            title: "Author Name",
            description: "The default author name for new scripts.",
            value: "",
            defaultValue: "Primate Author",
            control: {
                type: "input",
                regex: /^.+$/gm,
                errorMessage: "Author name cannot be blank."
            }
        },
        {
            id: "defaultAuthorEmail",
            categoryId: "defaults",
            title: "Author Email",
            description: "The default author email for new scripts.",
            value: "",
            defaultValue: "nobody@example.com",
            control: {
                type: "input"
            }
        },
        {
            id: "defaultAuthorUrl",
            categoryId: "defaults",
            title: "Author URL",
            description: "A link to your profile.",
            value: "",
            defaultValue: "",
            control: {
                type: "input"
            }
        },
        {
            id: "defaultScriptName",
            categoryId: "defaults",
            title: "Script Name",
            description: "A default name to use for new scripts.",
            value: "",
            defaultValue: "Untitled Script",
            control: {
                type: "input"
            }
        },
        {
            id: "defaultScriptDescription",
            categoryId: "defaults",
            title: "Script Description",
            description: "A default description to use for new scripts. Use %DATE% to insert the current date.",
            value: "",
            defaultValue: "%DATE%",
            control: {
                type: "input"
            }
        },
    ];

export const useSetting = (id: string, defaultValue: SupportedSettingValue): SupportedSettingValue => {
    const [value, setValue] = useState<SupportedSettingValue>(SettingsManager.getSetting(id)!.value ?? defaultValue);

    useEffect(() => {
        const listener = (newVal: SupportedSettingValue) => {
            setValue(newVal);
        };
        SettingsManager.registerListener(id, listener);
        return () => {
            SettingsManager.unregisterListener(id, listener);
        };
    });

    return value;
};

interface SettingsListener {
    settingId: string;
    onSettingChanged(newVal: SupportedSettingValue): void;
}

export class SettingsManager {
    private settings: SettingsItem[] = [];
    private listeners: SettingsListener[] = [];
    private static instance: SettingsManager;

    private constructor() {
        this.loadSettings();
    }

    private loadSettings() {
        this.settings = DefaultSettings.map((setting) => {
            return {
                ...setting,
                createdTime: Date.now(),
                createdVersion: packageJson.version,
                lastUpdatedTime: Date.now(),
                lastUpdatedVersion: packageJson.version
            };
        });
        const rawLoadedSettings = localStorage.getItem("settings");
        if (rawLoadedSettings) {
            const loadedSettings: SettingsItem[] = JSON.parse(rawLoadedSettings);
            for (const loadedSetting of loadedSettings) {
                const setting = this.settings.find((setting) => setting.id == loadedSetting.id);
                if (setting) {
                    setting.value = loadedSetting.value;
                    setting.createdTime = loadedSetting.createdTime;
                    setting.lastUpdatedTime = loadedSetting.lastUpdatedTime;
                    setting.createdVersion = loadedSetting.createdVersion;
                    setting.lastUpdatedVersion = loadedSetting.lastUpdatedVersion;
                }
            }
        }
        this.saveSettings();
    }

    private saveSettings() {
        localStorage.setItem("settings", JSON.stringify(this.settings.map((setting) => {
            const { control, ...rest } = setting;
            return rest;
        })));
    }

    public static registerListener(settingId: string, onSettingChanged: (newVal: SupportedSettingValue) => void) {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        SettingsManager.instance.listeners.push({ settingId, onSettingChanged });
    }

    public static unregisterListener(settingId: string, onSettingChanged: (newVal: SupportedSettingValue) => void) {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        SettingsManager.instance.listeners = SettingsManager.instance.listeners.filter((listener) => listener.settingId != settingId && listener.onSettingChanged != onSettingChanged);
    }

    public static getSettings(): SettingsItem[] {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        return SettingsManager.instance.settings;
    }

    public static getDisplayableSettings(categoryId?: string): DisplayableSettingsItem[] {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        let filteredSettings = SettingsManager.instance.settings;
        if (categoryId) {
            filteredSettings = SettingsManager.instance.settings.filter((setting) => setting.categoryId == categoryId);
        }
        return filteredSettings.filter((setting) => (setting as DisplayableSettingsItem).title != null) as DisplayableSettingsItem[];
    }

    public static getSetting(id: string): SettingsItem | undefined {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        return SettingsManager.instance.settings.find((setting) => setting.id == id);
    }

    public static getSettingValue(id: string | SettingsItem): SupportedSettingValue {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        const setting = SettingsManager.getSetting(typeof id === "string" ? id : id.id);
        return setting!.value !== null && setting!.value.toString().length > 0 ? setting!.value : setting!.defaultValue!;
    }

    public static setSetting(id: string, value: SupportedSettingValue) {
        if (SettingsManager.instance == null) {
            SettingsManager.instance = new SettingsManager();
        }
        const setting = SettingsManager.getSetting(id);
        if (setting) {
            setting.value = value;
            setting.lastUpdatedTime = Date.now();
            setting.lastUpdatedVersion = packageJson.version;
            const listeners = SettingsManager.instance.listeners.filter((listener) => listener.settingId == id);
            listeners.forEach((listener) => listener.onSettingChanged(value));
            SettingsManager.instance.saveSettings();
        }
    }
}