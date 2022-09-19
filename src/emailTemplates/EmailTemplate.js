module.exports = {
    resetPasswordUser: async (payLoad) => {
        console.log("payLoad", payLoad)
        return (`
       <p>Your reset email password otp is : ${payLoad.otp} or click to link <a href="${process.env.REACT_APP_URL_USER}/auth/reset-password/${payLoad.otp}?email=${payLoad.email}">Link</a></p>
       `)
    },
    resetPasswordAdmin: async (payLoad) => {
        console.log("payLoad", payLoad)
        return (`
       <p>Your reset email password otp is : ${payLoad.otp} or click to link <a href="${process.env.REACT_APP_URL_ADMIN}/reset-password/${payLoad.email}/${payLoad.otp}">Link</a></p>
       `)
    },
    verifyAccountUser: async (payLoad) => {
        console.log("payLoad", payLoad)
        return (`
       <p>Your account verification link : ${payLoad.otp} or click to link <a href="${process.env.REACT_APP_URL_USER}/auth/verify-account/${payLoad.otp}?email=${payLoad.email}">Link</a></p>
       `)
    },
    verifyAccountAdmin: async (payLoad) => {
        console.log("payLoad", payLoad)
        return (`
       <p>Your account verification link : ${payLoad.otp} or click to link <a href="${process.env.REACT_APP_URL_ADMIN}/verify-account/${payLoad.email}/${payLoad.otp}">Link</a></p>
       `)
    },
    testHtmlEmail: async (payLoad) => {
        return (`
       <p>Test email which show email is working fine.</p>
       `)
    },
}