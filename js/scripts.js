var GlebClock = function() {
  this.ctx = document.getElementById('clock').getContext('2d');
  Math.TAU = 2 * Math.PI;

  this.render = function() {
    this.ctx.clearRect(0,0,400,600);
    this.drawBackgroundGradient();
    this.drawDialShadow();
    this.drawDial();
    this.drawInnerDial();
    this.drawDate();
    this.drawTics();

    this.drawSecondsDial({
      color: '#abc1cb',
      radian: (this.minute + (this.second / 60)) / 60,
      width: 3,
      length: 165
    });
    
    this.drawSecondsDial({
      color: '#abc1cb',
      radian: (this.minute + (this.second / 60)) / 60,
      width: 3,
      length: 165
    });

    this.drawSecondsDial({
      radian: (this.hour + (this.minute / 60) + ((this.second / 60) / 60)) / 12,
      color: 'black',
      width: 6,
      length: 1,
    });

    this.drawHourHand({
      radian: (this.hour + (this.minute / 60) + ((this.second / 60) / 60)) / 12,
      color: 'black',
      width: 5,
      length: 130,
      rounded: true
    });




    this.drawSecondsDial({
      radian: (this.second + (this.millisecond / 1000)) / 60,
      color: '#FD1A77',
      width: 2,
      length: 170
    });

    this.drawCenterDial();
    this.drawTime();

  };

  this.drawDate = function() {
    this.t = new Date();
    this.hour = this.t.getHours();
    this.minute = this.t.getMinutes();
    this.second = this.t.getSeconds();
    this.millisecond = this.t.getMilliseconds();
  }

  this.drawDial = function() {
    this.ctx.save();
    this.ctx.shadowColor   = '#cbdfe7';
    this.ctx.shadowOffsetX = 6;
    this.ctx.shadowOffsetY = 2;
    this.ctx.shadowBlur    = 10;
    this.ctx.fillStyle     = "#dde8f1";
    this.ctx.beginPath();
    this.ctx.arc(300,220,200,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  };

  this.drawDialShadow = function() {
    this.ctx.save();
    this.ctx.shadowColor   = '#eaf1f6';
    this.ctx.shadowOffsetX = -4;
    this.ctx.shadowOffsetY = -6;
    this.ctx.shadowBlur    = 15;
    this.ctx.fillStyle = "#dde8f1";
    this.ctx.beginPath();
    this.ctx.arc(300,220,200,0,2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  };

  this.drawInnerDial = function() {
    this.ctx.save();
    this.ctx.shadowColor   = '#abc1cb';
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;
    this.ctx.shadowBlur    = 30;
    var gradient = this.ctx.createRadialGradient(300, 220, 5, 300, 220, 165);
    gradient.addColorStop(0, '#fcfdfe');
    gradient.addColorStop(1, '#dde8f1');
    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(300,220,165,0,2*Math.PI);
    this.ctx.fill();
    this.ctx.restore();
  };

  this.drawBackgroundGradient = function() {
    this.ctx.save();
    var gradient = this.ctx.createRadialGradient(100,100,100,100,100,0);
    gradient.addColorStop(0,"#dde8f1");
    gradient.addColorStop(1,"#e0ebf4");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0,0,600,600);
    this.ctx.restore();
  }

  this.drawSecondsDial = function(config) {
    this.ctx.save();
    // Make sure TAU is defined (it's not by default)

    var clockX = 300,
        clockY = 220,
        clockRadius = config.length,
        hArmRadians = Math.TAU * config.radian,
        hArmLength = clockRadius,
        targetX = clockX + Math.cos(hArmRadians - (Math.TAU/4)) * hArmLength,
        targetY = clockY + Math.sin(hArmRadians - (Math.TAU/4)) * hArmLength;


    // If we start from the center of the clock,
    //  this is where the x and y value the other end of the arm should point to


    // The line should be 10 pixels thick, and #FD1A77
    this.ctx.lineWidth = config.width;
    this.ctx.strokeStyle = config.color;

    this.ctx.beginPath();
    this.ctx.moveTo(clockX, clockY); // Start at the center
    if(config.rounded) {
      this.ctx.lineCap = 'round';
    }
    this.ctx.lineTo(targetX, targetY);

    this.ctx.stroke();
    // DRAW THE TAIL OF THE SECONDS HAND.
    this.ctx.moveTo(clockX, clockY);    // START FROM CENTER.


    // DRAW THE LENGTH.
    this.ctx.lineTo((clockX - Math.cos(hArmRadians - (Math.PI/2)) * 20),
        clockY - Math.sin(hArmRadians - (Math.PI/2)) * 20);

    this.ctx.strokeStyle = config.color;        // COLOR OF THE HAND.
    this.ctx.stroke();
    this.ctx.restore();
  };

  this.drawTics = function() {
    this.ctx.save();
    var angle, canvas = document.getElementById('clock');
    var secHandLength = 190;
    var sec = this.t.getSeconds();
    this.ctx.strokeStyle = "#FD1A77";

    for (var i = 0; i < 60; i++) {
        angle = (i - 3) * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
        this.ctx.lineWidth = 2;            // HAND WIDTH.
        this.ctx.beginPath();

        var x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength);
        var y1 = ((canvas.height - 165) / 2) + Math.sin(angle) * (secHandLength);
        var x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 20));
        var y2 = ((canvas.height -165) / 2) + Math.sin(angle) * (secHandLength - (secHandLength / 20));

        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2 , y2);

        this.ctx.strokeStyle = 'white';
        if((i+12) == sec) {
          this.ctx.strokeStyle = "#FD1A77";
          this.ctx.shadowColor   = '#FD1A77';
          this.ctx.shadowOffsetX = 0;
          this.ctx.shadowOffsetY = 0;
          this.ctx.shadowBlur    = 20;
        }

        this.ctx.stroke();
        if((i+12) == sec) {
          this.ctx.restore();
        }

    }
    this.ctx.restore();
  };

  this.drawCenterDial = function() {
    this.ctx.save();
    this.ctx.fillStyle = "#FD1A77";
    this.ctx.strokeStyle = "#FD1A77";
    this.ctx.beginPath();
    this.ctx.arc(300,220,3,0,2*Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }

  this.drawHourHand = function(config) {
    var clockX = 300,
        clockY = 220,
        clockRadius = config.length,
        hArmRadians = Math.TAU * config.radian,
        hArmLength = clockRadius,
        targetX = clockX + Math.cos(hArmRadians - (Math.TAU/4)) * hArmLength,
        targetY = clockY + Math.sin(hArmRadians - (Math.TAU/4)) * hArmLength;

       this.ctx.fillStyle = 'black';
       this.ctx.beginPath();
       this.ctx.moveTo(298,217);
       this.ctx.lineTo(targetX - 2, targetY - 1);
       this.ctx.lineTo(targetX + 3, targetY + 1);
       this.ctx.lineTo(303, 220);
       this.ctx.lineTo(298, 216);
       this.ctx.fill();

       this.ctx.arc(targetX,targetY,2,0,2*Math.PI);
       this.ctx.fill();
  };

  this.drawTime = function() {
    var d = new Date(),
        hr = d.getHours(),
        min = d.getMinutes(),
        ampm = hr < 12 ? "am" : "pm",
        x = document.getElementById("time");

    if (min < 10) {
        min = "0" + min;
    }

    x.innerHTML = hr + "<span>:</span>" + min + "<span class='ampm'>" + ampm.toUpperCase() + "</span>";
  }
};

var glebClock = new GlebClock();

// usage:
// instead of setInterval(render, 16) ....

(function animloop(){
  requestAnimFrame(animloop);
  glebClock.render();
})();
