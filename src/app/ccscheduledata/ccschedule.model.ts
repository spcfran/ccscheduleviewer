import { UtilService } from "../shared";

export class CCScheduleProject {
    id: string;
    name: string;
    projectManager: string;
    status: string;

    static fromRawObject(source: { [key: string]: string }): CCScheduleProject {
        let project = new CCScheduleProject();

        project.id = source["ProjectID"];
        project.name = source["Project Name"];
        project.projectManager = source["Project Manager"];
        project.status = source["Project Status"];

        return project;
    }
}

export class CCScheduleEntry {
    employee: string;
    date: Date;
    project: CCScheduleProject;
    hours: string;
    provisional: boolean;

    private _util = new UtilService();

    constructor() {}

    static fromRawObject(source: { [key: string]: string }): CCScheduleEntry {
        let entry = new CCScheduleEntry();

        entry.employee = source["TeamMember"];
        entry.date = UtilService.parseDate(source["WorkByDay"]);
        entry.project = CCScheduleProject.fromRawObject(source);
        entry.hours = source["BookedHours"]; //parseInt(source["BookedHours"]);
        entry.provisional = source["BookingType"] == "Provisional"; 

        return entry;
    }
}

export class CCSchedule {
    employees: string[];
    entries: CCScheduleEntry[];

    constructor() {

    }
}