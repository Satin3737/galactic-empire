// main module
import gulp from 'gulp';

// path import
import {path} from "./gulp/config/path.js";

// plugins import
import {plugins} from "./gulp/config/plugins.js";

// make global variable
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// tasks import
import {copy} from "./gulp/tasks/copy.js";
import {reset} from "./gulp/tasks/reset.js";
import {html} from "./gulp/tasks/html.js";
import {server} from "./gulp/tasks/server.js";
import {scss} from "./gulp/tasks/scss.js";
import {js} from "./gulp/tasks/js.js";
import {images} from "./gulp/tasks/images.js";
import {otfToTtf, ttfToWoff, woff, fontsStyle} from "./gulp/tasks/fonts.js";
import {zip} from "./gulp/tasks/zip.js";

// create watcher
function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}

// task for fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, woff, fontsStyle);

// main tasks
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images)) ;

// create scenarios for tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);
const deployZIP = gulp.series(reset, mainTasks, zip);

//export scenarios
export {dev};
export {build};
export {deployZIP};

// start default task
gulp.task('default', dev);