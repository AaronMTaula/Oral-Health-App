import React, { useState, useRef, useEffect } from "react";
import { Renderer, Camera, Transform, Plane, Program, Mesh, Texture } from "ogl";
import "./Home.css";

const socialPosts = [
  { title: "Healthy Smiles Tip", description: "Remember to brush twice a day!", img: "/images/post1.png" },
  { title: "Dental Fun", description: "Check out our latest fun dental activity.", img: "/images/post2.png" },
  { title: "Community Event", description: "We participated in a local health fair.", img: "/images/post3.png" }
];

// Smooth scroll for social rolodex
const scrollPosts = (direction) => {
  const container = document.getElementById("rolodexContainer");
  const scrollAmount = 300;
  if (direction === "left") container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  else container.scrollBy({ left: scrollAmount, behavior: "smooth" });
};

const RevealCard = ({ title, direction, children }) => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const renderer = new Renderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    const gl = renderer.gl;

    const camera = new Camera(gl);
    camera.position.z = 5;

    const scene = new Transform();
    const geometry = new Plane(gl, { width: 2, height: 2, widthSegments: 100, heightSegments: 100 });

    const texture = new Texture(gl, { generateMipmaps: false });
    const img = new Image();
    img.src = "/images/card-cover.png"; // placeholder cover image
    img.onload = () => (texture.image = img);

    const vertexShader = `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uProgress;
      varying vec2 vUv;

      mat4 rotationY(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat4(
          c, 0.0, s, 0.0,
          0.0, 1.0, 0.0, 0.0,
          -s, 0.0, c, 0.0,
          0.0, 0.0, 0.0, 1.0
        );
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        mat4 rot = rotationY(uProgress);
        gl_Position = projectionMatrix * modelViewMatrix * rot * vec4(pos, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform sampler2D tMap;
      varying vec2 vUv;
      void main() {
        gl_FragColor = texture2D(tMap, vUv);
      }
    `;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: { tMap: { value: texture }, uProgress: { value: 0 } }
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let progress = 0;
    let target = 0;
    let isDragging = false;
    let startX = 0;

    const animate = () => {
      progress += (target - progress) * 0.1;
      program.uniforms.uProgress.value = progress;
      renderer.render({ scene, camera });
      requestAnimationFrame(animate);
    };
    animate();

    const onMouseDown = (e) => { isDragging = true; startX = e.clientX; };
    const onMouseMove = (e) => { if (!isDragging) return; const delta = e.clientX - startX; target = Math.min(Math.max(delta * 0.01, 0), Math.PI / 2); };
    const onMouseUp = () => (isDragging = false);

    canvasRef.current.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvasRef.current.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className={`reveal-card ${open ? "open" : ""}`}>
      <canvas ref={canvasRef} className="reveal-canvas" />
      <div className="reveal-content">
        <h3>{title}</h3>
        {children}
        <button className={`reveal-close-circle ${direction} open-arrow ${open ? "hidden" : ""}`} onClick={() => setOpen(true)}>
          {direction === "left" ? "←" : "→"}
        </button>
        <button className={`reveal-close-circle ${direction} close-arrow ${open ? "" : "hidden"}`} onClick={() => setOpen(false)}>
          {direction === "left" ? "→" : "←"}
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <main>
      {/* Announcement Section */}
      <section id="announcement" className="announcement-banner">
        <div className="announcement-content">
          <img src="/images/announcement-left.png" alt="Oral health illustration left" className="announcement-image" />
          <div className="announcement-text">
            <h2 className="announcement-title">Welcome</h2>
            <p>Welcome to the Ata'ata oral health programme. We want to make oral health easy as</p>
            <p><strong>We have three simple goals:</strong></p>
            <ul>
              <li>Improve oral health habits</li>
              <li>Make finding and seeing your provider easier</li>
              <li>To provide health information</li>
            </ul>
            <p>Use our website alongside our app improve your smile today!</p>
          </div>
          <img src="/images/announcement-right.png" alt="Oral health illustration right" className="announcement-image" />
        </div>
      </section>

      {/* Reveal Cards Section */}
      <section className="reveal-section">
        <div className="reveal-grid">
          <RevealCard title="For Parents" direction="left">
            <p><strong>Hello parents!</strong> Use our website (and app) to learn more about oral health.</p>
          </RevealCard>
          <RevealCard title="For Kiddies" direction="right">
            <p><strong>Hello kiddies!</strong> Explore how <strong>EASY</strong> it is to keep your teeth clean.</p>
          </RevealCard>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="social-section">
        <div className="social-grid">
          <div className="social-text">
            <h2>Social Media Updates</h2>
            <p>Check out our latest posts from our social media accounts! Stay connected, see our activities, and learn tips to keep your oral health on track.</p>
          </div>
          <div className="social-rolodex">
            <button className="rolodex-arrow left" onClick={() => scrollPosts("left")} aria-label="Scroll left">←</button>
            <div className="rolodex-container" id="rolodexContainer">
              {socialPosts.map((post, idx) => (
                <div key={idx} className="rolodex-post">
                  <img src={post.img} alt={post.title} />
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                </div>
              ))}
            </div>
            <button className="rolodex-arrow right" onClick={() => scrollPosts("right")} aria-label="Scroll right">→</button>
          </div>
        </div>
      </section>

      {/* Existing content */}
      <section id="who-we-are">
        <h2>Who We Are</h2>
        <p>Welcome to Oral Health App. We provide exceptional dental care with a friendly team and state-of-the-art equipment.</p>
      </section>
    </main>
  );
};

export default Home;
