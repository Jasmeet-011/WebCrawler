const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Configure the CSV writer
function getcsvWriter(filePath) {
  return createCsvWriter({
    path: filePath,
    header: [
      { id: "url", title: "URL" },
      { id: "count", title: "COUNT" },
    ],
  });
}

// Function to write data to CSV
async function writeDataToCSV(pages, filePath) {
  const csvWriter = getcsvWriter(filePath);

  const records = Object.keys(pages).map((url) => ({
    url,
    count: pages[url],
  }));

  records.sort((a, b) => b.count - a.count);

  try {
    await csvWriter.writeRecords(records);
    console.log("Data successfully written to CSV file.");
  } catch (error) {
    console.error("Error writing to CSV file:", error);
  }
}

module.exports = {
  writeDataToCSV,
};
