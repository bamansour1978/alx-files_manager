import mongodb from 'mongodb';
import Collection from 'mongodb/lib/collection';
import envLoader from './env_loader';


class DBClient {
  /**
   * documentation
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * documentation
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * documentation
   */
  async nbUsers() {
    return this.client.db().collection('users').countDocuments();
  }

  /**
   * documentation
   */
  async nbFiles() {
    return this.client.db().collection('files').countDocuments();
  }

  /**
   * documentation
   */
  async usersCollection() {
    return this.client.db().collection('users');
  }

  /**
   * documentation
   */
  async filesCollection() {
    return this.client.db().collection('files');
  }
}

export const dbClient = new DBClient();
export default dbClient;
