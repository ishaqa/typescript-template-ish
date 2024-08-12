import { NS, Server } from "@ns";

export type ServerDict = { [key: string]: Server };

export function readJsonFile<T>(ns: NS, fileName: string, customPath: string = "temp/"): T {
    return JSON.parse(ns.read(customPath + fileName));
}

export function writeJsonFile<T>(ns: NS, data: T, fileName: string, customPath: string = "temp/"): void {
    ns.write(customPath + fileName, JSON.stringify(data));
}

const pathServerDetails = "static/serverDetails.json";
const staticServerDetails = {
    save: function (ns: NS, data: ServerDict) {
        ns.write(pathServerDetails, JSON.stringify(data));
    },
    load: function (ns: NS): ServerDict {
        return JSON.parse(ns.read(pathServerDetails));
    }
}

export class ServerDetails {
    public ns: NS;
    public static filePath = "static/serverDetails.json";
  
    constructor(props: { ns: NS }) {
        this.ns = props.ns;
        
    }

    public save (data: ServerDict) {
        this.ns.write(ServerDetails.filePath, JSON.stringify(data));
    }

    public load (): ServerDict {
        //@TODO add in check here to see if  file exists else trigger a scan of all the servers
        return JSON.parse(this.ns.read(ServerDetails.filePath));
    }

}