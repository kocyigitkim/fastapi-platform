import path from "path"
import fs from 'fs'
export class ProjectManager {
    rootDir: string;
    recents: any[];
    constructor() { }
    public async list() {
        var items = fs.readdirSync(this.rootDir, { withFileTypes: true });
        var dirs = [];
        for (var i = 0; i < items.length; i++) {
            if (items[i].isDirectory()) {
                dirs.push(items[i].name);
            }
        }
        return dirs;
    }
    public async loadFromName(name: string) {

    }
    public async loadFromPath(path: string) {

    }
    public async createProject(args: {
        name: string,
        description?: string,
        path: string
    }) {
        /*
Project structure:
- info.json
- environments:
    - variables
    - constants
    - cronjobs
    - events
    - functions
    - models
    - components
    - authorization
    - authentication
- resources
    - configurations
    - storage connectors
    - databases
- marketplace
    - plugins
- settings
*/
console.log(args);
        // create project structure
        var projectPath = path.join(args.path, args.name);
        fs.mkdirSync(projectPath);
        fs.mkdirSync(path.join(projectPath, 'environments'));
        fs.mkdirSync(path.join(projectPath, 'resources'));
        fs.mkdirSync(path.join(projectPath, 'marketplace'));
        fs.mkdirSync(path.join(projectPath, 'settings'));
        // create sub directories
        fs.mkdirSync(path.join(projectPath, 'environments', 'variables'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'constants'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'cronjobs'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'events'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'functions'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'models'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'components'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'authorization'));
        fs.mkdirSync(path.join(projectPath, 'environments', 'authentication'));
        fs.mkdirSync(path.join(projectPath, 'resources', 'configurations'));
        fs.mkdirSync(path.join(projectPath, 'resources', 'storage-connectors'));
        fs.mkdirSync(path.join(projectPath, 'resources', 'databases'));
        fs.mkdirSync(path.join(projectPath, 'marketplace', 'plugins'));
console.log('project created', projectPath);
        // create info.json
        var info = {
            name: args.name,
            description: args.description
        };
        fs.writeFileSync(path.join(projectPath, 'info.json'), JSON.stringify(info));

        // create definition.json for every directories and sub directories
        var definition = {
            items: [],
        };
        fs.writeFileSync(path.join(projectPath, 'environments', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'variables', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'constants', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'cronjobs', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'events', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'functions', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'models', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'components', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'authorization', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'environments', 'authentication', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'resources', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'resources', 'configurations', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'resources', 'storage-connectors', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'resources', 'databases', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'marketplace', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'marketplace', 'plugins', 'definition.json'), JSON.stringify(definition));
        fs.writeFileSync(path.join(projectPath, 'settings', 'definition.json'), JSON.stringify(definition));


    }
}