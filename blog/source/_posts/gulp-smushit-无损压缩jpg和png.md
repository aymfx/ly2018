---
title: gulp-smushit--无损压缩jpg和png
date: 2016-08-15
tags: gulp
---
``` bash
var gulp = require('gulp');
var smushit = require('gulp-smushit');
    
gulp.task('img1', function () {
    return gulp.src('images/*.png')
        .pipe(smushit({
            verbose: true
        }))
        .pipe(gulp.dest('smushit-dist'));
});
```
