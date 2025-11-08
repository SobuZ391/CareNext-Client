// src/pages/InvoicePage.js
import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Helmet } from "react-helmet-async";

const InvoicePage = () => {
  const location = useLocation();
  const { order } = location.state || {};

  const handlePrint = () => {
    if (!order) return;

    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const logo = `${window.location.origin}/logo.png`; // ✅ Public path logo

    // ✅ Add logo safely (Base64 or URL)
    try {
      doc.addImage(logo, "PNG", 40, 30, 60, 40);
    } catch (err) {
      console.warn("Logo not added:", err.message);
    }

    // ✅ Header
    doc.setFontSize(22);
    doc.text("CareNext Pharmacy", 120, 50);
    doc.setFontSize(14);
    doc.text("Invoice", 450, 50);

    // ✅ Customer Info
    doc.setFontSize(11);
    const infoTop = 100;
    doc.text(`Customer: ${order.buyerName || "N/A"}`, 40, infoTop);
    doc.text(`Email: ${order.email || "N/A"}`, 40, infoTop + 15);
    doc.text(
      `Date: ${new Date(order.date).toLocaleString()}`,
      40,
      infoTop + 30
    );
    doc.text(`Transaction ID: ${order.transactionId}`, 40, infoTop + 45);

    // ✅ Table (Safe conversion)
    const tableColumn = ["Item", "Qty", "Price", "Total"];
    const tableRows = order.items.map((item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      const total = price * quantity;

      return [
        item.name,
        quantity.toString(),
        `$${price.toFixed(2)}`,
        `$${total.toFixed(2)}`,
      ];
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: infoTop + 70,
      theme: "striped",
      headStyles: { fillColor: [66, 133, 244] },
    });

    // ✅ Total
    const finalY = doc.lastAutoTable.finalY || 0;
    doc.setFontSize(13);
    doc.text(`Grand Total: $${Number(order.amount).toFixed(2)}`, 40, finalY + 30);

    // ✅ Footer
    doc.setFontSize(10);
    doc.text("Thank you for shopping with CareNext Pharmacy!", 40, finalY + 60);
    doc.text(
      "Need help? Contact: support@carenextpharmacy.com",
      40,
      finalY + 75
    );

    // ✅ Download PDF
    doc.save(`invoice-${order.transactionId}.pdf`);
  };

  if (!order) {
    return (
      <div className="p-6 text-center">
        <Helmet>
          <title>CareNext Pharmacy | Invoice Not Found</title>
        </Helmet>
        <h2 className="text-2xl font-bold mb-4">No Invoice Found</h2>
        <p className="text-gray-600">
          It looks like this page was accessed without a valid order.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 mt-10 border rounded-2xl shadow-lg bg-white">
      <Helmet>
        <title>CareNext Pharmacy | Invoice</title>
      </Helmet>

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="CareNext Pharmacy Logo"
            className="w-14 h-14 rounded-md"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            CareNext Pharmacy
          </h1>
        </div>
        <span className="text-lg font-semibold text-gray-500">Invoice</span>
      </div>

      {/* Customer Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <p>
            <strong>Customer:</strong> {order.buyerName}
          </p>
          <p>
            <strong>Email:</strong> {order.email}
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <p>
            <strong>Date:</strong> {new Date(order.date).toLocaleString()}
          </p>
          <p>
            <strong>Transaction ID:</strong> {order.transactionId}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <h3 className="text-lg font-semibold mb-3">Purchased Items</h3>
      <table className="w-full border rounded-lg overflow-hidden text-sm shadow-sm">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-center">Price</th>
            <th className="p-2 text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item, idx) => {
            const price = Number(item.price) || 0;
            const total = price * (Number(item.quantity) || 0);
            return (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-center">${price.toFixed(2)}</td>
                <td className="p-2 text-center">${total.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-end mt-5">
        <p className="text-xl font-bold text-gray-800">
          Grand Total: ${Number(order.amount).toFixed(2)}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between mt-8 gap-3">
        <button
          onClick={handlePrint}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
        >
          💾 Download PDF
        </button>
        <button
          onClick={() => window.print()}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg w-full sm:w-auto"
        >
          🖨️ Print Invoice
        </button>
      </div>

      {/* Illustration */}
      <div className="mt-8">
        <img
          src="https://img.freepik.com/free-photo/3d-payment-terminal-bank-card-blue-checkmark_107791-17014.jpg"
          alt="Payment Success"
          className="rounded-xl shadow-md w-full"
        />
      </div>
    </div>
  );
};

export default InvoicePage;
