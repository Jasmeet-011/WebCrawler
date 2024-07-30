const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");
// process.argv lets us get the input from the command line

const { writeDataToCSV } = require("./csv"); // No need to import csvWriter directly
const path = require("path");

function getFileNameFromUrl(url) {
  const urlObj = new URL(url);
  const sanitizedHost = urlObj.hostname
    .replace(/[^a-z0-9]/gi, "_")
    .toLowerCase();
  return `crawled_data_${sanitizedHost}.csv`;
}
async function main() {
  // argv is an array of length 3 (name of interpreter, name of the file that is running, url provided)
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line args");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  const csvFileName = getFileNameFromUrl(baseURL);

  console.log(`satarting crawl ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
  await writeDataToCSV(pages, path.join(__dirname, csvFileName));
}
main();
