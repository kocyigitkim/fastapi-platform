export class RepositoryCredentials {
    public username: string;
    public password: string;
}
export class ProjectRepository {
    public url: string;
    public name: string;
    public branch: string;
    public path: string;
    public credentials: RepositoryCredentials;
}
export class Project {
    public id: string;
    public name: string;
    public description: string;
    public version: string;
    public author: string;
    public license: string;
    public repository: ProjectRepository;
    public dependencies: string[] = [];
    public devDependencies: string[] = [];
    public events: EventController[] = [];
    public main: ProjectEntryPoint;
    public components: ProjectComponent[] = [];
}

export enum ComponentRequirementType {
    Component,
    Package,
    File
}

export class ComponentRequirement {
    public name: string;
    public type: ComponentRequirementType;
}

export class ComponentExpression {

}

export class ComponentSource {
    public source: ComponentExpression[] = [];

}

export class ProjectComponent {
    public id: string;
    public name: string;
    public description: string;
    public requires: ComponentRequirement[] = [];
}

export class ProjectEntryPoint {
    public description?: string;
    public id: string;
}

export enum ApiExpressionType {
    Constant,
    VariableReference,
    FunctionCall,
    CustomScript
}

export enum ApiExpressionStoreToType {
    Variable,
    GlobalVariable,
    CallFunction
}

export class ApiExpressionStoreTo {
    public name: string;
    public store: ApiExpressionStoreToType;
}

export type ApiExpressionArgument = string | number | boolean | Date | null | undefined | ApiExpression;

export class ApiExpression {
    public type: ApiExpressionType;
    public args: ApiExpressionArgument[] = [];
    public storeTo: ApiExpressionStoreTo;
}

export class EventController {
    public name: string;
    public action: ApiExpression;
}