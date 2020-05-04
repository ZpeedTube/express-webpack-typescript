import * as shell from "shelljs";
console.log(Date().toString()); // Just to see when copy was done

// Copy all the view templates
shell.cp( "-R", "src/views", "dist/" );
// shell.cp( "-R", "src/public", "dist/" );

