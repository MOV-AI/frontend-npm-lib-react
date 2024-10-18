import JSpdf from "jspdf";
import "jspdf-autotable";

export default function ExportPdf(columns, data = [], filename = "data") {
  try {
    let finalData = data; // Grab first item for data array, make sure it is also an array.
    // If it is an object, 'flatten' it into an array of strings.

    if (data.length && !Array.isArray(data[0])) {
      if (typeof data[0] === "object") {
        // Turn data into an array of string arrays, without the `tableData` prop
        finalData = data.map((row) =>
          columns.map((col) =>
            col.exportTransformer ? col.exportTransformer(row) : row[col.field],
          ),
        );
      }
    }

    const content = {
      startY: 50,
      head: [columns.map((col) => col.title)],
      body: finalData,
    };
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const doc = new JSpdf(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(filename, 40, 40);
    doc.autoTable(content);
    doc.save(filename + ".pdf");
  } catch (err) {
    console.error(
      `exporting pdf : unable to import 'jspdf-autotable' : ${err}`,
    );
  }
}
