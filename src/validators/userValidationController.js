const yup = require("yup");
const globalServices = require('../services/global.services')
// *************************************************************************
module.exports = {
  create_account: async (req, res, next) => {
    yup.object({
      body: yup.object().shape({
        email: yup.string().required("Email is  required").email("Email is not valid."),
        password: yup.string().required("Password is required."),
        name: yup.string().required("Name is required."),
      }),
      // params: yup.object({
      // }),
      // query: yup.object({
      // }),
    }).validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }).then(data => {
      return next();
    }).catch(error => {
      globalServices.returnResponse(res, 403, true, "Validation error", error.errors)
    })
  },
  updatePasswordByLink: async (req, res, next) => {
    yup.object({
      body: yup.object().shape({
        email: yup.string().required("Email address is  required").email("Email is not valid."),
        otp: yup.string().required("Otp is  required"),
        password: yup.string().required("Password is  required").min(8, "Password length is to short"),
      }),
      // params: yup.object({
      // }),
      // query: yup.object({
      // }),
    }).validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }).then(data => {
      return next();
    }).catch(error => {
      globalServices.returnResponse(res, 403, true, "Validation error", error.errors)
    })
  },
  verifyOpt: async (req, res, next) => {
    yup.object({
      body: yup.object().shape({
        email: yup.string().required("Email address is  required").email("Email is not valid."),
        otp: yup.string().required("Otp is  required"),
      }),
      // params: yup.object({
      // }),
      // query: yup.object({
      // }),
    }).validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }).then(data => {
      return next();
    }).catch(error => {
      globalServices.returnResponse(res, 403, true, "Validation error", error.errors)
    })
  },
  resetPassword: async (req, res, next) => {
    yup.object({
      body: yup.object().shape({
        email: yup.string().required("Email address is  required").email("Email is not valid."),
      }),
      // params: yup.object({
      // }),
      // query: yup.object({
      // }),
    }).validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }).then(data => {
      return next();
    }).catch(error => {
      globalServices.returnResponse(res, 403, true, "Validation error", error.errors)
    })
  },
  login: async (req, res, next) => {
    yup.object({
      body: yup.object().shape({
        email: yup.string().required("Email address id is  required").email("Email is not valid."),
        password: yup.string().required("Password is required."),
      }),
      // params: yup.object({
      // }),
      // query: yup.object({
      // }),
    }).validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }).then(data => {
      return next();
    }).catch(error => {
      globalServices.returnResponse(res, 403, true, "Validation error", error.errors)
    })
  },
  donationDetails: async (req, res, next) => {
    yup.object({
      body: yup.object().shape({
        id: yup.string().required("Donation id is required"),
      }),
      // params: yup.object({
      // }),
      // query: yup.object({
      // }),
    }).validate({
      body: req.body,
      query: req.query,
      params: req.params,
    }, { abortEarly: false }).then(data => {
      return next();
    }).catch(error => {
      globalServices.returnResponse(res, 403, true, "Validation error", error.errors)
    })
  },
}