const aws = require("aws-sdk")
const dotenv = require("dotenv")
dotenv.config()

const region = "us-west-2"
const bucketName = "jins-test-aws-bucket-react"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_ACCESS_KEY_SECRET

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

async function generateUploadURL() {
  const imageName = Date.now().toString()

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  return uploadURL
}

module.exports = generateUploadURL
