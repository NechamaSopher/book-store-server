import Book from '../models/book';

import * as  _ from 'lodash';

class BookCtrl {

  static async one(ctx) {
    try {      
      const id = _.get(ctx, 'params.id');
      
      const book = await Book.one(id);

      ctx.body = book;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async list(ctx) {
    try {
      const books = await Book.list();

      ctx.body = books;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async create(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const data = _.get(ctx, 'request.body', {});

      const bookData = {
        createdBy: user.id,
        ...data
      }

      const book = await Book.create(bookData);

      ctx.body = book;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async update(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const { id } = _.get(ctx, 'request.params', {});
      const data = _.get(ctx, 'request.body', {});
      
      const book = await Book.update(id, user.id, data);

      ctx.body = book;
    } catch (err) {
      console.log('err', err);
      
      ctx.body = err;
      ctx.status = 500;
    }
  }

  static async delete(ctx) {
    try {
      const user = _.get(ctx, 'state.user', {});
      const { id } = _.get(ctx, 'request.params', {});
      
      const book = await Book.delete(id, user.id);

      ctx.body = book;
    } catch (err) {
      ctx.body = err;
      ctx.status = 500;
    }
  }
}

export default BookCtrl;
