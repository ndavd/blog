import fs from "fs";
import FormData from "form-data";
import got from "got";
import path from "path";

const getFilesRecursively = (src) => {
  return fs
    .readdirSync(src, { recursive: true })
    .map((file) => path.join(src, file))
    .filter((file) => !fs.statSync(file).isDirectory());
};

const pinDirectoryToPinata = async () => {
  try {
    const files = getFilesRecursively("dist");
    const data = new FormData();
    for (const file of files) {
      data.append("file", fs.createReadStream(file), {
        filepath: file,
      });
    }
    const response = await got(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PINATA_TOKEN}`,
        },
        body: data,
      },
    ).on("uploadProgress", (progress) => {
      console.log(progress);
    });
    const responseJson = JSON.parse(response.body);
    if (response.statusCode !== 200 || !responseJson.IpfsHash) {
      throw Error("Could not get IpfsHash from pinata");
    }
    console.log(responseJson.IpfsHash);
  } catch (error) {
    console.error(error);
  }
};

pinDirectoryToPinata();
