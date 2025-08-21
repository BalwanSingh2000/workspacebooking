import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_S3_BUCKET:", process.env.AWS_S3_BUCKET);

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

// Upload file to S3
export async function uploadFileToS3(file: Buffer, fileName: string, fileType: string) {
  const uniqueFileName = `${uuidv4()}-${fileName}`;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET!,
    Key: uniqueFileName,
    Body: file,
    ContentType: fileType,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  // Return the S3 file URL
  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`;
}
