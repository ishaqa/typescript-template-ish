import { NS } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    ns.tprint(ns.args)
    const [target] = ns.args;

    if (ns.fileExists('BruteSSH.exe')){
        ns.brutessh(target as string)
        ns.tprint(target,":BruteSSH")
    }
    if (ns.fileExists('FTPCrack.exe')){
        ns.ftpcrack(target as string)
        ns.tprint(target,":FTPCrack")

    }
    if (ns.fileExists('HTTPWorm.exe')){
        ns.httpworm(target as string)
        ns.tprint(target,":HTTPWorm")

    }
    if (ns.fileExists('relaySMTP.exe')){
        ns.relaysmtp(target as string)
        ns.tprint(target,":relaySMTP")

    }
    if (ns.fileExists('SQLInject.exe')){
        ns.sqlinject(target as string)
        ns.tprint(target,":SQLInject")
    }
    ns.nuke(target as string)
}