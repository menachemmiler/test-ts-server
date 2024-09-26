import fs from "fs/promises";

export const getFileData = async <T>(resource: string): Promise<T[] | void> => {
  try {
    const strData: string = await fs.readFile(
      `${__dirname}/../../data/${resource}.json`,
      "utf-8"
    );
    const parseJson: T[] = JSON.parse(strData);
    if(!parseJson) {
      return [] as T[];
    }
    return parseJson;
  } catch (err) {
    console.log(err);
  }
};

export const saveFileData = async <T>(
  resource: string,
  data: T[]
): Promise<boolean> => {
  try {
    const strData: string = JSON.stringify(data);
    await fs.writeFile(`${__dirname}/../../data/${resource}.json`, strData, "utf-8");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
