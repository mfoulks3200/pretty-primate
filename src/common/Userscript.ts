import { v4 as uuidv4 } from 'uuid';
import { SettingsManager } from './Settings';

export const UserscriptFileTypes = ["javascript", "typescript", "css", "json", "html", "component"] as const;
export type UserscriptFileType = typeof UserscriptFileTypes[number];

export interface UserscriptFile {
    type: UserscriptFileType;
    name: string;
    id: string;
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

export interface UserscriptLinks {
    name: string;
    url: string;
}

export type UserscriptTargetType = "include" | "exclude";
export interface UserscriptTarget {
    value: string;
    targetType: UserscriptTargetType;
}

export interface Userscript {
    name: string;
    description: string;
    formatVersion: string;
    version: string;
    author: AuthorInfo;
    uuid: string;
    targets: UserscriptTarget[];
    files: UserscriptFile[];
    links: UserscriptLinks[];
    createdTime: number;
    lastModifiedTime: number;
}

const currentFormatVersion = "1.0";

interface SerializedUserscriptManager {
    userscripts: Userscript[];
    activeUserscripts: string[];
}

export class UserscriptManager {
    private userscripts: Userscript[] = [];
    private activeUserscripts: string[] = [];
    private static instance: UserscriptManager;

    private constructor() {
        this.loadUserscripts();
    }

    private loadUserscripts() {
        const rawUserscriptManager = localStorage.getItem("userscriptManager");
        if (!rawUserscriptManager) {
            return;
        }
        const userscriptManager: SerializedUserscriptManager = JSON.parse(rawUserscriptManager);
        this.userscripts = userscriptManager.userscripts;
        this.activeUserscripts = userscriptManager.activeUserscripts;
    }

    private saveUserscripts() {
        localStorage.setItem("userscriptManager", JSON.stringify({
            userscripts: this.userscripts,
            activeUserscripts: this.activeUserscripts
        }));
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
            targets: [],
            files: [{
                type: "javascript",
                name: "Main Script",
                id: "main-script",
                uuid: uuidv4(),
                content: "// Your code here\n",
                isLibrary: false
            }],
            links: [{
                name: "Homepage",
                url: ""
            }],
            createdTime: Date.now(),
            lastModifiedTime: Date.now()
        }
        UserscriptManager.instance.userscripts.push(userscript);
        UserscriptManager.instance.activeUserscripts.push(userscript.uuid);
        UserscriptManager.instance.saveUserscripts();
        return userscript;
    }

    public static deleteUserscript(uuid: string): void {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        UserscriptManager.instance.userscripts = UserscriptManager.instance.userscripts.filter((userscript) => userscript.uuid !== uuid);
        UserscriptManager.instance.activeUserscripts = UserscriptManager.instance.activeUserscripts.filter((activeUuid) => activeUuid !== uuid);
        UserscriptManager.instance.saveUserscripts();
    }

    public static createFile(userscript: Userscript, fileName: string, fileType: UserscriptFileType): UserscriptFile {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        const file: UserscriptFile = {
            type: fileType,
            name: fileName,
            id: fileName.toLowerCase().replace(/[^a-z0-9]/gm, "-"),
            uuid: uuidv4(),
            content: "",
            isLibrary: false
        }
        userscript.files.push(file);
        UserscriptManager.instance.saveUserscripts();
        return file;
    }

    public static updateFile(userscript: Userscript, uuid: string, newFile: UserscriptFile): void {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        userscript.files = userscript.files.map((file) => file.uuid === uuid ? newFile : file);
        UserscriptManager.instance.saveUserscripts();
    }

    public static deleteFile(userscript: Userscript, uuid: string): void {
        if (!UserscriptManager.instance) {
            UserscriptManager.instance = new UserscriptManager();
        }
        userscript.files = userscript.files.filter((file) => file.uuid !== uuid);
        UserscriptManager.instance.saveUserscripts();
    }

    public static save() {
        UserscriptManager.instance.saveUserscripts();
    }

    private static transformDescription(description: string): string {
        return description.replace(/%DATE%/g, new Date().toLocaleDateString());
    }
}