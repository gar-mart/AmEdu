/// <binding Clean='build-all' ProjectOpened='watch-solution' />
"use strict";

var gulp = require("gulp"),
    exec = require('child_process').exec,
    glob = require("glob"),
    msbuild = require("gulp-msbuild");

gulp.task('project', function (cb) {
    exec('Tools\\ProjectCleanup.exe /r /omit-xml-declaration-csproj', function (err, stdout, stderr) {
        cb(err);
    });
});

gulp.task('update-icad-localdb', function (cb) {
    return gulp.src("./Databases/Database/Database.sqlproj")
        .pipe(msbuild({
            targets: ['Build', 'Deploy'],
            toolsVersion: 'auto',
            stdout: true,
        }));
});

// Rerun the task when a file changes 
gulp.task('watch-solution', function () {
    gulp.watch(glob.sync('**/*.+(csproj|sqlproj)'), gulp.parallel('project'));
});

