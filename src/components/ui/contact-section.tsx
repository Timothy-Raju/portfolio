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
// 1. Realistic Rotating Hemisphere Globe (Transparent, Full Top Dome)
// Solid lines at top, fading downwards with soft spread
// Supports both Light Mode (charcoal/slate) and Dark Mode (crisp white)
// ==============================================================
const HemisphereGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotYRef = useRef(0.85);
  const isInViewRef = useRef(true);
  const animFrameRef = useRef<number | null>(null);
  const isDarkRef = useRef(true);

  // Sync theme with document classList
  useEffect(() => {
    const updateTheme = () => {
      isDarkRef.current = document.documentElement.classList.contains("dark");
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    // ============================================================
    // Comprehensive Real-World Geographic Continental Outlines
    // ============================================================
    const continents: [number, number][][] = [
      // 1. North America (Alaska, Canada, US, Mexico)
      [
        [71, -156], [68, -166], [64, -165], [60, -166], [55, -162],
        [57, -152], [59, -139], [54, -133], [54, -130], [48, -124],
        [43, -124], [38, -123], [34, -119], [32, -117], [28, -114],
        [23, -110], [24, -111], [31, -114], [23, -107], [19, -104],
        [15, -96], [14, -92], [9, -83], [8, -77], [10, -74],
        [9, -82], [15, -88], [21, -89], [22, -97], [26, -97],
        [29, -94], [30, -88], [28, -83], [25, -80], [28, -80],
        [31, -81], [35, -75], [39, -74], [41, -72], [44, -69],
        [44, -64], [47, -64], [47, -53], [51, -55], [53, -60],
        [58, -62], [62, -65], [62, -78], [58, -80], [53, -80],
        [56, -90], [60, -94], [64, -88], [69, -85], [74, -95],
        [70, -120], [70, -140], [71, -156]
      ],
      // 2. Greenland
      [
        [78, -20], [70, -22], [60, -44], [65, -53], [72, -55],
        [78, -70], [83, -30], [78, -20]
      ],
      // 3. Central & South America
      [
        [12, -72], [8, -77], [0, -80], [-5, -81], [-14, -76],
        [-23, -70], [-33, -71], [-42, -74], [-53, -75], [-55, -67],
        [-50, -68], [-42, -64], [-35, -57], [-24, -46], [-13, -38],
        [-5, -35], [0, -50], [5, -53], [10, -62], [11, -71], [12, -72]
      ],
      // 4. Scandinavia & Baltic
      [
        [71, 28], [70, 20], [64, 11], [58, 6], [56, 12],
        [59, 18], [65, 23], [66, 14], [68, 14], [71, 28]
      ],
      // 5. British Isles
      [
        [58, -5], [55, -2], [51, 1], [50, -5], [53, -4],
        [55, -6], [58, -5]
      ],
      [
        [55, -7], [52, -10], [51, -9], [53, -6], [55, -7]
      ],
      // 6. Western Europe, Iberia & Italy
      [
        [53, 5], [49, -1], [46, -1], [43, -9], [37, -9],
        [36, -6], [38, 0], [43, 3], [44, 8], [41, 14],
        [38, 15], [40, 18], [45, 12], [46, 2], [51, 3], [53, 5]
      ],
      // 7. Africa & Mediterranean coast
      [
        [37, 10], [33, 11], [32, 24], [31, 32], [27, 34],
        [13, 43], [11, 51], [2, 45], [-11, 40], [-25, 33],
        [-34, 19], [-34, 18], [-28, 15], [-16, 12], [-5, 12],
        [4, 9], [5, 1], [5, -7], [10, -14], [15, -17],
        [21, -17], [28, -13], [35, -6], [37, 10]
      ],
      // Madagascar
      [
        [-12, 49], [-16, 44], [-25, 47], [-21, 48], [-12, 49]
      ],
      // 8. Arabian Peninsula
      [
        [30, 33], [28, 35], [20, 39], [13, 45], [15, 52],
        [23, 58], [26, 56], [30, 48], [30, 33]
      ],
      // 9. Eurasia & India Subcontinent
      [
        [70, 30], [70, 60], [72, 90], [70, 130], [65, 170],
        [60, 165], [55, 160], [45, 140], [35, 130], [25, 120],
        [22, 114], [16, 108], [10, 104], [2, 103], [8, 98],
        [16, 96], [22, 89], [20, 86], [16, 82], [13, 80],
        [10, 80], [8, 77], [10, 76], [15, 74], [19, 73],
        [22, 69], [24, 69], [25, 60], [30, 50], [35, 35],
        [41, 29], [44, 38], [47, 47], [40, 50], [37, 54],
        [47, 51], [55, 35], [60, 30], [70, 30]
      ],
      // 10. Japan
      [
        [45, 142], [43, 145], [38, 141], [35, 140], [34, 133],
        [33, 130], [35, 136], [40, 140], [45, 142]
      ],
      // 11. Australia
      [
        [-11, 142], [-17, 146], [-25, 153], [-37, 150], [-39, 146],
        [-35, 138], [-35, 115], [-22, 114], [-15, 124], [-12, 133],
        [-11, 142]
      ],
    ];

    // Latitude parallels (from equator 0 to 75° North)
    const latLines = [0, 15, 30, 45, 60, 75];
    // Longitude meridians every 20 degrees around the globe
    const lonLines = Array.from({ length: 18 }, (_, i) => i * 20);

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

      const isDark = isDarkRef.current;

      // Theme-dependent color tokens
      const strokeRGB = isDark ? "255, 255, 255" : "24, 24, 27";
      const glowRGB = isDark ? "255, 255, 255" : "0, 0, 0";
      const beaconColor = isDark ? "#C3E41D" : "#495902";

      // ==========================================================
      // Geometry: Positioned so the ENTIRE top hemisphere is in view
      // Equator is right near the bottom, apex rises near the top
      // ==========================================================
      const R = Math.min(width * 0.48, height * 0.88);
      const cx = width * 0.5;
      const cy = height - 8; // Equator positioned near the bottom edge
      const apexY = cy - R; // Top apex of the hemisphere dome

      // Forward axial tilt (looking down onto northern hemisphere)
      const tiltX = 0.42;
      const cosTilt = Math.cos(tiltX);
      const sinTilt = Math.sin(tiltX);

      // Continuous smooth auto-rotation around Y axis
      rotYRef.current += 0.0035;
      const cosY = Math.cos(rotYRef.current);
      const sinY = Math.sin(rotYRef.current);

      // 3D Spherical Projection Function
      const project = (
        lat: number,
        lon: number
      ): { x: number; y: number; z: number; visible: boolean; alpha: number } => {
        const phi = (lat * Math.PI) / 180;
        const theta = ((lon % 360) * Math.PI) / 180;

        // Base 3D coordinates
        const x0 = R * Math.cos(phi) * Math.sin(theta);
        const y0 = -R * Math.sin(phi);
        const z0 = R * Math.cos(phi) * Math.cos(theta);

        // Rotate Y (longitude spin)
        const x1 = x0 * cosY + z0 * sinY;
        const z1 = -x0 * sinY + z0 * cosY;

        // Tilt X (axial viewpoint)
        const y2 = y0 * cosTilt - z1 * sinTilt;
        const z2 = y0 * sinTilt + z1 * cosTilt;

        const screenX = cx + x1;
        const screenY = cy + y2;

        // Smooth fade: Solid at top apex, smoothly fading downwards towards equator
        const progressFromApex = Math.max(0, screenY - apexY);
        // Alpha drops smoothly from 1.0 to 0.05 near bottom
        const verticalFade = Math.max(0, Math.pow(Math.max(0, 1 - progressFromApex / (R * 1.08)), 1.3));
        const depthFactor = z2 > 0 ? 1.0 : Math.max(0, 1 + z2 / (R * 0.65));

        return {
          x: screenX,
          y: screenY,
          z: z2,
          visible: z2 > -R * 0.25 && verticalFade > 0.02,
          alpha: verticalFade * depthFactor,
        };
      };

      // 1. Soft Ambient Radial Glow
      const glowGrad = ctx.createRadialGradient(cx, apexY + 30, 15, cx, cy - R * 0.2, R * 1.08);
      glowGrad.addColorStop(0, `rgba(${glowRGB}, ${isDark ? 0.09 : 0.04})`);
      glowGrad.addColorStop(0.4, `rgba(${glowRGB}, ${isDark ? 0.03 : 0.015})`);
      glowGrad.addColorStop(0.75, `rgba(${glowRGB}, ${isDark ? 0.008 : 0.004})`);
      glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
      ctx.fill();

      // 2. Solid Horizon Outer Arc (Top semicircle of hemisphere)
      const rimSegments = 100;
      for (let i = 0; i < rimSegments; i++) {
        const theta1 = Math.PI + (i / rimSegments) * Math.PI;
        const theta2 = Math.PI + ((i + 1) / rimSegments) * Math.PI;

        const x1 = cx + R * Math.cos(theta1);
        const y1 = cy + R * Math.sin(theta1);
        const x2 = cx + R * Math.cos(theta2);
        const y2 = cy + R * Math.sin(theta2);

        const midY = (y1 + y2) / 2;
        const rimAlpha = Math.max(
          0,
          Math.pow(Math.max(0, 1 - (midY - apexY) / (R * 1.05)), 1.2)
        );

        if (rimAlpha > 0.01) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(${strokeRGB}, ${rimAlpha * 0.95})`;
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
      }

      // 3. Longitude Meridians
      lonLines.forEach((lon) => {
        let prevPoint: { x: number; y: number; alpha: number } | null = null;
        for (let lat = -5; lat <= 85; lat += 2.5) {
          const p = project(lat, lon);
          if (p.visible) {
            if (prevPoint) {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(p.x, p.y);
              const avgAlpha = (prevPoint.alpha + p.alpha) / 2;
              ctx.strokeStyle = `rgba(${strokeRGB}, ${avgAlpha * 0.22})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();
            }
            prevPoint = { x: p.x, y: p.y, alpha: p.alpha };
          } else {
            prevPoint = null;
          }
        }
      });

      // 4. Latitude Parallels
      latLines.forEach((lat) => {
        let prevPoint: { x: number; y: number; alpha: number } | null = null;
        for (let lon = 0; lon <= 360; lon += 3.5) {
          const p = project(lat, lon);
          if (p.visible && p.z > -R * 0.15) {
            if (prevPoint) {
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(p.x, p.y);
              const avgAlpha = (prevPoint.alpha + p.alpha) / 2;
              ctx.strokeStyle = `rgba(${strokeRGB}, ${avgAlpha * 0.25})`;
              ctx.lineWidth = lat === 0 ? 1.2 : 0.9;
              ctx.stroke();
            }
            prevPoint = { x: p.x, y: p.y, alpha: p.alpha };
          } else {
            prevPoint = null;
          }
        }
      });

      // 5. High-Fidelity Continental Boundaries & Coastlines
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
              ctx.strokeStyle = `rgba(${strokeRGB}, ${lastAlpha * 0.92})`;
              ctx.lineWidth = 1.6;
              ctx.stroke();
              ctx.beginPath();
              isDrawing = false;
              lastAlpha = 0;
            }
          }
        }

        if (isDrawing) {
          ctx.strokeStyle = `rgba(${strokeRGB}, ${lastAlpha * 0.92})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
      });

      // 6. Subtle Location Beacon: Palakol, Andhra Pradesh, India (16.5° N, 81.7° E)
      const beacon = project(16.5, 81.7);
      if (beacon.visible && beacon.z > 0) {
        ctx.beginPath();
        ctx.arc(beacon.x, beacon.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = beaconColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(beacon.x, beacon.y, 8, 0, Math.PI * 2);
        ctx.strokeStyle = beaconColor;
        ctx.lineWidth = 1.2;
        ctx.stroke();
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] sm:h-[320px] md:h-[350px] pointer-events-none select-none overflow-hidden"
      style={{
        // Smooth spread mask at the bottom so the edges fade seamlessly into page background
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)",
        maskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 45%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0) 100%)",
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};

// ==============================================================
// 2. Main Contact Section (Full Light & Dark Mode, Equal Height)
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
      className="relative w-full py-16 sm:py-24 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-500 overflow-hidden scroll-mt-20 sm:scroll-mt-24"
    >
      <div className="w-full max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header (Horizontally aligned on top of contact info and form) */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 dark:text-white mb-2.5">
            Get in touch
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed max-w-2xl">
            I am currently looking for engineering internships, technical collaborations, and software projects. Drop a message and let&apos;s coordinate!
          </p>
        </div>

        {/* Two-Column Layout Underneath */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: Contact Channels + Rotating Hemisphere        */}
          {/* ======================================================== */}
          <div className="flex flex-col">
            {/* Contact Channels */}
            <div className="space-y-3">
              {/* Email */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:border-neutral-400 dark:group-hover:border-neutral-700 flex items-center justify-center shrink-0 shadow-xs transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:rajupalanki1037@gmail.com"
                  className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors break-all font-medium"
                >
                  rajupalanki1037@gmail.com
                </a>
                <button
                  type="button"
                  onClick={() => copyToClipboard("rajupalanki1037@gmail.com", "email")}
                  title="Copy email address"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                  )}
                </button>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-950 dark:group-hover:text-white group-hover:border-neutral-400 dark:group-hover:border-neutral-700 flex items-center justify-center shrink-0 shadow-xs transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+917416199466"
                    className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors font-medium"
                  >
                    +91 7416199466
                  </a>
                  <a
                    href="https://wa.me/917416199466"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open WhatsApp chat"
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/20 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard("+917416199466", "phone")}
                  title="Copy phone number"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
                >
                  {copiedPhone ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60 hover:opacity-100" />
                  )}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 group">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-400 flex items-center justify-center shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base text-neutral-800 dark:text-neutral-300 font-medium">
                  Palakol, Andhra Pradesh, India
                </span>
              </div>
            </div>

            {/* Rotating Hemisphere: Snug and close directly underneath contact channels */}
            <div className="-mt-3 sm:-mt-5">
              <HemisphereGlobe />
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Form Card (Natural height, no stretching)    */}
          {/* ======================================================== */}
          <div>
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111113] border border-neutral-200/90 dark:border-neutral-800/90 shadow-xl dark:shadow-2xl transition-colors">
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white mb-1.5">
                    Send a message
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Fill out the form and we&apos;ll get back to you promptly.
                  </p>
                </div>

                {/* Status Banners */}
                {submitStatus === "success" && (
                  <div
                    role="alert"
                    className="mb-5 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3 text-emerald-800 dark:text-emerald-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs">
                      Thanks for reaching out! Your message has been sent successfully.
                    </p>
                  </div>
                )}

                {submitStatus === "activation_required" && (
                  <div
                    role="alert"
                    className="mb-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-amber-800 dark:text-amber-300"
                  >
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs">
                      FormSubmit sent a confirmation link to <span className="font-mono font-bold">rajupalanki1037@gmail.com</span>. Click <strong>&quot;Activate Form&quot;</strong> in your inbox to enable direct delivery.
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    role="alert"
                    className="mb-5 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-800 dark:text-rose-300"
                  >
                    <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
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
                        className="block text-[11px] font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400 mb-1.5"
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
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#19191D] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 border text-sm transition-all focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 ${
                          errors.name
                            ? "border-rose-500"
                            : "border-neutral-300 dark:border-neutral-800"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor={subjectId}
                        className="block text-[11px] font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400 mb-1.5"
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
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#19191D] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 border text-sm transition-all focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 ${
                          errors.subject
                            ? "border-rose-500"
                            : "border-neutral-300 dark:border-neutral-800"
                        }`}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Email Address */}
                  <div>
                    <label
                      htmlFor={emailId}
                      className="block text-[11px] font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400 mb-1.5"
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
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#19191D] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 border text-sm transition-all focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 ${
                        errors.email
                          ? "border-rose-500"
                          : "border-neutral-300 dark:border-neutral-800"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Row 3: Message */}
                  <div>
                    <label
                      htmlFor={messageId}
                      className="block text-[11px] font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400 mb-1.5"
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
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 dark:bg-[#19191D] text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600 border text-sm resize-y min-h-[95px] transition-all focus:outline-none focus:border-neutral-900 dark:focus:border-neutral-500 focus:ring-1 focus:ring-neutral-900 dark:focus:ring-neutral-500 ${
                        errors.message
                          ? "border-rose-500"
                          : "border-neutral-300 dark:border-neutral-800"
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-[11px] text-rose-600 dark:text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 active:scale-95 disabled:opacity-50 transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
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
