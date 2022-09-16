const axios = require("axios");
const https = require("https");

const main = async () => {
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  try {
    const res = await instance.post(
      `https://${process.env.VMANAGE}:${process.env.PORT}/j_security_check`,
      new URLSearchParams({
        j_username: process.env.J_USERNAME, //gave the values directly for testing
        j_password: process.env.J_PASSWORD,
      })
    );
    const cookie = res.headers["set-cookie"][0].split(";")[0];

    console.log("RES: ");
    const res2 = await instance.get(
      `https://${process.env.VMANAGE}/dataservice/client/token`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    process.env["X-XSRF-TOKEN"] = res.data;
    console.log("RES2: ", res2.data);
  } catch (err) {
    console.log("ERR: ", err);
  }
};

module.exports = main;
