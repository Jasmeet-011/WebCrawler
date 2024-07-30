const { crawlPage } = require("./crawl.js");
// process.argv lets us get the input from the command line
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

  console.log(`satarting crawl ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}
main();
