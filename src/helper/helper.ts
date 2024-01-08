import moment from "npm:moment-timezone";

export const imageUpload = async (ImageUpArray: any) => {
  try {
    const results: {
      success: boolean;
      path?: string;
      originalFilename?: string;
      newFilename?: string;
      message?: string;
    }[] = [];
    const timestamp = new Date().getTime();
    const randomString = generateRandomString(10);
    const uniqueFilename = `${timestamp}_${randomString}`;
    for (const { path, file } of ImageUpArray) {
      await Deno.mkdir(`.${path}`, { recursive: true });
      const getFileExtension = (filename: any) => {
        const lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex === -1) {
          return filename;
        }
        return filename.slice(lastDotIndex + 1).toLowerCase();
      };
      const isAllowedImageExtension = (extension: any) => {
        const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
        return allowedExtensions.includes(extension);
      };
      const fileExtension = getFileExtension(file.filename);
      if (!isAllowedImageExtension(fileExtension)) {
        console.log(
          `Invalid file type for ${file.filename}. Only JPG, JPEG, PNG, and GIF are allowed.`,
        );
        results.push({
          success: false,
          message: `Invalid file type for ${file.filename}`,
        });
      } else {
        const filePath = `${path}${uniqueFilename}.${fileExtension}`;
        const newFileName = `${uniqueFilename}.${fileExtension}`;
        // convert file to Unit8Array from file path
        const fileContent = await Deno.readFile(file.filename!);

        await Deno.writeFile(`.` + filePath, fileContent);
        console.log(`File uploaded successfully to: ${filePath}`);
        results.push({
          success: true,
          path: filePath,
          originalFilename: file.filename,
          newFilename: newFileName,
        });
      }
    }

    return results;
  } catch (error) {
    console.error("Error during image upload:", error);
    return [];
  }
};

// Function to format date in 'YYYY-MM-DD HH:mm:ss' format for a specific time zone
const convertDateTimeFormat = (date: any, timeZone: any) => {
  const originalFormat = "MM/DD/YYYY, HH:mm:ss";
  const inputDate = moment(date);

  // Set the time zone
  inputDate.tz(timeZone);

  // Format the date in the desired format
  const desiredFormat = "YYYY-MM-DD HH:mm:ss";
  const formattedDate = inputDate.format(desiredFormat);

  return formattedDate;
};

export const generateRandomString = (length: any) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

export const ReferralCodeGenerate = (length: any) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};
export const isValidDate = (dateString: string): boolean => {
  const regex = /^\d{2}-\d{2}-\d{4}$/;

  if (!regex.test(dateString)) {
    return false;
  }

  const currentDate = new Date();
  const inputDate = new Date(dateString);

  // Calculate age difference
  const ageDifference = currentDate.getFullYear() - inputDate.getFullYear();
  console.log(ageDifference);

  // Check if age is at least 18
  return ageDifference >= 18;
};

export const OldImageRemove = async (data: any, old_url: any) => {
  if (data && old_url) {
    const oldImagePath = `.${old_url}`;
    try {
      await Deno.remove(oldImagePath);
      console.log(`Old image removed: ${oldImagePath}`);
    } catch (error) {
      console.log(`Error removing old image: ${error}`);
    }
  }
};
