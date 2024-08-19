import { NS, ScriptArg } from '@ns';

/** @param {NS} ns */
export async function main(ns: NS) {
    ns.tail();
    const scanResults = ns.scan();
    const filteredResults = scanResults.filter(s => s.startsWith("pserv-"));
    const hackTemplate = `hack-tier-1.js`;
    const scriptRam = ns.getScriptRam(hackTemplate, "home")
    ns.print('scriptRam :', scriptRam);
    const availableMoney = ns.getServerMoneyAvailable("home")
    ns.print('availableMoney :', availableMoney);
    const maxNumberOfServices = ns.getPurchasedServerLimit()
    ns.print('maxNumberOfServices :', maxNumberOfServices);
    const spendPerServer = availableMoney/maxNumberOfServices;
    
    // let biggestBase2: number | undefined = Math.floor(Math.log2(spendPerServer)) 
    let biggestBase2: number = -1; 
    let highBase = 20    
    while(biggestBase2 === -1){ 
        if(ns.getPurchasedServerUpgradeCost(filteredResults.at(-1) as string, 2 ** highBase) 
            < spendPerServer
        ){
            biggestBase2 = highBase
        } else {
            highBase = highBase - 1
        }
    }
    
    ns.print('spendPerServer :', spendPerServer);
    ns.print('biggestBase2 :', biggestBase2);
    if(biggestBase2>20) biggestBase2 = 20;
    ns.print('biggestBase2 :', biggestBase2);
    const targetRam = 2 ** biggestBase2;
    ns.print('targetRam :', targetRam);
    
    
    
    ns.print('filteredResults :', filteredResults);
    ns.print('last result :', filteredResults.at(-1));
    ns.print(ns.getPurchasedServerUpgradeCost(filteredResults.at(-1) as string, targetRam))
    while (filteredResults.length > 0) {
        // Check if we have enough money to purchase a server
        if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerUpgradeCost(filteredResults.at(-1) as string, targetRam)) {
            //Get the target server for upgrade
            const targetServer = filteredResults.pop() as string;
            //Upgrade the server
            ns.upgradePurchasedServer(targetServer, targetRam)
            //Stop all scripts on the server
            ns.killall(targetServer)
            //calculate the number of threads that can be run on the server
            const numberOfThreads =  Math.floor(targetRam/scriptRam);
            //copy over the new hack program
            ns.scp(hackTemplate, targetServer);
            //start the the new hack program
            ns.exec(hackTemplate, targetServer, numberOfThreads, numberOfThreads);
        }
        await ns.sleep(1000);
    }
}