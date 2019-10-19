const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://Fafai321:Fafai321@gurufarm-cluster-ueygk.mongodb.net/test?retryWrites=true&w=majority";
// Database Name
const dbName = "gurufarm";

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
            console.log("get id error getresultbyID", error)
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
        try {
            console.log("get id error getallresult", error)
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName)
            const result = await db.collection(collection).find().toArray()
            client.close()
            return result;
        } catch (error) {
            console.log("get all result error", error)
        }
    }

    async updateResult(condition, collection, doc) {
        try {
            const client = await MongoClient.connect(url);
            const db = await client.db(dbName)
            const result = await db.collection(collection).updateOne(condition, { $set: doc }, {upsert: true}, function (err, res) {
                console.log("res",res);
                console.log("err",err);
                client.close();
            });
            console.log('result',result);
        } catch (error) {
            console.log("update result error", error)
        }
    }

    async deleteResult(collection, id) {
        // if(this.db){
        //     await this.db.collection(collection).deleteOne(id)
        //     this.db.close()
        // }else{
            console.log("iddd",{id},"collection",collection)
            
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName)
            
            await db.collection(collection).deleteOne({id})
           
            client.close()
        } catch (error) {
            console.log("delete result error", error)
        }

        // }
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

    async count(collection) {
        // if(this.db){
        //     const result =  this.db.collection(collection).count();
        //     this.db.close()
        //     return result;
        // }else{
        try {
            const client = await MongoClient.connect(url, {useNewUrlParser: true } );
            const db = await client.db(dbName);
            const result = db.collection(collection).countDocuments();
            client.close()
            return result;
        } catch (error) {
            console.log("count error", error)
        }

        // }
    }
}

module.exports = MongodbConnect;
