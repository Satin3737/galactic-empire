import sassComp from 'sass';
import gulpSass from  'gulp-sass';
import rename from  'gulp-rename';
import cleanCss from 'gulp-clean-css'
import webpCss from 'gulp-webpcss'
import autoprefixer from 'gulp-autoprefixer'
import groupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(sassComp);

export const scss = () => {
    return app.gulp.src(app.path.src.scss, {sourcemaps: app.isDev})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'SCSS',
                message: 'Error <%= error.message %>'
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(groupCssMediaQueries()
        )
        .pipe(webpCss({
                webpClass: '.webp',
                noWebpClass: '.no-webp'
            })
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 versions"],
                    cascade: true
                })
            )
        )

        // if need expanded css file
        //.pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}