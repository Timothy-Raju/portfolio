import React, { useState, useEffect, useRef, useId } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Globe,
  Radio,
} from "lucide-react";
import { TimelineContent } from "./timeline-content";

// ==========================================
// 1. Lightweight 3D Canvas Wireframe Globe
// ==========================================
interface GlobeWireframeProps {
  className?: string;
}

const GlobeWireframe: React.FC<GlobeWireframeProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const rotRef = useRef({ x: 0.35, y: 0.8 }); // initial tilt and angle showing India
  const velRef = useRef({ x: 0, y: 0.004 }); // smooth auto-rotation
  const isInViewRef = useRef(true);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Observe visibility so we don't render when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Precompute latitude and longitude rings
    const radius = 115;
    const latRings = [-60, -40, -20, 0, 20, 40, 60];
    const lonRings = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

    // Precompute land dot-matrix points
    const landDots: { lat: number; lon: number }[] = [];
    for (let lat = -70; lat <= 70; lat += 10) {
      const circumference = Math.cos((lat * Math.PI) / 180);
      const step = Math.max(10, Math.round(18 / Math.max(0.15, circumference)));
      for (let lon = 0; lon < 360; lon += step) {
        // Density distribution shaping realistic continental masses
        const isLand =
          // Asia & India
          (lat >= 5 && lat <= 45 && lon >= 60 && lon <= 135) ||
          // Europe
          (lat >= 35 && lat <= 65 && lon >= -10 && lon <= 50) ||
          // Africa
          (lat >= -35 && lat <= 35 && lon >= -15 && lon <= 50) ||
          // North America
          (lat >= 20 && lat <= 65 && lon >= 230 && lon <= 300) ||
          // South America
          (lat >= -55 && lat <= 12 && lon >= 280 && lon <= 325) ||
          // Australia
          (lat >= -40 && lat <= -12 && lon >= 115 && lon <= 155);

        if (isLand || Math.random() < 0.12) {
          landDots.push({ lat, lon });
        }
      }
    }

    // Coordinates for Palakol, Andhra Pradesh, India (16.5° N, 81.7° E)
    const palakolCoords = { lat: 16.52, lon: 81.72 };

    let pulseTime = 0;

    const render = () => {
      if (!isInViewRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Update rotation
      if (!isDraggingRef.current) {
        rotRef.current.y += velRef.current.y;
        rotRef.current.x += velRef.current.x;
        velRef.current.x *= 0.94; // damp manual vertical impulse
      }

      pulseTime += 0.05;

      const cosX = Math.cos(rotRef.current.x);
      const sinX = Math.sin(rotRef.current.x);
      const cosY = Math.cos(rotRef.current.y);
      const sinY = Math.sin(rotRef.current.y);

      // Project 3D point (lat, lon, r) to 2D screen coordinates
      const project = (lat: number, lon: number, r: number) => {
        const phi = (lat * Math.PI) / 180;
        const theta = (lon * Math.PI) / 180;

        // Base 3D sphere point
        const x0 = r * Math.cos(phi) * Math.sin(theta);
        const y0 = -r * Math.sin(phi);
        const z0 = r * Math.cos(phi) * Math.cos(theta);

        // Rotate Y (longitude)
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Rotate X (latitude tilt)
        const y2 = y0 * cosX - z1 * sinX;
        const z2 = y0 * sinX + z1 * cosX;

        // 3D perspective projection
        const focal = 450;
        const scale = focal / (focal - z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          visible: z2 > -radius * 0.45,
          scale,
        };
      };

      // 1. Draw Globe Atmosphere & Rim Glow
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius * 1.25);
      glowGrad.addColorStop(0, "rgba(195, 228, 29, 0.04)");
      glowGrad.addColorStop(0.8, "rgba(195, 228, 29, 0.08)");
      glowGrad.addColorStop(1, "rgba(195, 228, 29, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();

      // Outer wire sphere edge
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(195, 228, 29, 0.2)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // 2. Draw Latitude Rings
      latRings.forEach((lat) => {
        ctx.beginPath();
        let started = false;
        for (let lon = 0; lon <= 360; lon += 8) {
          const p = project(lat, lon, radius);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = "rgba(195, 228, 29, 0.12)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // 3. Draw Longitude Rings (Meridians)
      lonRings.forEach((lon) => {
        ctx.beginPath();
        let started = false;
        for (let lat = -80; lat <= 80; lat += 8) {
          const p = project(lat, lon, radius);
          if (p.z > 0) {
            if (!started) {
              ctx.moveTo(p.x, p.y);
              started = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = "rgba(195, 228, 29, 0.14)";
        ctx.lineWidth = 0.8;
        ctx.stroke();
      });

      // 4. Draw Continental Matrix Dots
      landDots.forEach((dot) => {
        const p = project(dot.lat, dot.lon, radius);
        if (p.z > 0) {
          const alpha = Math.min(1, Math.max(0.15, (p.z / radius) * 1.1));
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.4 * p.scale, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(195, 228, 29, ${alpha * 0.85})`;
          ctx.fill();
        }
      });

      // 5. Draw Location Beacon (Palakol, AP, India)
      const beacon = project(palakolCoords.lat, palakolCoords.lon, radius);
      if (beacon.z > 0) {
        const pulse = (Math.sin(pulseTime * 2.5) + 1) / 2;
        const outerR = 6 + pulse * 14;

        // Pulsing radar ring
        ctx.beginPath();
        ctx.arc(beacon.x, beacon.y, outerR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(195, 228, 29, ${0.8 - pulse * 0.7})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        // Secondary ring
        ctx.beginPath();
        ctx.arc(beacon.x, beacon.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "#C3E41D";
        ctx.shadowColor = "#C3E41D";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Floating Target Pin Tag
        const tagX = beacon.x + 14;
        const tagY = beacon.y - 12;

        ctx.font = "bold 9px 'Fira Code', monospace";
        const tagText = "PALAKOL, IN (16.5°N, 81.7°E)";
        const textWidth = ctx.measureText(tagText).width;

        // Connection line
        ctx.beginPath();
        ctx.moveTo(beacon.x, beacon.y);
        ctx.lineTo(tagX - 4, tagY + 4);
        ctx.strokeStyle = "rgba(195, 228, 29, 0.7)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Tag pill background
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = "rgba(195, 228, 29, 0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(tagX - 4, tagY - 8, textWidth + 12, 16, 4);
        ctx.fill();
        ctx.stroke();

        // Tag label
        ctx.fillStyle = "#C3E41D";
        ctx.fillText(tagText, tagX + 2, tagY + 4);
      }

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pointer Drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;

    rotRef.current.y += dx * 0.008;
    rotRef.current.x = Math.max(-0.9, Math.min(0.9, rotRef.current.x + dy * 0.008));
    velRef.current = { x: dy * 0.001, y: dx * 0.002 };

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[280px] sm:h-[320px] rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900/40 dark:bg-black/50 backdrop-blur-md flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title="Interactive 3D Wireframe Globe • Click and drag to rotate"
      aria-label="Interactive 3D Wireframe Globe"
    >
      {/* Background Starfield Grid */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C3E41D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      {/* Canvas */}
      <canvas ref={canvasRef} className="w-full h-full relative z-10 block" />

      {/* Floating Info Overlay */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-300 pointer-events-none backdrop-blur-xs">
        <Radio className="w-3 h-3 text-[#C3E41D] animate-pulse" />
        <span>LIVE GLOBAL NODE</span>
      </div>

      <div className="absolute bottom-3 right-3 z-20 text-[9px] font-mono text-neutral-400 bg-black/50 px-2 py-0.5 rounded border border-white/5 pointer-events-none">
        DRAG TO ROTATE 3D
      </div>
    </div>
  );
};

// ==========================================
// 2. Contact Section Component
// ==========================================
export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    _gotcha: "", // Honeypot
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "activation_required">("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const nameId = useId();
  const emailId = useId();
  const subjectId = useId();
  const messageId = useId();

  // Email Validation Helper
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters long.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (isSubmitting) return;

    // Honeypot spam check
    if (formData._gotcha) {
      // Silently treat as success without sending spam
      setSubmitStatus("success");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Endpoint resolution:
    // 1. User-configured environment endpoint if set (e.g. Formspree or Web3Forms)
    // 2. Default to FormSubmit configured directly for rajupalanki1037@gmail.com
    const targetEndpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT ||
      "https://formsubmit.co/ajax/rajupalanki1037@gmail.com";

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      _subject: `[Portfolio Inquiry] ${formData.subject.trim()}`,
      message: formData.message.trim(),
      _replyto: formData.email.trim(),
      _template: "table",
      _captcha: "false",
    };

    try {
      const response = await fetch(targetEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (result?.success === "true" || result?.success === true || result?.ok)) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          _gotcha: "",
        });
      } else if (result?.message && result.message.toLowerCase().includes("activation")) {
        // FormSubmit sends a one-time activation confirmation link to the owner's email
        setSubmitStatus("activation_required");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Contact submission error:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="relative w-full py-20 sm:py-28 bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div
        className="absolute top-1/4 -left-40 w-[600px] h-[400px] bg-[#C3E41D]/10 dark:bg-[#C3E41D]/5 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-0 w-[500px] h-[350px] bg-[#C3E41D]/8 dark:bg-[#C3E41D]/4 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <TimelineContent animationNum={1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 border border-[#C3E41D]/40 text-[#495902] dark:text-[#C3E41D] text-xs font-mono uppercase tracking-wider font-bold mb-4 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CONNECTION</span>
              </div>
            </TimelineContent>

            <TimelineContent animationNum={2}>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-neutral-950 dark:text-white">
                Get In Touch.
              </h2>
            </TimelineContent>
          </div>

          <TimelineContent animationNum={2} className="max-w-lg">
            <p className="text-base sm:text-lg font-semibold text-[#5c7003] dark:text-[#C3E41D] mb-1 font-mono">
              Let&apos;s create something great together
            </p>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
              I am currently looking for engineering internships, technical collaborations, and software projects. Drop a message and let&apos;s coordinate!
            </p>
          </TimelineContent>
        </div>

        {/* Two-Column Grid: Left Column Info + Globe | Right Column Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ========================================================= */}
          {/* LEFT COLUMN: Contact Introduction, Details & 3D Wireframe */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <TimelineContent animationNum={3}>
              <div className="p-6 sm:p-7 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 backdrop-blur-xl shadow-sm flex flex-col gap-5">
                <h3 className="text-lg font-bold text-neutral-950 dark:text-white tracking-tight flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C3E41D]" />
                  <span>Direct Coordinates</span>
                </h3>

                {/* Email Method */}
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#1A1A20] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#C3E41D]/60 dark:hover:border-[#C3E41D]/60 transition-all duration-200 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#C3E41D]/15 dark:bg-[#C3E41D]/10 text-[#495902] dark:text-[#C3E41D] flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                          Email
                        </span>
                        <a
                          href="mailto:rajupalanki1037@gmail.com"
                          className="block text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 hover:text-[#5c7003] dark:hover:text-[#C3E41D] transition-colors break-all"
                        >
                          rajupalanki1037@gmail.com
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard("rajupalanki1037@gmail.com", "email")}
                      title="Copy email to clipboard"
                      className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-[#C3E41D] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Phone & WhatsApp Method */}
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#1A1A20] border border-neutral-200/80 dark:border-neutral-800/80 hover:border-[#C3E41D]/60 dark:hover:border-[#C3E41D]/60 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/15 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                          Call / WhatsApp
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                          +91 7416199466
                        </p>

                        <div className="flex items-center gap-2">
                          <a
                            href="tel:+917416199466"
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-[#C3E41D] hover:text-black dark:hover:bg-[#C3E41D] dark:hover:text-black transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call</span>
                          </a>

                          <a
                            href="https://wa.me/917416199466"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500 hover:text-white transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                            <ExternalLink className="w-3 h-3 opacity-70" />
                          </a>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard("+917416199466", "phone")}
                      title="Copy phone to clipboard"
                      className="p-2 rounded-lg text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-[#C3E41D] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Location Card */}
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#1A1A20] border border-neutral-200/80 dark:border-neutral-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase text-neutral-500 dark:text-neutral-400">
                      Location
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      Palakol, Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </TimelineContent>

            {/* Interactive 3D Wireframe Globe */}
            <TimelineContent animationNum={4}>
              <GlobeWireframe />
            </TimelineContent>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: Contact Message Form                        */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <TimelineContent animationNum={3}>
              <div className="p-6 sm:p-10 rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/50 border border-neutral-200/90 dark:border-neutral-800 backdrop-blur-xl shadow-lg">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200/80 dark:border-neutral-800">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                      Send a Message
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      Directly delivered to <span className="font-mono text-neutral-800 dark:text-neutral-200">rajupalanki1037@gmail.com</span>
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>AVAILABLE NOW</span>
                  </div>
                </div>

                {/* Status Banners */}
                {submitStatus === "success" && (
                  <div
                    role="alert"
                    className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3.5 text-emerald-800 dark:text-emerald-300 animate-in fade-in duration-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">Message Delivered!</p>
                      <p className="text-xs mt-0.5 opacity-90">
                        Thanks for reaching out! Your message has been sent successfully. I will get back to you shortly.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "activation_required" && (
                  <div
                    role="alert"
                    className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5 text-amber-800 dark:text-amber-300 animate-in fade-in duration-300"
                  >
                    <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-sm">One-Time Activation Required</p>
                      <p className="text-xs mt-0.5 opacity-90">
                        FormSubmit has dispatched a confirmation email to <span className="font-mono font-bold">rajupalanki1037@gmail.com</span>.
                        Please click the <strong>&quot;Activate Form&quot;</strong> link inside your Gmail inbox once to enable continuous instant forwarding.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    role="alert"
                    className="mb-6 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3.5 text-rose-800 dark:text-rose-300 animate-in fade-in duration-300"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold text-sm">Delivery Error</p>
                      <p className="text-xs mt-0.5 opacity-90">
                        Sorry, your message couldn&apos;t be sent. Please try again, or email me directly at{" "}
                        <a
                          href={`mailto:rajupalanki1037@gmail.com?subject=${encodeURIComponent(
                            formData.subject || "Portfolio Inquiry"
                          )}&body=${encodeURIComponent(formData.message)}`}
                          className="underline font-semibold hover:text-white"
                        >
                          rajupalanki1037@gmail.com
                        </a>.
                      </p>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Honeypot Anti-Spam Field */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleInputChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor={nameId}
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2"
                      >
                        Full Name <span className="text-[#C3E41D]">*</span>
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. John Doe"
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A20] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C3E41D] text-sm ${
                          errors.name
                            ? "border-rose-500 ring-1 ring-rose-500"
                            : "border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        htmlFor={emailId}
                        className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2"
                      >
                        Email Address <span className="text-[#C3E41D]">*</span>
                      </label>
                      <input
                        id={emailId}
                        name="email"
                        type="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A20] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C3E41D] text-sm ${
                          errors.email
                            ? "border-rose-500 ring-1 ring-rose-500"
                            : "border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor={subjectId}
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Subject <span className="text-[#C3E41D]">*</span>
                    </label>
                    <input
                      id={subjectId}
                      name="subject"
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Software Engineering Internship / Project Collaboration"
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A20] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C3E41D] text-sm ${
                        errors.subject
                          ? "border-rose-500 ring-1 ring-rose-500"
                          : "border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor={messageId}
                      className="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2"
                    >
                      Message <span className="text-[#C3E41D]">*</span>
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={5}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hi Thimothi, I'd like to talk about..."
                      className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1A1A20] text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500 border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C3E41D] text-sm resize-y min-h-[120px] ${
                        errors.message
                          ? "border-rose-500 ring-1 ring-rose-500"
                          : "border-neutral-300/80 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-700"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-neutral-950 dark:bg-[#C3E41D] text-white dark:text-black hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none transition-all duration-200 shadow-lg hover:shadow-xl dark:shadow-[0_4px_20px_rgba(195,228,29,0.25)] flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C3E41D]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security & Spam Notice */}
                  <p className="text-center text-[11px] text-neutral-500 dark:text-neutral-400 pt-1">
                    Protected by client-side validation & anti-spam honeypot. Your email is treated with strict confidentiality.
                  </p>
                </form>
              </div>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
