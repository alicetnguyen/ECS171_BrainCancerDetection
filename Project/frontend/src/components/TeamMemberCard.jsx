// src/components/TeamMemberCard.jsx

import React from 'react';


export default function TeamMemberCard({ name, role, avatarLetter }) {
  // getting everything from the figma design
  const cardStyle = {
    display: 'flex',
    width: '360px',          
    height: '80px',          
    flexShrink: 0,
    alignItems: 'flex-start', 
    padding: '12px',         
    borderRadius: '12px',    
    backgroundColor: 'var(--Schemes-Surface-Container-High, #ECE6F0)',
    boxSizing: 'border-box',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  };

  const leftSectionStyle = {
    display: 'flex',
    alignItems: 'center', 
    flexGrow: 1,          
  };

  const avatarStyle = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: 'var(--Schemes-Primary-Container, #EADDFF)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'K2D, sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: '#FFFFFF',
    flexShrink: 0,
    marginRight: '12px', 
    marginTop: '4px',    
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const nameStyle = {
    margin: 0,
    fontFamily: 'K2D, sans-serif',
    fontSize: '18px',
    fontWeight: 600,
    color: '#000000',
    lineHeight: 1.2,
  };

  const roleStyle = {
    margin: 0,
    marginTop: '4px',
    fontFamily: 'K2D, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#4B5563',
    lineHeight: 1.2,
  };

  const rightIconsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '4px',            
    marginTop: '4px',       
    marginLeft: '12px',     
  };

  const iconStyle = {
    width: '20px',
    height: '20px',
    color: '#6B7280',       
    cursor: 'pointer',
    userSelect: 'none',
  };

  return (
    <div style={cardStyle}>
      {/* left section: name icon + name/role */}
      <div style={leftSectionStyle}>
        <div style={avatarStyle}>{avatarLetter}</div>
        <div style={textContainerStyle}>
          <p style={nameStyle}>{name}</p>
          <p style={roleStyle}>{role}</p>
        </div>
      </div>

      {/* icons section that matches the figma folder file*/}
      <div style={rightIconsContainerStyle}>
        <span style={iconStyle}>▲</span>
        <span style={iconStyle}>⚙️</span>
      </div>
    </div>
  );
}
