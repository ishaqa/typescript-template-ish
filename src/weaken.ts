import { NS } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {
    const [target] = ns.args;
    
    ns.weaken(target as string);
    ns.scp
}