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

    static parseDate(sDate: string): Date {
        let arr = /^(\d+)\/(\d+)\/(\d+)/.exec(sDate);
        return new Date(Number(arr[3]) + 2000, Number(arr[1]) - 1, Number(arr[2]));

    }

    static fromRawObject(source: { [key: string]: string }): CCScheduleEntry {
        let entry = new CCScheduleEntry();

        entry.employee = source["TeamMember"];
        entry.date = CCScheduleEntry.parseDate(source["WorkByDay"]);
        entry.project = CCScheduleProject.fromRawObject(source);
        entry.hours = source["BookedHours"]; //parseInt(source["BookedHours"]);

        return entry;
    }
}

export class CCSchedule {
    employees: string[];
    entries: CCScheduleEntry[];

    constructor() {

    }
}