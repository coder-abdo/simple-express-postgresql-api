import { post } from 'types/post.types';
import db from '../database/database';
export default class Post {
  async create(post: post): Promise<post> {
    try {
      const connection = await db.connect();
      const sql =
        'INSERT INTO posts(title, body, author) values($1, $2, $3) returning *';
      const result = await connection.query(sql, [
        post.title,
        post.body,
        post.author,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create ${post.title} : ${(error as Error).message}`
      );
    }
  }
  async getAllPosts(): Promise<post[]> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * from posts';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`unable to retrieve posts: ${(error as Error).message}`);
    }
  }
  async getPost(id: string): Promise<post> {
    try {
      const connection = await db.connect();
      const sql = 'SELECT * from posts WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to retrive post id: ${id} ${(error as Error).message}`
      );
    }
  }
  async updatePost(post: post): Promise<post> {
    try {
      const connection = await db.connect();
      const sql = `UPDATE posts
            SET title=$1,body=$2,author=$3
      WHERE id=($4)
      returning *`;
      const result = await connection.query(sql, [
        post.title,
        post.body,
        post.author,
        post.id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `couldn't update post: ${post.title} ${(error as Error).message}`
      );
    }
  }
  async deletePost(id: string): Promise<post> {
    try {
      const connection = await db.connect();
      const sql = `DELETE from posts
      WHERE id=($1)
      returning *`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `couldn't delete post id: ${id} ${(error as Error).message}`
      );
    }
  }
}
