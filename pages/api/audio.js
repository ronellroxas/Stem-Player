import aws from 'aws-sdk'
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function get_track(req, res) {
    await runMiddleware(req, res, cors);

    if (req.method === 'GET') {
        res.status(200).json('API route for fetching audio');
        return
    }

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