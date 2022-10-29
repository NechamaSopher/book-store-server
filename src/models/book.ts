import { Model } from 'objection';

import * as  _ from 'lodash';

class Book extends Model {
  id: string;
  title: string;
  isbn: string;
  createdBy: string;
  storeId: string;
  active: boolean;
  price: number;
  availableQuantity: number;

  static get tableName() {
    return 'book';
  }

  toBody() {
    return {
      id: this.id,
      title: this.title,
      isbn: this.isbn,
      createdBy: this.createdBy,
      storeId: this.storeId,
      active: this.active,
      price: this.price,
      availableQuantity: this.availableQuantity
    };
  }

  static async one(id) {
    try {
      const book = await Book.query().where({ id }).first();
      return book.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to retrieve book');
    }
  }

  static async list() {
    try {
      const books = await Book.query().where({ active: true });
      
      return books.map(book => book.toBody());
    } catch (err) {
      console.error(err);
      throw new Error('Failed to get books');
    }
  }

  static async create(data) {
    try {
      const book = await Book.query().insertGraphAndFetch(data);
      return book.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to create book');
    }
  }

  static async update(id, userId, data) {
    try {
      const book = await Book.query().where({ createdBy: userId }).patchAndFetchById(id, data);
      return book.toBody();
    } catch (err) {
      console.error(err);
      throw new Error('Failed to update book');
    }
  }

  static async delete(id, userId) {
    try {
      const res = await Book.query().where({ createdBy: userId }).deleteById(id);
      return res;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to delete book');
    }
  }

}

export default Book;
