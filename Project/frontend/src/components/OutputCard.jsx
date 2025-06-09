// src/components/OutputCard.jsx

import React from 'react';

export default function OutputCard({ imageSrc, label, confidence }) {
  return (
    <div style={styles.card}>
      {/* header for the website */}
      <div style={styles.header}>
        <h2 style={styles.title}>Model Update</h2>
        <p style={styles.subtitle}>Brain Cancer Detection</p>
      </div>

      {/* image preview for the image uploaded */}
      <div style={styles.imageContainer}>
        <img src={imageSrc} alt="Uploaded scan" style={styles.image} />
      </div>

      {/* prediction label thing for the frotnend */}
      <div style={styles.resultLabel}>{label}</div>

      {/* description of the model output*/}
      <p style={styles.description}>
        Based on our model and the picture that you have given to us, we detected: <strong>{label}</strong> for the image.  
      </p>
    </div>
  );
}

const styles = {
  card: {
    width: '360px',
    margin: '24px auto',
    borderRadius: '28px',
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    fontFamily: 'K2D, sans-serif',
  },
  header: {
    padding: '16px',
    borderBottom: '1px solid #E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#000000',
  },
  subtitle: {
    margin: '4px 0 0',
    fontSize: '16px',
    fontWeight: 400,
    color: '#374151',
  },
  imageContainer: {
    backgroundColor: '#ECE6F0',
    display: 'flex',
    justifyContent: 'center',
    padding: '24px',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '200px',
    borderRadius: '16px',
  },
  resultLabel: {
    padding: '12px 16px 0',
    fontSize: '24px',
    fontWeight: 400,
    color: '#000000',
  },
  description: {
    padding: '8px 16px 16px',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#374151',
  },
};
