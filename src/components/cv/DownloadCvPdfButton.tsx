"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DownloadCvPdfButtonProps {
  /** DOM id of the element to capture — must match CvPreview's root id. */
  targetId: string;
  fileName: string;
}

export function DownloadCvPdfButton({ targetId, fileName }: DownloadCvPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setError(null);
    setIsGenerating(true);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf")
      ]);

      const node = document.getElementById(targetId);
      if (!node) throw new Error("Preview not found");

      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      const imgData = canvas.toDataURL("image/png");

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Long CVs overflow one A4 page — slice the same image across
      // additional pages by shifting its vertical offset.
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fileName}.pdf`);
    } catch {
      setError("Could not generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Button onClick={handleDownload} disabled={isGenerating} variant="primary">
        {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
        {isGenerating ? "Generating PDF..." : "Download PDF"}
      </Button>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
    </div>
  );
}
