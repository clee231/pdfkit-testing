const PDFDocument = require('pdfkit');
const fs = require('fs');
const lorem = require('lorem-ipsum');

// create a document and pipe to a blob
var doc = new PDFDocument({bufferPages:true});
var stream = fs.createWriteStream('output.pdf');

doc.pipe(stream);

// draw some text
doc.fontSize(25)
   .text('Here is some vector graphics...', 100, 80);
   
// some vector graphics
doc.save()
   .moveTo(100, 150)
   .lineTo(100, 250)
   .lineTo(200, 250)
   .fill("#FF3300");
   
doc.circle(280, 200, 50)
   .fill("#6600FF");
   
// an SVG path
doc.scale(0.6)
   .translate(470, 130)
   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
   .fill('red', 'even-odd')
   .restore();
   
// and some justified text wrapped into columns
doc.text('And here is some wrapped text...', 100, 300)
   .font('Times-Roman', 13)
   .moveDown()
   .text(lorem({count: 100, units: 'sentences', paragraphLowerBound: 5, paragraphUpperBound: 10}), {
     width: 412,
     align: 'justify',
     indent: 30,
     columns: 2,
     height: 300,
     ellipsis: true
   });
   
// Create a new page   
doc.addPage();
   
// and some justified text wrapped into columns
doc.text('And here is some wrapped text on the second page...', 100, 100)
   .font('Times-Roman', 13)
   .moveDown()
   .text(lorem({count: 50, units: 'sentences', paragraphLowerBound: 5, paragraphUpperBound: 10}), {
     width: 412,
     align: 'justify',
     indent: 30,
     columns: 2,
     height: 300,
     ellipsis: true
   });
   
// see the range of buffered pages
// # => {start: 0, count: 2}
var range = doc.bufferedPageRange();
   
// Add in pages numbers for all pages within the buffer.
for (i = 0; i < range.count; i++) {
 doc.switchToPage(i);
 doc.text("Page " + (i+1) + " of " + range.count, 480, 50);
}




// end and output file to the aforementioned pipe above.
// This code will output the PDF to `output.pdf`.
doc.end();
