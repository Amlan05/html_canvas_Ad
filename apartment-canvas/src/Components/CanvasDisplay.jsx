import React, { useEffect, useRef } from 'react';
import './Style.css';

class TextElement {
  constructor(text, position, fontSize, alignment, color, maxCharactersPerLine) {
    this.text = text;
    this.position = position;
    this.fontSize = fontSize;
    this.alignment = alignment;
    this.color = color;
    this.maxCharactersPerLine = maxCharactersPerLine;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px Arial`;
    ctx.textAlign = this.alignment;

      let words = this.text.split(' ')
    let line = ''
    words.forEach(word => {
      if ((line + word).length <= this.maxCharactersPerLine) {
        line += word + ' ';
      } else {
        ctx.fillText(line, this.position.x, this.position.y);
        line = word + ' ';
        this.position.y += this.fontSize;
      }
    });
    ctx.fillText(line, this.position.x, this.position.y);

 
  }

}

class CTAElement {
  constructor(text, position, textColor, backgroundColor, fontSize = 30, wrapLength = 20, padding = 24, borderRadius = 10) {
    this.text = text;
    this.position = position;
    this.textColor = textColor;
    this.backgroundColor = backgroundColor;
    this.fontSize = fontSize;
    this.wrapLength = wrapLength;
    this.padding = padding;
    this.borderRadius = borderRadius;
  }

  draw(ctx) {
    // Set font size and style
    ctx.font = `${this.fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Measure the text width and height
    const textWidth = ctx.measureText(this.text).width;
    const textHeight = this.fontSize * 1.2; // Assuming 20% padding above and below the text

    // Calculate the width and height of the rounded rect based on text size and padding
    const rectWidth = textWidth + 2 * this.padding;
    const rectHeight = textHeight + 2 * this.padding;

    // Calculate the position of the rounded rect based on text position and rect size
    const rectX = this.position.x - rectWidth / 2;
    const rectY = this.position.y - rectHeight / 2;

    // Draw the rounded rect background
    ctx.fillStyle = this.backgroundColor;
    ctx.beginPath();
    ctx.moveTo(rectX + this.borderRadius, rectY);
    ctx.arcTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + rectHeight, this.borderRadius);
    ctx.arcTo(rectX + rectWidth, rectY + rectHeight, rectX, rectY + rectHeight, this.borderRadius);
    ctx.arcTo(rectX, rectY + rectHeight, rectX, rectY, this.borderRadius);
    ctx.arcTo(rectX, rectY, rectX + rectWidth, rectY, this.borderRadius);
    ctx.closePath();
    ctx.fill();

    // Draw the text
    ctx.fillStyle = this.textColor;
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}


class ImageElement {
  constructor(x, y, width, height, url) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.url = url;
    this.image = new Image();
    this.image.src = url;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

const CanvasDisplay = ({canvasData}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const defImage = "https://www.shutterstock.com/image-photo/eu-modern-european-complex-apartment-600nw-1445600369.jpg"

    const data = '{"caption":{"text":"1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs","position":{"x":50,"y":80},"max_characters_per_line":31,"font_size":44,"alignment":"left","text_color":"#FFFFFF"},"cta":{"text":"Shop Now","position":{"x":190,"y":320},"text_color":"#FFFFFF","background_color":"#000000"},"image_mask":{"x":56,"y":442,"width":970,"height":600},"urls":{"mask":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png","stroke":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png","design_pattern":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png"}}'
    const jsonData = JSON.parse(data);

    const caption = new TextElement(canvasData.adContent || jsonData.caption.text, jsonData.caption.position, jsonData.caption.font_size, jsonData.caption.alignment, jsonData.caption.text_color, jsonData.caption.max_characters_per_line);
    const ctaButton = new CTAElement(canvasData.cta || jsonData.cta.text, jsonData.cta.position, jsonData.cta.text_color, jsonData.cta.background_color);
    // const imageMask = new ImageElement(jsonData.image_mask.x, jsonData.image_mask.y, jsonData.image_mask.width, jsonData.image_mask.height, jsonData.urls.mask);
    const designPattern = new ImageElement(0, 0, canvas.width, canvas.height, jsonData.urls.design_pattern);
    // const maskStroke = new ImageElement(56, 442, 970, 600, jsonData.urls.stroke);
    const imageMask = new ImageElement(jsonData.image_mask.x, jsonData.image_mask.y, jsonData.image_mask.width, jsonData.image_mask.height, jsonData.urls.mask);
    const maskStroke = new ImageElement(56, 442, 970, 600, jsonData.urls.stroke);


    const imageadd = new ImageElement(jsonData.image_mask.x, jsonData.image_mask.y, jsonData.image_mask.width, jsonData.image_mask.height, canvasData.img || defImage)


    ctx.fillStyle = canvasData.backColor || "#0369A1";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw design pattern (background layer)
    designPattern.draw(ctx);

    // Draw image mask
    // ctx.globalCompositeOperation = 'source-in';
    imageMask.draw(ctx);
    setTimeout( () => {
      imageadd.draw(ctx);
    }, 0)
    // ctx.globalCompositeOperation = 'source-over';

    maskStroke.draw(ctx);

    // ctx.globalCompositeOperation = 'source-over';

    // Draw image within the mask
    
    // Draw mask stroke
    // maskStroke.draw(ctx);

    // Draw other elements
    caption.draw(ctx);
    ctaButton.draw(ctx);

  }, [canvasData]);

  return (
    <div >
    <canvas ref={canvasRef} width={1080} height={1080} className='m-8 w-3/4 h-3/4' ></canvas>
    </div>
  );
};

export default CanvasDisplay;
