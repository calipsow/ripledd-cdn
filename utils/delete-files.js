const fs = require("fs");

const deleteFileWithRetry = async (path, maxRetries = 5) => {
  let attempts = 0;
  for (let i = 0; i < maxRetries; i++) {
    attempts++;
    try {
      await fs.promises.unlink(path);
      console.log(`Successfully deleted file: ${path}`);
      break; // Break out of the loop if the deletion was successful
    } catch (err) {
      if (err.code === "EBUSY" && i < maxRetries - 1) {
        console.warn(`Retrying to delete file: ${path}. Attempt ${i + 1}`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempts)); // Wait 100 ms before retrying
      } else {
        console.error(`Failed to delete file: ${path}. Error: ${err}`);
        throw err; // Rethrow the error if it's not an EBUSY or we've exhausted retries
      }
    }
  }
};

const deleteFiles = async (files = []) => {
  try {
    for (const fPath of files) {
      await deleteFileWithRetry(fPath).catch((e) => {});
    }
  } catch (error) {
    console.error("failed to delete files from list", error.message);
  }
};

module.exports = { deleteFiles, deleteFileWithRetry };
