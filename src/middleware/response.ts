import * as  _ from 'lodash' ;

const response = async (ctx, next) => {
  await next();

  const wasError = !ctx.status.toString().startsWith('2');

  wasError && console.error(ctx.body);

  ctx.body = {
    statusCode: ctx.status,
    errorMessage: wasError ? _.get(ctx.body, 'message', ctx.body || 'Unknown error') : null,
    data: wasError ? null : ctx.body
  };
}

module.exports = response;
