(function($){
    
     $.fn.extend({ 
     imgHoverZoom: function(options){
     
       //get options
       var defaults={
       miniWidth: 400,
       displayWidth: 400,
       url: "null",
       coverColor: "white"
       };
     
     var options = $.extend(defaults, options);

     return this.each(function() {
     var obj=$(this);
     var callerid=obj.attr("id");
     var o=options;

    //add img to html,zoommini for the scaled-down version of the img,zoomdisplay shows origin size of image 
     var miniStr=$("<div id='"+callerid+"_zoommini'><img src=\""+o.url+"\" /></div>");
     var miniImgStyle={
           width:o.miniWidth,
           cursor:"move"
          };
     var zoomminiStyle={
       'position':'absolute'
         };
     var zoomdisplayStyle={
          display:"none"
          };
     var displayStr=$("<div id='"+callerid+"_zoomdisplay'><img src=\""+o.url+"\" /></div>");
     obj.append(miniStr);
     obj.append(displayStr);
     $("#"+callerid+"_zoommini>img").css(miniImgStyle);
     $("#"+callerid+"_zoomdisplay").css(zoomdisplayStyle);
     $("#"+callerid+"_zoommini").css(zoomminiStyle);
     
     
     var newImg = new Image();
     newImg.src=$("#"+callerid+"_zoommini>img").attr("src");
     $(newImg).load(function(){//after image is load
       //get naturalWidth and naturalHeight of img
       var oriWidth=this.width;
       var oriHeight=this.height; 
       //get the scaled-down size of img 
       var miniWidth=o.miniWidth;
       var miniHeight=oriHeight/oriWidth*miniWidth;
       //calculate the width and height of zoomdisplay
       var displayWidth=o.displayWidth;
       var displayHeight=oriHeight/oriWidth*displayWidth;
       $("#"+callerid+"_zoommini").mousemove(function(e){//when mouse move on zoommini,show zoomdisplay 
                var miniPos= $("#"+callerid+"_zoommini").offset();
                var minix=miniPos.left;
                var miniy=miniPos.top;
                var x=e.pageX-minix;
                var y=e.pageY-miniy;
                var times=oriWidth/miniWidth;   
                var parts=oriWidth/displayWidth;
                //calculate the width and height of the cover
                var coverWidth=miniWidth/parts;
                var coverHeight=miniHeight/parts;
                //when mouse is on the border of zoommini
                if((x>0)&&(x<(coverWidth/2)))
                  {x=coverWidth/2;}
                if((x<miniWidth)&&(x>(miniWidth-coverWidth/2)))
                  {x=miniWidth-coverWidth/2;}
                if((y>0)&&(y<(coverHeight/2)))
                  {y=coverHeight/2;}          
                if((y<miniHeight)&&(y>(miniHeight-coverHeight/2)))
                   {y=miniHeight-coverHeight/2;}     
                
                 var top=times*(y-coverHeight/2);        
                 var left=times*(x-coverWidth/2);        
                 var covertop=y-coverHeight/2;        
                 var coverleft=x-coverWidth/2;        
                 var displayleft=miniWidth+40;
                 var displayImgStyle={
                 'margin-top':-top,
                 'margin-left':-left
                 };
                 var coverStyle={
                 'position':'absolute',
                 'width':coverWidth,
                 'height':coverHeight,
                 'margin-top':covertop,
                 'margin-left':coverleft,
                 'background-color':o.coverColor,
                 'filter': 'alpha(opacity=40)',
                 '-moz-opacity':'0.4',
                 'opacity':'0.4',
                 'pointer-events':'none',
                 'z-index':'8'
                 };
                 var displayStyle={
                 'display':'block',
                 'position':'absolute',
                 'overflow':"hidden",
                 'width':displayWidth,
                 'height':displayHeight,
                 'margin-left':displayleft,
                 'z-index':'7'
                 };

                 //add css for zoomdisplay and zoomcover
                 $('#'+callerid+'_zoomdisplay').css(displayStyle);
                 $('#'+callerid+'_zoomdisplay>img').css(displayImgStyle);
                 $("#"+callerid+"_zoomcover").css(coverStyle);
                 $('#'+callerid+'_zoomcover').show();
                 var iebrowser=/msie/.test(navigator.userAgent.toLowerCase());
                 if(iebrowser)//ie does support pointer-events
                    {
                     $('#'+callerid+'_zoommini')[0].setCapture();
                     $('#'+callerid+'_zoomcover').show();
                     if((covertop<0)||(covertop>(miniHeight-coverHeight))||(coverleft<0)||(coverleft>(miniWidth-coverWidth)))
                        {
                        $('#'+callerid+'_zoomdisplay').hide();
                        $('#'+callerid+'_zoomcover').hide();
                        $('#'+callerid+'_zoommini')[0].releaseCapture();
                        }
                        
                    }//zoomcover for ie
                        });//mousemove function
                 $("#"+callerid+"_zoommini").mouseout(function(){
                    $('#'+callerid+'_zoomdisplay').hide();
                    $('#'+callerid+'_zoomcover').hide();
                 });//mouseout function

        });//imgload function;
      var zoomcover=$("<div id='"+callerid+"_zoomcover'></div>");
      $("#"+callerid).append(zoomcover);
     });//main---each function;

     }
     });





})(jQuery);
