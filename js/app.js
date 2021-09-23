(function(app){
    'use strict';

    function startImageTransition(){
        var images = document.getElementsByClassName("screenshots");

        for (var i = 0; i < images.length; ++i) {
            images[i].style.opacity = 1;
        }

        var cur = images.length - 1;

        setInterval(changeImage, 5000);

        async function changeImage() {

            var nextImage = (1 + cur) % images.length;

            images[cur].style.zIndex = 3;
            images[nextImage].style.zIndex = 2;

            await transition();

            images[cur].style.zIndex = 0;

            images[nextImage].style.zIndex = 3;

            images[cur].style.opacity = 1;
            
            cur = nextImage;

        }

        function transition() {
            return new Promise(function(resolve, reject) {
                var del = 0.01;

                var id = setInterval(changeOpacity, 10);

                function changeOpacity() {
                    images[cur].style.opacity -= del;
                    if (images[cur].style.opacity <= 0) {
                        clearInterval(id);
                        resolve();
                    }
                }

            })
        }
    }

    function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
        return 'Android';
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
    }

    return "unknown";
}

    function hidePlatformBadges(){
        let os = getMobileOperatingSystem();
        console.log(os);
        if(os === 'Android'){
            document.getElementById('apple-badge').classList.add('hidden')
        }else if (os === 'iOS'){
            document.getElementById('google-badge').classList.add('hidden')
        }
    }

    app.homePageStartUp = function() {
        hidePlatformBadges();

        startImageTransition();
    }

    app.legalPageStartUp = function(){
        hidePlatformBadges();
    }
}) (window.app = window.app || {});