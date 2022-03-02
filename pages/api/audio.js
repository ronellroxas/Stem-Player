import aws from 'aws-sdk'

export default async function get_track(req, res) {
    var stem_name = req.body;

    aws.config.update({
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
        region: process.env.REGION,
        signatureVersion: process.env.SIGN_VER
    });

    const s3 = new aws.S3();


    //get signed url of audio
    let params = {
        Bucket: process.env.BUCKET,
        Key: 'Donda 2/' + stem_name
    }

    s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) res.status(400).json({ err });
        else {
            res.status(200).json({ url });
        }
    });
}