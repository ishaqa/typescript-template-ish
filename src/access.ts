import { NS, Server } from "@ns";
import {readJsonFile, writeJsonFile} from 'lib/helpers';

export async function main(ns: NS): Promise<void> {
  const scanResults = ns.scan();
  const serverDetails: {[key:string]: Server} = {}
  scanResults.forEach((result) => {
      const sd = ns.getServer(result);
      serverDetails[result] = sd;
  })
  writeJsonFile(ns, serverDetails, "serverDetails.json");
//   ns.write("temp/serverDetails.json", JSON.stringify(serverDetails));
//   ns.write("temp/scanResults.json", JSON.stringify(scanResults));

}
