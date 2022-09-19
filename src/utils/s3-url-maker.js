var aws = require('aws-sdk')


const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KE,
  region: process.env.S3_REGION
})

// *************************************************************************
module.exports = {
  get_s3_url: async (req, res) => {
    const randomID = parseInt(Math.random() * 10000000)
    const Key = `posts/${req.user_folder_path}/${randomID}S3file-${req.body.name}`;
    const s3Params = {
      Bucket: process.env.s3_BUCKET_NAME,
      Key,
      Expires: 10000,
      ContentType: req.body.ContentType,
    }
    s3.getSignedUrlPromise('putObject', s3Params).then(data => {
      return res.status(200).json({
        Key,
        url: data
      });
    }).catch(error => {
      return res.status(400).json({
        error: error.message
      });
    })
  },

}