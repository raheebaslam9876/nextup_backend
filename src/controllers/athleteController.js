const athlete = require("../models/athlete.Modal")
const nftModal = require("../models/nft.Modal")
const token = require("../models/token.Modal")
const bcrypt = require("bcryptjs")
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
            const _id = req.body.id;
            const name = req.body.name;
            const email = req.body.email;
            const updateProfile = await athlete.findByIdAndUpdate({ _id: _id }, { $set: { name: name, email: email } });
            if (!updateProfile) {
                return res.status(400).send("Athlete not found");
            }
            else {
                res.status(201).send({ success: true, msg: "Profile updated Successfully" })
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
