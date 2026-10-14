import React, { useState, useEffect, useRef, useId } from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Loader2,
} from "lucide-react";

// ==============================================================
// 1. Realistic Rotating Hemisphere Wireframe (Transparent, No Container)
// Solid lines at top, fading downwards with soft ambient spread
// ==============================================================
const HemisphereGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotYRef = useRef(0.8);
  const isInViewRef = useRef(true);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Observe visibility so animation sleeps when scrolled away
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // Simplified Continental Polygons (Lat, Lon coordinates)
    const continents: [number, number][][] = [
      // North America & Arctic
      [
        [72, -165], [68, -140], [60, -135], [52, -128], [42, -124],
        [32, -117], [22, -105], [16, -92], [20, -85], [26, -80],
        [32, -80], [38, -75], [45, -64], [52, -56], [60, -64],
        [68, -85], [72, -110], [74, -140], [72, -165]
      ],
      // Central & South America
      [
        [14, -88], [8, -78], [0, -80], [-10, -78], [-20, -70],
        [-32, -72], [-45, -75], [-54, -68], [-48, -64], [-38, -58],
        [-25, -48], [-12, -37], [-5, -35], [4, -50], [10, -62], [14, -88]
      ],
      // Eurasia & India
      [
        [70, 25], [72, 50], [74, 85], [72, 120], [68, 150],
        [62, 170], [55, 160], [45, 142], [35, 130], [24, 120],
        [12, 105], [22, 88], [14, 80], [24, 68], [25, 58],
        [32, 48], [38, 30], [45, 14], [54, 8], [62, 18], [70, 25]
      ],
      // Africa
      [
        [36, -6], [37, 12], [32, 32], [22, 38], [12, 50],
        [-2, 42], [-14, 38], [-26, 32], [-34, 19], [-30, 16],
        [-18, 12], [-8, 12], [4, 2], [6, -10], [14, -17],
        [24, -15], [36, -6]
      ],
      // Australia
      [
        [-12, 132], [-16, 142], [-24, 150], [-34, 151], [-38, 142],
        [-35, 134], [-34, 116], [-24, 114], [-18, 122], [-12, 132]
      ],
      // Major Island chains / Archipelago
      [
        [40, 140], [35, 136], [32, 130], [38, 142], [40, 140]
      ],
      [
        [65, -18], [63, -24], [66, -14], [65, -18]
      ]
    ];

    // Latitude parallels (Northern hemisphere & equator)
    const latLines = [0, 20, 40, 60, 75];
    // Longitude meridians every 25 degrees
    const lonLines = Array.from({ length: 15 }, (_, i) => i * 24);

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

      // Sphere geometry parameters
      // Center of globe is pushed downwards so only the top dome / hemisphere emerges
      const R = Math.max(260, width * 0.72);
      const cx = width * 0.52;
      const cy = height + R * 0.42; // Sphere center sits below canvas
      const apexY = cy - R; // Topmost point of the dome
      const fadeDepth = R * 0.85;

      // Axial tilt: tilted forward towards viewer (viewing down onto the northern hemisphere)
      const tiltX = 0.44;
      const cosTilt = Math.cos(tiltX);
      const sinTilt = Math.sin(tiltX);

      // Auto-rotation around Y axis
      rotYRef.current += 0.003;
      const currentRotY = rotYRef.current;
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // 3D coordinate projection helper
      const project = (lat: number, lon: number): { x: number; y: number; z: number; visible: boolean; alpha: number } => {
        const phi = (lat * Math.PI) / 180;
        const theta = ((lon % 360) * Math.PI) / 180;

        // Base 3D point on unit sphere
        const x0 = R * Math.cos(phi) * Math.sin(theta);
        const y0 = -R * Math.sin(phi);
        const z0 = R * Math.cos(phi) * Math.cos(theta);

        // Rotate Y (longitude)
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Tilt X
        const y2 = y0 * cosTilt - z1 * sinTilt;
        const z2 = y0 * sinTilt + z1 * cosTilt;

        const screenX = cx + x1;
        const screenY = cy + y2;

        // Fade calculation: Solid at top apex, smoothly fading downwards
        const progressFromApex = Math.max(0, screenY - apexY);
        // Soft spread gradient: 1.0 at apex, drops smoothly to 0 towards bottom
        const verticalAlpha = Math.max(0, Math.pow(Math.max(0, 1 - progressFromApex / fadeDepth), 1.6));
        const depthAlpha = z2 > 0 ? 1.0 : Math.max(0, 1 + z2 / (R * 0.8));

        return {
          x: screenX,
          y: screenY,
          z: z2,
          visible: z2 > -R * 0.35 && verticalAlpha > 0.01,
          alpha: verticalAlpha * depthAlpha,
        };
      };

      // 1. Soft Ambient Radial Glow behind the hemisphere
      const glowGrad = ctx.createRadialGradient(cx, apexY + 30, 20, cx, cy - R * 0.2, R * 1.05);
      glowGrad.addColorStop(0, "rgba(255, 255, 255, 0.08)");
      glowGrad.addColorStop(0.35, "rgba(255, 255, 255, 0.03)");
      glowGrad.addColorStop(0.7, "rgba(255, 255, 255, 0.008)");
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.05, 0, Math.PI * 2);
      ctx.fill();

      // 2. Solid Top Rim / Horizon of the Hemisphere
      // Draw outer horizon arc that fades as it descends on both sides
      const rimSegments = 90;
      for (let i = 0; i < rimSegments; i++) {
        const theta1 = Math.PI + (i / rimSegments) * Math.PI;
        const theta2 = Math.PI + ((i + 1) / rimSegments) * Math.PI;

        const x1 = cx + R * Math.cos(theta1);
        const y1 = cy + R * Math.sin(theta1);
        const x2 = cx + R * Math.cos(theta2);
        const y2 = cy + R * Math.sin(theta2);

        const midY = (y1 + y2) / 2;
        const rimAlpha = Math.max(0, Math.pow(Math.max(0, 1 - (midY - apexY) / (fadeDepth * 0.95)), 1.4));

        if (rimAlpha > 0.01) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${rimAlpha * 0.9})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      }

      // 3. Draw Longitude Meridians
      lonLines.forEach((lon) => {
        let prevPoint: { x: number; y: number; alpha: number } | null = null;
        for (let lat = -10; lat <= 85; lat += 3) {
          const p = project(lat, lon);
          if (p.visible) {
            if (prevPoint) {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(p.x, p.y);
              const avgAlpha = (prevPoint.alpha + p.alpha) / 2;
              ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha * 0.16})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
            prevPoint = { x: p.x, y: p.y, alpha: p.alpha };
          } else {
            prevPoint = null;
          }
        }
      });

      // 4. Draw Latitude Parallels
      latLines.forEach((lat) => {
        let prevPoint: { x: number; y: number; alpha: number } | null = null;
        for (let lon = 0; lon <= 360; lon += 4) {
          const p = project(lat, lon);
          if (p.visible && p.z > -R * 0.2) {
            if (prevPoint) {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(p.x, p.y);
              const avgAlpha = (prevPoint.alpha + p.alpha) / 2;
              ctx.strokeStyle = `rgba(255, 255, 255, ${avgAlpha * 0.18})`;
              ctx.lineWidth = 0.85;
              ctx.stroke();
            }
            prevPoint = { x: p.x, y: p.y, alpha: p.alpha };
          } else {
            prevPoint = null;
          }
        }
      });

      // 5. Draw Continents Outlines
      continents.forEach((poly) => {
        ctx.beginPath();
        let isDrawing = false;
        let lastAlpha = 0;

        for (let i = 0; i < poly.length; i++) {
          const [lat, lon] = poly[i];
          const p = project(lat, lon);

          if (p.visible && p.z > 0) {
            if (!isDrawing) {
              ctx.moveTo(p.x, p.y);
              isDrawing = true;
            } else {
              ctx.lineTo(p.x, p.y);
            }
            lastAlpha = Math.max(lastAlpha, p.alpha);
          } else {
            if (isDrawing) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${lastAlpha * 0.85})`;
              ctx.lineWidth = 1.35;
              ctx.stroke();
              ctx.beginPath();
              isDrawing = false;
              lastAlpha = 0;
            }
          }
        }

        if (isDrawing) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${lastAlpha * 0.85})`;
          ctx.lineWidth = 1.35;
          ctx.stroke();
        }
      });

      ctx.restore();
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] pointer-events-none select-none overflow-hidden"
      style={{
        // Soft bottom and side spread gradient mask so the edges gently dissipate into the page
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.92) 30%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

// ==============================================================
// 2. Main Contact Section (Equal Height, Clean Design matching Screenshot)
// ==============================================================
export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
    _gotcha: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "activation_required"
  >("idle");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const nameId = useId();
  const subjectId = useId();
  const emailId = useId();
  const messageId = useId();

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (formData.message.trim().length < 8) {
      newErrors.message = "Message should be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (isSubmitting) return;

    if (formData._gotcha) {
      setSubmitStatus("success");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const targetEndpoint =
      import.meta.env.VITE_CONTACT_ENDPOINT ||
      "https://formsubmit.co/ajax/rajupalanki1037@gmail.com";

    const payload = {
      name: formData.name.trim(),
      _subject: `[Portfolio Contact] ${formData.subject.trim()}`,
      email: formData.email.trim(),
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
          subject: "",
          email: "",
          message: "",
          _gotcha: "",
        });
      } else if (result?.message && result.message.toLowerCase().includes("activation")) {
        setSubmitStatus("activation_required");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Submission failed:", err);
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
      className="relative w-full py-16 sm:py-24 bg-neutral-950 text-neutral-100 transition-colors duration-500 overflow-hidden"
    >
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Equal-Height Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Clean open contact details + Rotating Hemisphere */}
          {/* ======================================================== */}
          <div className="flex flex-col justify-between h-full">
            {/* Top Info Area */}
            <div className="space-y-6 pt-2">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
                  Get in touch
                </h2>
                <p className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-md">
                  I am currently looking for engineering internships, technical collaborations, and software projects. Drop a message and let&apos;s coordinate!
                </p>
              </div>

              {/* Contact Channels (Clean icon buttons + text, no enclosing box) */}
              <div className="space-y-3.5 pt-2">
                {/* Email */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-700 flex items-center justify-center shrink-0 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:rajupalanki1037@gmail.com"
                    className="text-sm sm:text-base text-neutral-300 hover:text-white transition-colors break-all"
                  >
                    rajupalanki1037@gmail.com
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("rajupalanki1037@gmail.com", "email")}
                    title="Copy email address"
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-white transition-colors"
                  >
                    {copiedEmail ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                    )}
                  </button>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white group-hover:border-neutral-700 flex items-center justify-center shrink-0 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="tel:+917416199466"
                      className="text-sm sm:text-base text-neutral-300 hover:text-white transition-colors"
                    >
                      +91 7416199466
                    </a>
                    <a
                      href="https://wa.me/917416199466"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open WhatsApp chat"
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard("+917416199466", "phone")}
                    title="Copy phone number"
                    className="p-1.5 rounded-lg text-neutral-500 hover:text-white transition-colors"
                  >
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3.5 group">
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm sm:text-base text-neutral-300">
                    Palakol, Andhra Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            {/* Rotating Hemisphere (Presented right on the page background, no container box) */}
            <div className="mt-6 pt-4">
              <HemisphereGlobe />
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Sleek Form Card (Matching Screenshot)       */}
          {/* ======================================================== */}
          <div className="h-full flex flex-col justify-center">
            <div className="h-full p-6 sm:p-9 rounded-3xl bg-[#111113] border border-neutral-800/90 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-1.5">
                    Send a message
                  </h3>
                  <p className="text-sm text-neutral-400">
                    Fill out the form and we&apos;ll get back to you promptly.
                  </p>
                </div>

                {/* Status Banners */}
                {submitStatus === "success" && (
                  <div
                    role="alert"
                    className="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs">
                      Thanks for reaching out! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                {submitStatus === "activation_required" && (
                  <div
                    role="alert"
                    className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-300"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs">
                      FormSubmit sent a confirmation link to <span className="font-mono font-bold">rajupalanki1037@gmail.com</span>. Click <strong>&quot;Activate Form&quot;</strong> in your inbox to enable direct delivery.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    role="alert"
                    className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <p className="text-xs">
                      Sorry, your message couldn&apos;t be sent. Please try again or email directly at rajupalanki1037@gmail.com.
                    </p>
                  </div>
                )}

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Honeypot */}
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

                  {/* Row 1: Full Name & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor={nameId}
                        className="block text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-1.5"
                      >
                        FULL NAME
                      </label>
                      <input
                        id={nameId}
                        name="name"
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#19191D] text-white placeholder:text-neutral-600 border text-sm transition-all focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 ${
                          errors.name ? "border-rose-500" : "border-neutral-800"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={subjectId}
                        className="block text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-1.5"
                      >
                        SUBJECT
                      </label>
                      <input
                        id={subjectId}
                        name="subject"
                        type="text"
                        required
                        disabled={isSubmitting}
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="e.g. Internship / Project"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#19191D] text-white placeholder:text-neutral-600 border text-sm transition-all focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 ${
                          errors.subject ? "border-rose-500" : "border-neutral-800"
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-[11px] text-rose-400">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address */}
                  <div>
                    <label
                      htmlFor={emailId}
                      className="block text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-1.5"
                    >
                      EMAIL ADDRESS
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
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#19191D] text-white placeholder:text-neutral-600 border text-sm transition-all focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 ${
                        errors.email ? "border-rose-500" : "border-neutral-800"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-rose-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label
                      htmlFor={messageId}
                      className="block text-[11px] font-mono tracking-widest uppercase text-neutral-400 mb-1.5"
                    >
                      MESSAGE
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      rows={4}
                      required
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Type your message here"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#19191D] text-white placeholder:text-neutral-600 border text-sm resize-y min-h-[95px] transition-all focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 ${
                        errors.message ? "border-rose-500" : "border-neutral-800"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button (Pill button matching screenshot) */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-white text-black hover:bg-neutral-200 active:scale-95 disabled:opacity-50 transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
