var fs = require('fs');
const path = require('path')

let unLinkFile = async (fileUrl) => {
    const filePath = path.join(__dirname, `../../${fileUrl}`);
    let result = await fs.unlinkSync(filePath); 
    return true
}
module.exports = unLinkFile;