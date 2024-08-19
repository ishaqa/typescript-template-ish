import { NS } from "@ns";

/** @param {NS} ns */
export async function main(ns: NS): Promise<void> {

    const results = ns.flags([
        ["test", ""],
        ["test2", ""]
    ])
    ns.tprint(results)
}