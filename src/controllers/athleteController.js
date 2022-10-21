const athlete = require("../models/athlete.Modal")
const nftModal = require("../models/nft.Modal")

const createNFT = async (req, res) => {
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

}
module.exports = { createNFT }