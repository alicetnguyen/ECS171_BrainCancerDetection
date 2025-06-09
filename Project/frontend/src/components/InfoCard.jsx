// src/components/InfoCard.jsx

import React from 'react';

export default function InfoCard({
  title,
  children,
  icon,
  buttonText,
  onButtonClick,  // existing
  onIconClick,    // ← new prop
}) {
  // the styling for the InfoCard component
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '360px',
    height: '360px',
    flexShrink: 0,
    borderRadius: '28px',
    background: 'var(--Schemes-Surface-Container-High, #ECE6F0)',
    padding: '12px',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    margin: 0,
    color: '#000000',
    fontFamily: 'K2D, sans-serif',
    fontSize: '28px',
    fontWeight: 300,
    lineHeight: '36px',
    textAlign: 'left',
  };

  const bodyStyle = {
    margin: '12px 0',
    color: '#374151',
    fontFamily: 'K2D, sans-serif',
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: '28px',
    textAlign: 'left',
    flexGrow: 1,
    overflow: 'hidden',
  };

  // upload‐only box style
  const uploadBoxStyle = {
    display: 'flex',
    width: '93px',
    height: '77px',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderRadius: 'var(--Corner-Large, 16px)',
    background: 'var(--Schemes-Primary-Container, #EADDFF)',
    boxShadow:
      '0px 4px 8px 3px rgba(0,0,0,0.15), 0px 1px 3px 0px rgba(0,0,0,0.30)',
    marginTop: 'auto',
    alignSelf: 'center',
    cursor: onIconClick ? 'pointer' : 'default',  // show clickable
  };

  const iconImgStyle = {
    width: '48px',
    height: '48px',
  };

  // paper‐button style
  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '8px',
    fontFamily: 'K2D, sans-serif',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
    marginTop: 'auto',
    alignSelf: 'flex-end',
  };

  const buttonIconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '8px',
  };

  return (
    <div style={cardStyle}>
      {/* Title */}
      <h2 style={titleStyle}>{title}</h2>

      {/* Body */}
      <p style={bodyStyle}>{children}</p>

      {/* Upload icon: now calls onIconClick */}
      {icon && !buttonText && (
        <div style={uploadBoxStyle} onClick={onIconClick}>
          <img src={icon} alt="" style={iconImgStyle} />
        </div>
      )}

      {/* Paper button */}
      {icon && buttonText && (
        <button onClick={onButtonClick} style={buttonStyle}>
          <img src={icon} alt="" style={buttonIconStyle} />
          {buttonText}
        </button>
      )}
    </div>
  );
}
