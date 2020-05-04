import * as express from 'express';
import * as bodyParser from "body-parser";
import { Request, Response } from 'express';
import * as path from "path";

const app = express();

const {
  PORT = 3000,
} = process.env;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

console.log( path.join( __dirname, "views" ));
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// app.get('/', (req: Request, res: Response) => {
//     res.send({
//         message: 'hello world',
//     });
// });

app.get('/', (req: Request, res: Response) => {
    res.render("index");
});


if (require.main === module) { // true if file is executed
    app.listen(PORT, () => {
        console.log('server started at http://localhost:'+PORT);
    });
}
export default app;
