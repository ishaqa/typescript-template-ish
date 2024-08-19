import { NS, Server } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    const flags = ns.flags([
        ["target", ""]
    ]);

    const target: string = flags.target as string;

    while(true) {   
        /**
         * ================ Get Constants ===================
         *  */ 
        
        const serverRam = ns.getServerMaxRam('home');
        
        
        /**
         * ================ Server Prep (Weaken/Grow) ===================
         *  Create a script that will max grow a server and max weaken so that
         *  we can figure out the thread for hack grow weaken loop scripts
         *  */ 
        
        
        
        
        /**
         * ================ Server Discovery ===================
         *  Scan for servers and assign them to a list and retrieve server details.
         *  */ 
        


        await ns.sleep(1000);
    }
}

function getServerDetails(ns: NS, scanResults: string[]): {[key:string]: Server} {
    const serverDetails: {[key:string]: Server} = {}
    scanResults.forEach((result) => {
        const sd = ns.getServer(result);
        serverDetails[result] = sd;
    })
    return serverDetails;
}