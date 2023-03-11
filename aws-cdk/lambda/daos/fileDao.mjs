import { environment } from '../common/environment.mjs';
import { DeleteObjectCommand, DeleteObjectsCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../common/clients.mjs';

class FileDao {
  async deleteFile (s3ObjectKey) {
    return s3Client.send(new DeleteObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    }));
  }

  async deleteDirectory (s3ObjectKey) {
    const listObjectsCommand = new ListObjectsCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Prefix: s3ObjectKey,
    });
    const listObjectsResponse = await s3Client.send(listObjectsCommand);
    const Objects = listObjectsResponse.Contents?.map(({ Key }) => ({ Key }));
    if (!Objects) return;
    const deleteObjectsCommand = new DeleteObjectsCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Delete: { Objects },
    });
    return s3Client.send(deleteObjectsCommand);
  }
}

const fileDao = new FileDao();

export { FileDao, fileDao };
