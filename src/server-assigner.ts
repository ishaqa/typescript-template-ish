import {NS} from '@ns';

/** @param {NS} ns */
export async function main(ns: NS) {

    const scanResults = ns.scan();
    
    const filteredResults = scanResults.filter(s => s.startsWith("pserv-"));
    const hackTemplate = `hack-tier-1.js`;
    const scriptRam = ns.getScriptRam(hackTemplate, "home")
    

    for await (const s of filteredResults) {
        const serverRam = ns.getServerMaxRam(s)
        const getMaxThread = Math.floor(serverRam/scriptRam);
        await ns.killall(s);
        ns.scp('hack-tier-1.js', s);
        ns.exec('hack-tier-1.js', s, getMaxThread, getMaxThread);
        ns.print("Server assigned: ", s);
        await ns.sleep(23000);
    }
}