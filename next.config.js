const withPlugins = require('next-compose-plugins');
const dotenv = require('dotenv');
const isDev = process.env.NODE_ENV === 'development';
console.log('env', );

const nextConfig = {
  // .env 값 세팅
  env: dotenv.config(`./env/.env.${isDev ? 'dev' : 'prod'}`).parsed || {},

  // 웹팩 설정
  webpack: (config, options) => {
    const originalEntry = config.entry;
    config.plugins = config.plugins || [];

    // devtool 설정
    // if (options.dev) {
    //   config.devtool = 'inline-source-map';
    // }

    // dotenv 에 대한 'Module not found: Can't resolve 'fs' 에러 방지
    if (!options.isServer) {
      config.node = {
        fs: 'empty',
      };
    }

    // 개발모드인지 여부 true/false
    // console.log('is development mod?:', options.dev);

    // 기본 플러그인 어떤것을 로드하는지 확인
    // config.plugins.map(data => {
    //   console.log('config name:', data.constructor.name);
    // })

    // 옵션정보 확인
    // console.log('options:', options);

    // entry 설정
    config.entry = async () => {
      const entries = await originalEntry();

      return entries;
    };

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
