let mix = require('laravel-mix')

mix.setPublicPath('./')
    .sass('assets/scss/popup.scss',"dist/css")
    .options({
        processCssUrls:false
    })