import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import prod_5 from "../assets/ls_logo_1.png";
// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  brandLogo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    width: '100%',
    border: '1px solid #ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: 8,
    flex: 1,
    fontSize: 12,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  footer: {
    marginTop: 40,
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
  },
});

// Invoice component
export const Invoice = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Lata Sarees</Text>
          <Text style={styles.subtitle}>Invoice #{order.id}</Text>
        </View>
        <Image
          src={prod_5}
          style={styles.brandLogo}
        />
      </View>

      {/* Order Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <Text>Order ID: #{order.id}</Text>
        <Text>Order Date: {order.date}</Text>
        <Text>Status: {order.status}</Text>
      </View>

      {/* Products Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Products</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Product</Text>
            <Text style={styles.tableCell}>Quantity</Text>
            <Text style={styles.tableCell}>Price</Text>
            <Text style={styles.tableCell}>Total</Text>
          </View>
          {/* Table Rows */}
          {order.products.map((product) => (
            <View key={product.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.name}</Text>
              <Text style={styles.tableCell}>{product.quantity}</Text>
              <Text style={styles.tableCell}>{product.price}</Text>
              <Text style={styles.tableCell}>
                ₹{parseFloat(product.price.replace(/[^0-9.-]+/g, '')) * product.quantity}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Total */}
      <View style={styles.total}>
        <Text style={styles.sectionTitle}>Total: {order.total}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for shopping with Lata Sarees!</Text>
        <Text>Contact: support@latasarees.com | Phone: +91 1234567890</Text>
      </View>
    </Page>
  </Document>
);