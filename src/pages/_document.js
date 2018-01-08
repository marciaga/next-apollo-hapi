import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import flush from 'styled-jsx/server';

export default class MyDocument extends Document {
    static getInitialProps({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props =>
            sheet.collectStyles(<App {...props} />)
        );
        const jsxStyles = flush();
        const styleTags = sheet.getStyleElement();

        return { ...page, styleTags, jsxStyles };
    }

    render() {
        return (
            <html>
                <Head>
                    <title>Next Apollo Example</title>
                    {this.props.styleTags}
                    {this.props.jsxStyles}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </html>
        )
    }
}
