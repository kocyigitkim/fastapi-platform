import path from "path";
import fs from "fs";
import { ProjectManager } from "./ProjectManager";

const projectManager = new ProjectManager();

export class FastApiManager {
    private workDir: string;
    constructor() {
        this.workDir = path.join(process.cwd(), '_work');
        projectManager.rootDir = this.workDir;
    }
    public async recents() {
        var current = [];
        try {
            current = JSON.parse(fs.readFileSync(path.join(this.workDir, 'recents.json'), 'utf-8'));
        } catch (err) {
            current = [];
        }
        return current;
    }
    public async appendRecent(projectPath: string, name: string) {
        var recents = await this.recents();
        recents.push({
            path: projectPath,
            name: name
        });
        fs.writeFileSync(path.join(this.workDir, 'recents.json'), JSON.stringify(recents));
    }
    public list() {
        return 'hello world :) 123';
    }
    public async browse(options: {

    }) {
        const { dialog } = require('electron');
        const result = await dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        return result;
    }
    public async create(args: {
        name: string,
        description?: string,
        path: string
    }) {
        console.log('create project', args);
        await projectManager.createProject(args).catch(console.error);
    }
}