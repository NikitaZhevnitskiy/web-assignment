// const host = process.env.DOCKER_DB || "localhost"
module.exports = {
    mongoURI:`mongodb://${process.env.DOCKER_DB_HOST}/todo-list`
};
