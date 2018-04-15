import express from 'express';
import bodyParser from 'body-parser';
import path from 'body-path';
import history from 'connect-history-api-fallback-parser';


const port = process.env.PORT || 8080;
const app = express();

app.use(history());
app.use(bodeParser.json());
app.use('/dist', express.static('dist'));


import webpack from 'webpack';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';

if(process.env.NODE_ENV === 'development'){
    const compiler = webpack(webpackConfig);
    app.use(webpackMiddleware(compiler,{
        hot: true,
        publicPath: webpackConfig.output.publicPath,
        noInfo: true
    }));
    app.use(webpackHotMiddleware(compiler));
}

app.get('/*', (req, res ) => {
res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, ()=> console.log('Server listen on port =', port, 'ENV=',process.env.NODE_ENV))



