const athlete = require("../models/athlete.Modal")
const nftModal = require("../models/nft.Modal")
const token = require("../models/token.Modal")
const bcrypt = require("bcryptjs")
const GlobalPackages = require('../global-package');
module.exports = {
    createNFT: async (req, res) => {
        const { name, price, description, image } = req.body;
        if (!name || !price || !description || !image) {
            throw new Error("Please provide values")
        }
        const NFT = await nftModal.create({ name, price, description, image });
        res.sendStatus(StatusCodes.CREATED).json(
            {
                NFT:
                {
                    name: nftModal.name,
                    price: nftModal.price,
                    description: nftModal.description,
                    image: nftModal.image
                }
            })

    },
    login: async (req, res) => {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const athleteEmail = await athlete.findOne({ email: email });
            const passwordMatch = await bcrypt.compare(password, athleteEmail.password);
            console.log("passwordMatch", passwordMatch);
            if (passwordMatch) {
                const token = await athleteEmail.createJWTToken();
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 300000),
                    httpOnly: true
                });
                console.log(token)
                res.status(201).send("index")
            }
            else {
                res.send("Invalid Login Details....")
            }
        } catch (error) {
            console.log(error)
            res.status(400).send("Invalid Credentials..");
        }
    },
    UpdateProfile: async (req, res) => {
        try {
            const _id = req.body._id;
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const DOB = req.body.DOB;
            const tokenName = req.body.tokenName;
            const college = req.body.college;
            const sport = req.body.sport;
            const nationality = req.body.nationality;
            const about = req.body.about;
            const image = req.body.image;
            const NFT = req.body.NFT;
            const athleteUpdate = await athlete.findByIdAndUpdate({ _id: _id }, { name: name, email: email, password: password, DOB: DOB, tokenName: tokenName, college: college, sport: sport, nationality: nationality, about: about, image: image, NFT: NFT });
            if (!athleteUpdate) {
                return res.status(400).send(deleteAthlete);
            }
            else {
                res.status(201).send({ success: true, msg: "Profile updated Successfully" })
            }
        } catch (error) {
            res.send(error)
        }
    },
    changePassword: async (req, res) => {
        try {
            const _id = req.body.id;
            const password = req.body.password;
            const salt = await GlobalPackages.bcrypt.genSalt(10);
            let newPassword = await GlobalPackages.bcrypt.hash(password, salt);
            const athleteExist = await athlete.findByIdAndUpdate({ _id: _id }, { $set: { password: newPassword } });
            if (athleteExist) {
                res.status(201).send({ success: true, msg: "Password changed Successfully" });
            }
            else {
                res.status(400).send("Profile does not Exists");
            }
        } catch (error) {
            res.send(error)
        }
    },

    viewToken: async (req, res) => {
        try {
            const tokenData = await token.find();
            res.send(tokenData);
        } catch (error) {
            res.send(error);
        }
    },
    viewNFT: async (req, res) => {
        try {
            const findNFT = await nftModal.find();
            res.send(findNFT)
        } catch (e) {
            res.send(e)
        }
    },
}
