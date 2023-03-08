import { getSignedUrl as cloudfrontGetSignedUrl } from '@aws-sdk/cloudfront-signer';
import { getSignedUrl as s3GetSignedUrl } from '@aws-sdk/s3-request-presigner';
import { environment } from '../common/environment.js';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../common/clients.js';

class FileDao {
  async getFile (s3ObjectKey) {
    const url = `${environment.CLOUDFRONT_DISTRIBUTION_DOMAIN}/${s3ObjectKey}`;
    return cloudfrontGetSignedUrl({
      url,
      keyPairId: environment.CLOUDFRONT_KEY_PAIR_ID,
      privateKey: environment.CLOUDFRONT_PRIVATE_KEY,
      // expire in 1 hour
      dateLessThan: new Date(Date.now() + 60 * 60 * 1000),
    });
  }

  async putFile (s3ObjectKey) {
    const command = new PutObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    });
    return s3GetSignedUrl(s3Client, command, { expiresIn: 60 * 60 });
  }

  async deleteFile (s3ObjectKey) {
    return s3Client.send(new DeleteObjectCommand({
      Bucket: environment.API_S3_BUCKET_NAME,
      Key: s3ObjectKey,
    }));
  }
}

const fileDao = new FileDao();

export { FileDao, fileDao };
