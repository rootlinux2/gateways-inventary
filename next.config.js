const { PHASE_PRODUCTION_BUILD } = require("next/constants");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  // const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  //   const isProd =
  // phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // when `next build` or `npm run build` is used
  //   const isStaging =
  // phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  // console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`); http://demo.billshark.net

  const env = {
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_URL: process.env.DB_URL,
  };

  return {
    env,
  };
};
