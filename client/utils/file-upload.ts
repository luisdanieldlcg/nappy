import { Result, Unit } from "true-myth";

const MAX_SIZE_IN_MB = 5;

const bytesToMb = (bytes: number) => {
  return bytes / 1000 / 1000;
};

export const isValidImage = async (
  file: File
): Promise<Result<Unit, string>> => {
  if (bytesToMb(file.size) >= MAX_SIZE_IN_MB) {
    return Result.err(
      " Your image exceeds our limit of 5MB. Please try another one. "
    );
  }
  const validTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (!validTypes.includes(file.type)) {
    return Result.err(
      "This file type is not supported. Please try another one. "
    );
  }
  try {
    const image = new Image();
    const promise = new Promise<Result<Unit, string>>((resolve, reject) => {
      image.addEventListener("load", () => {
        resolve(Result.ok());
      });
      image.addEventListener("error", () => {
        reject(
          Result.err("This file is not an image. Please try another one.")
        );
      });
    });
    // Check if the file is displayable as an image
    // For now this should be enough, but in the future we might want to further check
    // the actual image content
    const url = URL.createObjectURL(file);
    image.src = url;
    return await promise;
  } catch (error) {
    const result = error as Result<Unit, string>;
    if (result.isErr) {
      return Result.err(result.error);
    }
    return Result.ok();
  }
};
