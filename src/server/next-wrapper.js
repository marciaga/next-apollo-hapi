const { parse } = require('url');

const nextHandlerWrapper = (app) => {
    const handler = app.getRequestHandler();

    return async ({ raw, url }, h) => {
        const { req, res } = raw;

        await handler(req, res, url);

        return h.close;
    };
};

const defaultHandlerWrapper = app => async ({ raw: { req, res }, url }) => {
    const { pathname, query } = parse(url, true);
    return app.renderToHTML(req, res, pathname, query);
}

const pathWrapper = (app, pathName, opts) => async ({ raw, query, params }) =>
    app.renderToHTML(raw.req, raw.res, pathName, { ...query, ...params }, opts);

module.exports = { pathWrapper, defaultHandlerWrapper, nextHandlerWrapper };
