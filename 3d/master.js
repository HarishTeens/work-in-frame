(function () {
    const getGeneratedPageURL = ({ html, css, js }) => {
        const getBlobURL = (code, type) => {
            const blob = new Blob([code], { type })
            return URL.createObjectURL(blob)
        }

        const cssURL = getBlobURL(css, 'text/css')
        const jsURL = getBlobURL(js, 'text/javascript')

        const source = `
          <html>
            <head>
              ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
    
            </head>
            <body>
              ${html || ''}
              ${js && `<script src="${jsURL}"></script>`}
            </body>
          </html>
        `

        return getBlobURL(source, 'text/html')
    }

    const html = `<div id="drag-container">
    <div id="spin-container" style="width: 120px; height: 170px; animation: 60s linear 0s infinite normal none running spinRevert;">
    <video controls autoplay loop muted>
      <source src="https://workinframe.com/videos/portfolio/1.mp4" type="video/mp4">
    </video>
    <img src="https://workinframe.com/videos/portfolio/2.gif"/>
    <video controls autoplay loop muted>
      <source src="https://workinframe.com/videos/portfolio/3.mp4" type="video/mp4">
    </video>
    <video controls autoplay loop muted>
      <source src="https://workinframe.com/videos/portfolio/4.mp4" type="video/mp4">
    </video>
    <video controls autoplay loop muted>
      <source src="https://workinframe.com/videos/portfolio/5.mp4" type="video/mp4">
    </video>
    <video controls autoplay loop muted>
      <source src="https://workinframe.com/videos/portfolio/6.mp4" type="video/mp4">
    </video>
    <video controls autoplay loop muted>
      <source src="https://workinframe.com/videos/portfolio/7.mp4" type="video/mp4">
    </video>
    
    <!-- Text at center of ground -->
    <p>Our Portfolio</p>
    </div>
    <div id="ground" style="width: 720px; height: 720px;"></div>
    </div>`

    const css = `* {
        margin: 0;
        padding: 0;
        }
        
        html,
        body {
        height: 100%;
        /* for touch screen */
        touch-action: none;
        }
        
        body {
        overflow: hidden;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background: #111;
        -webkit-perspective: 1000px;
        perspective: 1000px;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        }
        
        #drag-container,
        #spin-container {
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        margin: auto;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-transform: rotateX(-10deg);
        transform: rotateX(-10deg);
        }
        
        #drag-container img,
        #drag-container video {
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        line-height: 200px;
        font-size: 50px;
        text-align: center;
        -webkit-box-shadow: 0 0 8px #fff;
        box-shadow: 0 0 8px #fff;
        -webkit-box-reflect: below 10px
            linear-gradient(transparent, transparent, #0005);
        }
        
        #drag-container img:hover,
        #drag-container video:hover {
        -webkit-box-shadow: 0 0 15px #fffd;
        box-shadow: 0 0 15px #fffd;
        -webkit-box-reflect: below 10px
            linear-gradient(transparent, transparent, #0007);
        }
        
        #drag-container p {
        font-family: Serif;
        position: absolute;
        top: 100%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%) rotateX(90deg);
        transform: translate(-50%, -50%) rotateX(90deg);
        color: #fff;
        }
        
        #ground {
        width: 900px;
        height: 900px;
        position: absolute;
        top: 100%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%) rotateX(90deg);
        transform: translate(-50%, -50%) rotateX(90deg);
        background: -webkit-radial-gradient(
            center center,
            farthest-side,
            #9993,
            transparent
        );
        }
        
        #music-container {
        position: absolute;
        top: 0;
        left: 0;
        }
        
        @-webkit-keyframes spin {
        from {
            -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
        }
        to {
            -webkit-transform: rotateY(360deg);
            transform: rotateY(360deg);
        }
        }
        
        @keyframes spin {
        from {
            -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
        }
        to {
            -webkit-transform: rotateY(360deg);
            transform: rotateY(360deg);
        }
        }
        @-webkit-keyframes spinRevert {
        from {
            -webkit-transform: rotateY(360deg);
            transform: rotateY(360deg);
        }
        to {
            -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
        }
        }
        @keyframes spinRevert {
        from {
            -webkit-transform: rotateY(360deg);
            transform: rotateY(360deg);
        }
        to {
            -webkit-transform: rotateY(0deg);
            transform: rotateY(0deg);
        }
        }`

    const js = `
    var radius = 240; // how big of the radius
    var autoRotate = true; // auto rotate or not
    var rotateSpeed = -60; // unit: seconds/360 degrees
    var imgWidth = 180; // width of images (unit: px)
    var imgHeight = 100; // height of images (unit: px)
    
    // ===================== start =======================
    setTimeout(init, 100);
    
    var odrag = document.getElementById("drag-container");
    var ospin = document.getElementById("spin-container");
    var aImg = ospin.getElementsByTagName("img");
    var aVid = ospin.getElementsByTagName("video");
    var aEle = [...aImg, ...aVid]; // combine 2 arrays
    
    // Size of images
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";
    
    // Size of ground - depend on radius
    var ground = document.getElementById("ground");
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";
    
    function init(delayTime) {
        for (var i = 0; i < aEle.length; i++) {
            aEle[i].style.transform =
                "rotateY(" +
                i * (360 / aEle.length) +
                "deg) translateZ(" +
                radius +
                "px)";
            aEle[i].style.transition = "transform 1s";
            aEle[i].style.transitionDelay =
                delayTime || (aEle.length - i) / 4 + "s";
        }
    }
    
    function applyTranform(obj) {
        // Constrain the angle of camera (between 0 and 180)
        if (tY > 180) tY = 180;
        if (tY < 0) tY = 0;
    
        // Apply the angle
        obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
    }
    
    function playSpin(yes) {
        ospin.style.animationPlayState = yes ? "running" : "paused";
    }
    
    var sX,
        sY,
        nX,
        nY,
        desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;
    
    // setup events
    document.onpointerdown = function (e) {
        clearInterval(odrag.timer);
        e = e || window.event;
        var sX = e.clientX,
            sY = e.clientY;
    
        this.onpointermove = function (e) {
            e = e || window.event;
            var nX = e.clientX,
                nY = e.clientY;
            desX = nX - sX;
            desY = nY - sY;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            sX = nX;
            sY = nY;
        };
    
        this.onpointerup = function (e) {
            odrag.timer = setInterval(function () {
                desX *= 0.95;
                desY *= 0.95;
                tX += desX * 0.1;
                tY += desY * 0.1;
                applyTranform(odrag);
                playSpin(false);
                if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                    clearInterval(odrag.timer);
                    playSpin(true);
                }
            }, 17);
            this.onpointermove = this.onpointerup = null;
        };
    
        return false;
    };
    
    document.onmousewheel = function (e) {
        e = e || window.event;
        var d = e.wheelDelta / 20 || -e.detail;
        radius += d;
        init(1);
    };`

    const url = getGeneratedPageURL({
        html,
        css,
        js
    })

    console.log('url: ', url);
    const div3d = document.getElementsByClassName("3d-content")[0];
    const ifram = document.createElement("iframe");
    ifram.src = url;
    ifram.height = "600";
    ifram.width = "1200";
    div3d.appendChild(ifram);
    // const ifram = document.getElementById("3d-iframe");
    // ifram.src = url;
})()