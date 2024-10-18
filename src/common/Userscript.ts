import { v4 as uuidv4 } from 'uuid';
import { SettingsManager } from './Settings';

export interface UserscriptFile {
    type: "javascript" | "typescript" | "css" | "json" | "html";
    name: string;
    uuid: string;
    content: string;
    compiled?: string;
    isLibrary: boolean;
}

interface AuthorInfo {
    name: string;
    email: string;
    url: string;
}

interface UserscriptLinks {
    name: string;
    url: string;
}

export interface Userscript {
    name: string;
    description: string;
    formatVersion: string;
    version: string;
    author: AuthorInfo;
    uuid: string;
    files: UserscriptFile[];
    links: UserscriptLinks[];
    createdTime: number;
    lastModifiedTime: number;
}

const currentFormatVersion = "1.0";

export class UserscriptManager {
    private userscripts: Userscript[] = [];
    private activeUserscripts: string[] = [];
    private static instance: UserscriptManager;

    private constructor() {

    }

    public static getUserscripts(): Userscript[] {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        return UserscriptManager.instance.userscripts;
    }

    public static getUserscript(uuid: string): Userscript | undefined {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        return UserscriptManager.instance.userscripts.find((userscript) => userscript.uuid === uuid);
    }

    public static createUserscript(): Userscript {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        const userscript: Userscript = {
            name: SettingsManager.getSettingValue("defaultScriptName") as string,
            description: UserscriptManager.transformDescription(SettingsManager.getSettingValue("defaultScriptDescription") as string),
            formatVersion: currentFormatVersion,
            version: "1.0.0",
            author: {
                name: SettingsManager.getSettingValue("defaultAuthorName") as string,
                email: SettingsManager.getSettingValue("defaultAuthorEmail") as string,
                url: SettingsManager.getSettingValue("defaultAuthorUrl") as string
            },
            uuid: uuidv4(),
            files: [{
                type: "javascript",
                name: "Main Script",
                uuid: uuidv4(),
                content: "// Your code here\n",
                isLibrary: false
            }],
            links: [],
            createdTime: Date.now(),
            lastModifiedTime: Date.now()
        }
        UserscriptManager.instance.userscripts.push(userscript);
        return userscript;
    }

    private static transformDescription(description: string): string {
        return description.replace(/%DATE%/g, new Date().toLocaleDateString());
    }
}