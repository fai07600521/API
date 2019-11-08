const MongoClient = require("mongodb").MongoClient;
const url = 'mongodb+srv://ping-user_00:65e5e8jyYmKo7Flk@guru-farm-cluster-jllnm.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = "guru";
class MongodbConnect {
    constructor() {
        this.db = undefined;
    }

    connection() {
        try {
            const client = MongoClient.connect(url, {useNewUrlParser: true } );
            // this.db = client.db(dbName);
            console.log("db is", client);
            return client;
            // console.log("db is", this.db)
        } catch (error) {
            console.log("connection error", error)
        }
    }

    async getresultbyID(collection, condition) {
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName);
            const result = await db.collection(collection).find(condition).toArray();
            client.close();
            return result;
        } catch (error) {
            console.log("get id error", error)
        }
    }

    async getallresult(collection) {
        const client = new MongoClient(url, { useNewUrlParser: true });
        await client.connect();
        const db = client.db(dbName);
        const result = await db.collection(collection).find().toArray();
        client.close()
        return result;
    }

     async postResult(collection, doc) {
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName);
            const result = await db.collection(collection).insertOne(doc); 
            client.close()
            return result
        } catch (error) {
            console.log("post result error", error)
        }

    }
    async updateResult(condition, collection, doc) {
        try {
            const client = await MongoClient.connect(url);
            const db = await client.db(dbName)
             db.collection(collection).updateOne(condition, { $set: doc }, {upsert: true}, function (err, res) {
                client.close();
            });
        } catch (error) {
            console.log("update result error", error)
        }
    }

    async deleteResult(collection, id) {
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName)
            
            await db.collection(collection).deleteOne({id})
           
            client.close()
        } catch (error) {
            console.log("delete result error", error)
        }

    }

   

    async count(collection) {
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName);
            const result = db.collection(collection).countDocuments();
            client.close()
            return result;
        } catch (error) {
            console.log("count error", error)
        }

    }
}

module.exports = MongodbConnect;
