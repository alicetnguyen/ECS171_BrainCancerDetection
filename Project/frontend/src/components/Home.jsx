// src/components/Home.jsx

import React, { useState, useRef } from 'react';
import InfoCard from './InfoCard';
import TeamMemberCard from './TeamMemberCard';
import OutputCard from './OutputCard';
import uploadIcon from '../assets/Upload.png';
import paperIcon from '../assets/icon.png';
import '../index.css';

export default function Home() {
  const [prediction, setPrediction] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [showOutput, setShowOutput] = useState(false);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    setShowOutput(false);
    fileInputRef.current.value = '';
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // create a preview of the image 
    setPreviewSrc(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file, file.name);

    try {
      const res = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setPrediction(data.prediction);
      setConfidence(data.confidence ?? 0);
    } catch {
      setPrediction('Invalid image, no prediction');
      setConfidence(0);
    }
  };

  return (
    <div className="gradient-bg">
      <div
        className="homepage-container"
        style={{
          width: '1280px',
          minHeight: '1028px',
          margin: '0 auto',
          paddingTop: '23px',
        }}
      >
        {/* this is going to be the header section of the project */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 18px',
          }}
        >
          <h1 style={headerTitleStyle}>Brain Cancer Detection Website</h1>
          <span style={ecsTitleStyle}>ECS 171 Project</span>
        </header>

        <div style={{ height: '166px' }} />

        {/* this is going to be the info card section havign a little bit about our project */}
        <section style={infoCardsGrid}>
          <InfoCard title="Who are we?">
            We are a group of UC Davis Students taking ECS 171 and we are focusing on
            the detection of Brain Cancer amongst a multitude of MRI scans. Our goal
            is to detect what type of brain cancer someone has when uploaded to this
            website.
          </InfoCard>

          <InfoCard
            title="Website Purpose"
            icon={uploadIcon}
            onIconClick={handleUploadClick}
          >
            By clicking the upload button on this website, you will be prompted to
            provide a Brain MRI scan image; after that, you will receive a prediction
            of whether the scan shows brain cancer and which type of tumor it is.
          </InfoCard>

          <InfoCard title="Check out our Paper" icon={paperIcon} buttonText="Paper">
            By clicking the button below, you’ll go to our full research paper where we
            explain how we built our machine learning model, how we preprocessed the
            data, and the challenges we faced along the way.
          </InfoCard>
        </section>

        {/* only be able yo accept .jpg, .jpeg and .png */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* this is the output button and this is where the user can click on it */}
        {prediction && !showOutput && (
          <div style={{ padding: '0 18px', marginTop: '24px' }}>
            <button style={outputButtonStyle} onClick={() => setShowOutput(true)}>
              Output
            </button>
          </div>
        )}

        {/* this is going to be the output card in where the output of the model is shown*/}
        {showOutput && previewSrc && (
          <OutputCard
            imageSrc={previewSrc}
            label={prediction}
            confidence={confidence}
          />
        )}

        <div style={{ height: '80px' }} />

        {/* meet the team section of the  page */}
        <section style={{ padding: '0 18px' }}>
          <h3 style={meetTeamTitleStyle}>Meet the Team</h3>
          <div style={teamGrid}>
            <TeamMemberCard name="Alice Nguyen" role="Project Lead" avatarLetter="A" />
            <TeamMemberCard name="Raquib Alam" role="Project Member" avatarLetter="R" />
            <TeamMemberCard name="Vedant Gopal" role="Project Member" avatarLetter="V" />
            <TeamMemberCard name="Alex Do" role="Project Member" avatarLetter="A" />
            <TeamMemberCard name="Amber Zhang" role="Project Member" avatarLetter="A" />
          </div>
        </section>
      </div>
    </div>
  );
}

// ---------------- styles ----------------

const headerTitleStyle = {
  margin: 0,
  color: '#000',
  fontFamily: 'K2D, sans-serif',
  fontSize: '36px',
  fontWeight: 400,
};

const ecsTitleStyle = {
  color: '#000',
  fontFamily: 'K2D, sans-serif',
  fontSize: '24px',
  fontWeight: 400,
};

const infoCardsGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 360px)',
  gap: '24px',
  padding: '0 18px',
};

const outputButtonStyle = {
  fontFamily: 'K2D, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  backgroundColor: '#4F46E5',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '12px 24px',
  cursor: 'pointer',
};

const meetTeamTitleStyle = {
  margin: 0,
  marginBottom: '12px',
  color: '#000',
  fontFamily: 'K2D, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
};

const teamGrid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 360px)',
  gap: '24px',
};
