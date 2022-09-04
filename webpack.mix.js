let mix = require('laravel-mix')

mix.setPublicPath('./')
    .sass('assets/scss/popup.scss',"prod/css")
    .options({
        processCssUrls:false
    })