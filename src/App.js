import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { User, Code, Image as ImageIcon, ExternalLink, Mail, Phone, Cpu } from 'lucide-react';
import './App.css';

// 1. HOME PAGE COMPONENT
const Home = () => (
  <div className="container">
    <div className="profile-card">
      <img src="https://via.placeholder.com/150" alt="Profile" className="profile-img" />
      <h1>Vijay</h1>
      <p><em>Passionate Web Developer</em></p>
      
      <h3>About Me</h3>
      <p>I am a student building my portfolio using React and modern styling.</p>

      <h3>Research Interests</h3>
      <p>Software Engineering, Web Technologies, and User Experience.</p>

      <div className="details-grid">
        <div className="card">
          <h4><Phone size={18}/> Contact</h4>
          <p>+91 1234567890</p>
        </div>
        <div className="card">
          <h4><Mail size={18}/> Emails</h4>
          <p>personal@email.com<br/>college@univ.edu</p>
        </div>
        <div className="card">
          <h4><Cpu size={18}/> Skills</h4>
          <p>React, JavaScript, CSS, Github</p>
        </div>
      </div>
    </div>
  </div>
);

// 2. PROJECTS PAGE COMPONENT
const Projects = () => {
  const myProjects = [
    { title: "Portfolio Website", desc: "A React based personal site.", link: "https://github.com/VijayG636/portfolio" },
    { title: "Task App", desc: "My second major project description.", link: "https://github.com/VijayG636" }
  ];

  return (
    <div className="container">
      <h2>My Projects</h2>
      <div className="project-list">
        {myProjects.map((p, i) => (
          <div key={i} className="project-card">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <a href={p.link} target="_blank" rel="noreferrer" className="github-btn">
              <GithubIcon size={16} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// 3. PHOTO GALLERY COMPONENT
const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('my-photos') || '[]');
    setImages(savedImages);
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImages = [reader.result, ...images];
        setImages(updatedImages);
        localStorage.setItem('my-photos', JSON.stringify(updatedImages));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container">
      <h2>Photo Gallery</h2>
      <div className="upload-section">
        <label className="upload-label">
          <ImageIcon size={20} /> Upload Photo
          <input type="file" className="file-input" onChange={handleUpload} accept="image/*" />
        </label>
      </div>
      <div className="photo-grid">
        {images.map((img, i) => (
          <img key={i} src={img} alt="Uploaded" className="uploaded-img" />
        ))}
      </div>
    </div>
  );
};

// MAIN APP WITH NAVIGATION
function App() {
  return (
    <HashRouter>
      <nav>
        <NavLink to="/" className="nav-link"><User size={20}/> Home</NavLink>
        <NavLink to="/projects" className="nav-link"><Code size={20}/> Projects</NavLink>
        <NavLink to="/gallery" className="nav-link"><ImageIcon size={20}/> Gallery</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </HashRouter>
  );
}

export default App;