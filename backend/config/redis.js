const redis = require('redis');

const redisClient = redis.createClient({
  url: `redis://default:dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB@redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com:12675`
});

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

redisClient.on('connect', () => {
  console.log('Redis connected');
});

const connectRedis = async () => {
  await redisClient.connect();
};

module.exports = { redisClient, connectRedis }; 