import PDFDocument from "pdfkit";

export const generateDCRPdf = async (dcr, res) => {

  const doc = new PDFDocument({ margin: 40 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=DCR-${dcr._id}.pdf`
  );

  doc.pipe(res);

  /* ===== HEADER ===== */

  doc
    .fontSize(20)
    .text("MedTrackPro - Daily Call Report", { align: "center" });

  doc.moveDown();

  /* ===== BASIC INFO ===== */

  doc.fontSize(12);
  doc.text(`MR: ${dcr.mr.employeeCode}`);
  doc.text(`Date: ${new Date(dcr.date).toDateString()}`);
  doc.text(`Status: ${dcr.status}`);
  doc.text(`Total Visits: ${dcr.totalVisits}`);

  doc.moveDown();

  /* ===== VISITS ===== */

  doc.fontSize(16).text("Visit Details");
  doc.moveDown();

  dcr.visits.forEach((visit, index) => {

    doc.fontSize(12).text(`Visit ${index + 1}`);

    doc.text(`Doctor: ${visit.doctor.name}`);
    doc.text(`Hospital: ${visit.doctor.hospital}`);

    if (visit.productsDiscussed.length > 0) {
      doc.text("Products:");

      visit.productsDiscussed.forEach((p) => {
        doc.text(
          ` - ${p.product.name} (Samples: ${p.sampleQty})`
        );
      });
    }

    if (visit.notes) {
      doc.text(`Notes: ${visit.notes}`);
    }

    doc.moveDown();
  });

  doc.end();
};
