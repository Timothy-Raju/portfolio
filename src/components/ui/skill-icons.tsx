import React from "react";

export interface SkillMeta {
  name: string;
  category: string;
  brandColor: string;
  badge?: string;
  badgeType?: "accent" | "neutral";
}

export const SKILLS_DATA: Record<string, SkillMeta> = {
  Java: {
    name: "Java",
    category: "Languages",
    brandColor: "#E76F00",
    badge: "Strong • OOP & DSA",
    badgeType: "accent",
  },
  Python: {
    name: "Python",
    category: "Languages",
    brandColor: "#3776AB",
    badge: "Intermediate",
    badgeType: "neutral",
  },
  C: {
    name: "C",
    category: "Languages",
    brandColor: "#00599C",
    badge: "Intermediate",
    badgeType: "neutral",
  },
  HTML: {
    name: "HTML5",
    category: "Web Tech",
    brandColor: "#E34F26",
  },
  CSS: {
    name: "CSS3",
    category: "Web Tech",
    brandColor: "#1572B6",
  },
  JavaScript: {
    name: "JavaScript",
    category: "Web Tech",
    brandColor: "#F7DF1E",
  },
  "React.js": {
    name: "React.js",
    category: "Frameworks",
    brandColor: "#61DAFB",
  },
  "Node.js": {
    name: "Node.js",
    category: "Runtime",
    brandColor: "#539E43",
  },
  "Express.js": {
    name: "Express.js",
    category: "Backend",
    brandColor: "#64748B",
  },
  MySQL: {
    name: "MySQL",
    category: "Databases",
    brandColor: "#00758F",
  },
  MongoDB: {
    name: "MongoDB",
    category: "Databases",
    brandColor: "#13AA52",
  },
  Git: {
    name: "Git",
    category: "Tools",
    brandColor: "#F05032",
  },
  GitHub: {
    name: "GitHub",
    category: "Tools",
    brandColor: "#8B949E",
  },
  "VS Code": {
    name: "VS Code",
    category: "Tools",
    brandColor: "#007ACC",
  },
  "Google Colab": {
    name: "Google Colab",
    category: "Tools",
    brandColor: "#F9AB00",
  },
  "Amazon EC2": {
    name: "Amazon EC2",
    category: "Cloud Compute",
    brandColor: "#FF9900",
  },
  "Amazon S3": {
    name: "Amazon S3",
    category: "Cloud Storage",
    brandColor: "#569A31",
  },
  "AWS IAM": {
    name: "AWS IAM",
    category: "Cloud Security",
    brandColor: "#DD344C",
  },
  "Amazon RDS": {
    name: "Amazon RDS",
    category: "Cloud Databases",
    brandColor: "#527FFF",
  },
  "Amazon VPC": {
    name: "Amazon VPC",
    category: "Cloud Network",
    brandColor: "#8C4FFF",
  },
  "Amazon CloudWatch": {
    name: "Amazon CloudWatch",
    category: "Cloud Observability",
    brandColor: "#E7157B",
  },
  "AWS CloudFormation": {
    name: "AWS CloudFormation",
    category: "Infrastructure as Code",
    brandColor: "#FF5252",
  },
  "Time Management": {
    name: "Time Management",
    category: "Soft Skills",
    brandColor: "#10B981",
  },
  Teamwork: {
    name: "Teamwork",
    category: "Soft Skills",
    brandColor: "#06B6D4",
  },
  "Problem Solving": {
    name: "Problem Solving",
    category: "Soft Skills",
    brandColor: "#8B5CF6",
  },
  Accountability: {
    name: "Accountability",
    category: "Soft Skills",
    brandColor: "#C3E41D",
  },
};

export const SkillIcon: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = "w-6 h-6" }) => {
  switch (name) {
    case "Java":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Steam curves */}
          <path
            d="M8.5 3.5C7.8 4.7 8.2 5.9 9.5 6.8C10.8 7.7 10.5 8.9 9.8 10"
            stroke="#E76F00"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M13.5 2C12.5 3.6 13 5.2 14.8 6.5C16.5 7.8 16 9.5 15 11"
            stroke="#E76F00"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Coffee cup */}
          <path
            d="M5 11H17C17 11 17.5 16 11 16C4.5 16 5 11 5 11Z"
            fill="#5382A1"
          />
          <path
            d="M17 12H18.5C19.9 12 21 13.1 21 14.5C21 15.9 19.9 17 18.5 17H16"
            stroke="#5382A1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Saucer */}
          <path
            d="M3.5 19.5C6 21 16 21 18.5 19.5"
            stroke="#E76F00"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
      );

    case "Python":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blue snake */}
          <path
            d="M11.9 2C8.7 2 6.8 3.4 6.8 5.6V7.3H12V8.1H4.8C2.6 8.1 1.2 10 1.2 13.2C1.2 16.5 2.8 17.8 5.2 17.8H6.8V15.4C6.8 13.1 8.7 11.3 11 11.3H15.2C16.8 11.3 18.2 9.9 18.2 8.3V5.6C18.2 3.4 15.2 2 11.9 2ZM9.3 4C9.8 4 10.2 4.4 10.2 4.9C10.2 5.4 9.8 5.8 9.3 5.8C8.8 5.8 8.4 5.4 8.4 4.9C8.4 4.4 8.8 4 9.3 4Z"
            fill="#3776AB"
          />
          {/* Yellow snake */}
          <path
            d="M12.1 22C15.3 22 17.2 20.6 17.2 18.4V16.7H12V15.9H19.2C21.4 15.9 22.8 14 22.8 10.8C22.8 7.5 21.2 6.2 18.8 6.2H17.2V8.6C17.2 10.9 15.3 12.7 13 12.7H8.8C7.2 12.7 5.8 14.1 5.8 15.7V18.4C5.8 20.6 8.8 22 12.1 22ZM14.7 20C14.2 20 13.8 19.6 13.8 19.1C13.8 18.6 14.2 18.2 14.7 18.2C15.2 18.2 15.6 18.6 15.6 19.1C15.6 19.6 15.2 20 14.7 20Z"
            fill="#FFD438"
          />
        </svg>
      );

    case "C":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield / Hexagon outer */}
          <path
            d="M12 2L20.5 6.9V17.1L12 22L3.5 17.1V6.9L12 2Z"
            fill="#00599C"
          />
          <path
            d="M12 4.2L18.8 8.1V15.9L12 19.8L5.2 15.9V8.1L12 4.2Z"
            fill="#00447C"
          />
          {/* C letter */}
          <path
            d="M15.5 8.8C14.7 7.9 13.5 7.4 12.1 7.4C9.5 7.4 7.5 9.4 7.5 12C7.5 14.6 9.5 16.6 12.1 16.6C13.5 16.6 14.7 16.1 15.5 15.2L14.1 13.8C13.6 14.3 12.9 14.6 12.1 14.6C10.7 14.6 9.6 13.5 9.6 12C9.6 10.5 10.7 9.4 12.1 9.4C12.9 9.4 13.6 9.7 14.1 10.2L15.5 8.8Z"
            fill="white"
          />
        </svg>
      );

    case "HTML":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield */}
          <path
            d="M3 2L4.6 20.2L12 22.2L19.4 20.2L21 2H3Z"
            fill="#E44D26"
          />
          <path
            d="M12 3.8V20.3L17.9 18.7L19.2 3.8H12Z"
            fill="#F16529"
          />
          {/* White '5' */}
          <path
            d="M12 8.3H7.5L7.8 11.2H12V8.3ZM12 13.9H9.4L9.6 16.1L12 16.8V13.9Z"
            fill="#EBEBEB"
          />
          <path
            d="M12 8.3V11.2H16.1L15.7 15.6L12 16.7V19.7L17.3 18.2L17.8 13.9L18 11.2L18.3 8.3H12Z"
            fill="white"
          />
          <path
            d="M12 19.7L6.7 18.2L6.3 14H8.8L9.1 16.1L12 16.8V19.7Z"
            fill="#EBEBEB"
          />
        </svg>
      );

    case "CSS":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield */}
          <path
            d="M3 2L4.6 20.2L12 22.2L19.4 20.2L21 2H3Z"
            fill="#1572B6"
          />
          <path
            d="M12 3.8V20.3L17.9 18.7L19.2 3.8H12Z"
            fill="#33A9DC"
          />
          {/* White '3' */}
          <path
            d="M12 8.3H7.5L7.8 11.2H12V8.3ZM12 13.9H9.4L9.6 16.1L12 16.8V13.9Z"
            fill="#EBEBEB"
          />
          <path
            d="M12 8.3V11.2H16.1L15.7 15.6L12 16.7V19.7L17.3 18.2L18.3 8.3H12Z"
            fill="white"
          />
          <path
            d="M12 13.9V11.2H16.1L15.9 13.9H12Z"
            fill="white"
          />
        </svg>
      );

    case "JavaScript":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path
            d="M7.5 18.5C8.4 18.5 9.1 18.1 9.5 17.4C9.9 16.7 9.8 15.4 9.8 14H8.2C8.2 15.3 8.3 16.1 8 16.5C7.8 16.8 7.4 17 6.9 17C6.3 17 5.9 16.6 5.8 16.1C5.6 15.6 5.6 14.8 5.6 13.8H4C4 15.2 4.1 16.3 4.5 17.1C5 18 6.1 18.5 7.5 18.5ZM14.8 18.6C16.3 18.6 17.5 18 18.2 17.1C18.9 16.2 19.2 14.9 19.2 13.5C19.2 12.1 18.8 11.1 18 10.4C17.2 9.7 16.1 9.2 14.9 8.8L14.2 8.6C13.5 8.3 13 8 12.7 7.7C12.4 7.4 12.2 7 12.2 6.5C12.2 5.9 12.4 5.5 12.8 5.2C13.2 4.9 13.8 4.7 14.5 4.7C15.2 4.7 15.8 4.9 16.2 5.3C16.6 5.7 16.8 6.3 16.8 7.1H18.4C18.4 6 17.9 5 17.1 4.2C16.3 3.4 15.2 3.1 13.8 3.1C12.4 3.1 11.3 3.6 10.6 4.4C9.9 5.2 9.5 6.2 9.5 7.4C9.5 8.6 9.9 9.6 10.6 10.3C11.3 11 12.4 11.5 13.6 11.9L14.3 12.1C15.1 12.4 15.7 12.8 16 13.2C16.3 13.6 16.5 14.2 16.5 14.9C16.5 15.6 16.2 16.1 15.7 16.5C15.2 16.9 14.4 17.1 13.5 17.1C12.6 17.1 11.9 16.9 11.4 16.4C10.9 15.9 10.6 15.1 10.5 14.1H8.8C8.9 15.4 9.4 16.5 10.3 17.4C11.3 18.2 12.8 18.6 14.8 18.6Z"
            fill="#000000"
          />
        </svg>
      );

    case "React.js":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.6"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.6"
            transform="rotate(60 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9.5"
            ry="3.6"
            transform="rotate(120 12 12)"
            stroke="#61DAFB"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="12" r="1.8" fill="#61DAFB" />
        </svg>
      );

    case "Node.js":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagon */}
          <path
            d="M12 2L21 7.2V16.8L12 22L3 16.8V7.2L12 2Z"
            fill="#539E43"
          />
          {/* Node N letter form */}
          <path
            d="M8.5 7.5V16.5H10.5V11.2L13.8 16.5H15.5V7.5H13.5V12.8L10.2 7.5H8.5Z"
            fill="white"
          />
        </svg>
      );

    case "Express.js":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="24" height="24" rx="5" fill="#1E293B" />
          <path
            d="M6 8H11V9.8H8V11.2H10.5V13H8V14.4H11.2V16.2H6V8Z"
            fill="#F8FAFC"
          />
          <path
            d="M12.5 8H14.6L16.2 11.2L17.8 8H19.9L17.4 12.1L20 16.2H17.8L16.1 13L14.4 16.2H12.3L15 12.1L12.5 8Z"
            fill="#38BDF8"
          />
        </svg>
      );

    case "MySQL":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dolphin silhouette */}
          <path
            d="M21 8.5C20.5 7.8 19 6 16.5 5.5C14 5 12.5 6 11 7C9.5 8 7 9.5 5 9.5C3 9.5 2 8.5 2 8.5C2 8.5 2.5 11.5 5.5 12.5C8.5 13.5 11 11.5 13 10.5C15 9.5 17 9 18.5 10C20 11 21.5 13 22 15C22 15 22.5 12 21 8.5Z"
            fill="#00758F"
          />
          {/* Waves / Splash */}
          <path
            d="M3 16C5 15.5 7 16.5 9 16C11 15.5 13 14 15 14C17 14 19 15.5 21 16"
            stroke="#F29111"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 19C6.5 18.5 8.5 19.5 11 19C13.5 18.5 16 17 18.5 17"
            stroke="#00758F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "MongoDB":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Leaf outline */}
          <path
            d="M12 2C12 2 6 7.5 6 13C6 17 8.5 20.5 12 22C15.5 20.5 18 17 18 13C18 7.5 12 2 12 2Z"
            fill="#13AA52"
          />
          {/* Center stem split */}
          <path
            d="M12 2.5V21.5C12 21.5 11.2 19 11.2 13C11.2 8.5 12 2.5 12 2.5Z"
            fill="#118D44"
          />
          <path
            d="M12 21.5C12 21.5 12.8 19 12.8 13C12.8 8.5 12 2.5 12 2.5V21.5Z"
            fill="#3FA037"
          />
        </svg>
      );

    case "Git":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rotated rhombus */}
          <rect
            x="12"
            y="1"
            width="15"
            height="15"
            rx="2.5"
            transform="rotate(45 12 1)"
            fill="#F05032"
          />
          {/* Branch lines */}
          <circle cx="8" cy="12" r="1.5" fill="white" />
          <circle cx="16" cy="8" r="1.5" fill="white" />
          <circle cx="16" cy="16" r="1.5" fill="white" />
          <path
            d="M8 12H12C13.5 12 14.5 10 16 8"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 12C13.5 12 14.5 14 16 16"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "GitHub":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017C2 16.444 4.865 20.198 8.839 21.524C9.339 21.616 9.52 21.308 9.52 21.045C9.52 20.812 9.512 20.194 9.507 19.375C6.726 19.982 6.138 18.033 6.138 18.033C5.684 16.877 5.03 16.57 5.03 16.57C4.123 15.949 5.099 15.962 5.099 15.962C6.103 16.033 6.632 17.001 6.632 17.001C7.523 18.537 8.968 18.093 9.537 17.836C9.628 17.187 9.886 16.744 10.17 16.494C7.95 16.242 5.617 15.38 5.617 11.536C5.617 10.441 6.007 9.544 6.647 8.844C6.544 8.59 6.202 7.568 6.745 6.196C6.745 6.196 7.585 5.927 9.495 7.226C10.293 7.003 11.15 6.892 12 6.888C12.85 6.892 13.708 7.003 14.507 7.226C16.415 5.927 17.253 6.196 17.253 6.196C17.798 7.568 17.456 8.59 17.353 8.844C17.995 9.544 18.381 10.441 18.381 11.536C18.381 15.391 16.044 16.239 13.816 16.486C14.175 16.797 14.495 17.411 14.495 18.351C14.495 19.699 14.483 20.787 14.483 21.045C14.483 21.311 14.661 21.622 15.172 21.522C19.141 20.192 22 16.441 22 12.017C22 6.484 17.522 2 12 2Z"
          />
        </svg>
      );

    case "VS Code":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 2.5L7 10.8L3.5 8L2 9.2L5 12L2 14.8L3.5 16L7 13.2L17.5 21.5L22 19.5V4.5L17.5 2.5Z"
            fill="#007ACC"
          />
          <path
            d="M17.5 2.5L7 10.8L10.5 13.5L17.5 8.2V2.5Z"
            fill="#1F8AD2"
          />
          <path
            d="M17.5 21.5L7 13.2L10.5 10.5L17.5 15.8V21.5Z"
            fill="#0066B8"
          />
          <path
            d="M17.5 8.2L10.5 13.5L7 10.8L17.5 2.5V8.2Z"
            fill="#007ACC"
            opacity="0.85"
          />
        </svg>
      );

    case "Google Colab":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Infinity loop left */}
          <path
            d="M7 7.5C4.5 7.5 2.5 9.5 2.5 12C2.5 14.5 4.5 16.5 7 16.5C9.5 16.5 11.2 14.5 12 12C11.2 9.5 9.5 7.5 7 7.5Z"
            fill="#F9AB00"
          />
          {/* Infinity loop right */}
          <path
            d="M17 7.5C14.5 7.5 12.8 9.5 12 12C12.8 14.5 14.5 16.5 17 16.5C19.5 16.5 21.5 14.5 21.5 12C21.5 9.5 19.5 7.5 17 7.5Z"
            fill="#E37400"
          />
          <circle cx="7" cy="12" r="2" fill="white" />
          <circle cx="17" cy="12" r="2" fill="white" />
        </svg>
      );

    case "Amazon EC2":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS EC2 Compute Orange */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#FF9900" />
          {/* Server / CPU Chip layout */}
          <rect x="6" y="7" width="12" height="10" rx="2" fill="#232F3E" />
          {/* Compute grid pins */}
          <line x1="8.5" y1="5.5" x2="8.5" y2="7" stroke="#FF9900" strokeWidth="1.5" />
          <line x1="12" y1="5.5" x2="12" y2="7" stroke="#FF9900" strokeWidth="1.5" />
          <line x1="15.5" y1="5.5" x2="15.5" y2="7" stroke="#FF9900" strokeWidth="1.5" />
          <line x1="8.5" y1="17" x2="8.5" y2="18.5" stroke="#FF9900" strokeWidth="1.5" />
          <line x1="12" y1="17" x2="12" y2="18.5" stroke="#FF9900" strokeWidth="1.5" />
          <line x1="15.5" y1="17" x2="15.5" y2="18.5" stroke="#FF9900" strokeWidth="1.5" />
          {/* EC2 text */}
          <text
            x="12"
            y="13.5"
            textAnchor="middle"
            fill="#FF9900"
            fontSize="5.5"
            fontWeight="bold"
            fontFamily="monospace"
          >
            EC2
          </text>
        </svg>
      );

    case "Amazon S3":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS S3 Green Storage Bucket */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#569A31" />
          {/* Bucket / Object cylinders */}
          <ellipse cx="12" cy="8" rx="6" ry="2" fill="#EBF3E8" />
          <path
            d="M6 8V12C6 13.1 8.7 14 12 14C15.3 14 18 13.1 18 12V8"
            stroke="#EBF3E8"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M6 12V16C6 17.1 8.7 18 12 18C15.3 18 18 17.1 18 16V12"
            stroke="#EBF3E8"
            strokeWidth="1.5"
            fill="none"
          />
          <text
            x="12"
            y="13.8"
            textAnchor="middle"
            fill="#569A31"
            fontSize="4.5"
            fontWeight="bold"
            fontFamily="monospace"
          >
            S3
          </text>
        </svg>
      );

    case "AWS IAM":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS IAM Red Security Shield */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#DD344C" />
          {/* Shield & Key */}
          <path
            d="M12 6L17 8.5V13C17 16 14.5 17.8 12 18.5C9.5 17.8 7 16 7 13V8.5L12 6Z"
            fill="#232F3E"
          />
          {/* Key hole / Lock */}
          <circle cx="12" cy="11.5" r="1.5" fill="#DD344C" />
          <path
            d="M11.5 12.5H12.5L12.8 15H11.2L11.5 12.5Z"
            fill="#DD344C"
          />
        </svg>
      );

    case "Amazon RDS":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS RDS Royal Blue */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#527FFF" />
          {/* Relational Database Cylinders */}
          <ellipse cx="12" cy="7.5" rx="5.5" ry="2" fill="#FFFFFF" />
          <path
            d="M6.5 7.5V11.5C6.5 12.6 9 13.5 12 13.5C15 13.5 17.5 12.6 17.5 11.5V7.5"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M6.5 11.5V15.5C6.5 16.6 9 17.5 12 17.5C15 17.5 17.5 16.6 17.5 15.5V11.5"
            stroke="white"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Connecting data node */}
          <circle cx="12" cy="12.5" r="1.5" fill="#527FFF" />
        </svg>
      );

    case "Amazon VPC":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS VPC Purple */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#8C4FFF" />
          {/* Virtual Private Cloud Grid */}
          <rect
            x="6"
            y="7"
            width="12"
            height="10"
            rx="2"
            stroke="white"
            strokeWidth="1.5"
            strokeDasharray="2 1.5"
            fill="none"
          />
          {/* Router / Subnet node */}
          <circle cx="8" cy="9.5" r="1.2" fill="white" />
          <circle cx="16" cy="9.5" r="1.2" fill="white" />
          <circle cx="12" cy="14.5" r="1.5" fill="white" />
          <path
            d="M8 9.5L12 14.5L16 9.5"
            stroke="white"
            strokeWidth="1.2"
          />
        </svg>
      );

    case "Amazon CloudWatch":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS CloudWatch Pink / Magenta */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#E7157B" />
          {/* Metrics Radar / Gauge */}
          <path
            d="M6 16.5C6 13.2 8.7 10.5 12 10.5C15.3 10.5 18 13.2 18 16.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M8.5 16.5C8.5 14.6 10.1 13 12 13C13.9 13 15.5 14.6 15.5 16.5"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Needle */}
          <line
            x1="12"
            y1="16.5"
            x2="15.5"
            y2="10.5"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16.5" r="1.5" fill="white" />
        </svg>
      );

    case "AWS CloudFormation":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AWS CloudFormation Red-Orange */}
          <rect x="2" y="3" width="20" height="18" rx="4" fill="#FF5252" />
          {/* Stacked 3D template blocks */}
          <path
            d="M12 6L16.5 8.5L12 11L7.5 8.5L12 6Z"
            fill="white"
          />
          <path
            d="M7.5 9.8L12 12.3V17L7.5 14.5V9.8Z"
            fill="#E53935"
          />
          <path
            d="M16.5 9.8L12 12.3V17L16.5 14.5V9.8Z"
            fill="#FFCDD2"
          />
        </svg>
      );

    case "Time Management":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="#10B981"
            strokeWidth="2"
          />
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="#10B981"
            fillOpacity="0.1"
          />
          {/* Clock Hands */}
          <path
            d="M12 7V12L15.5 14"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Accent pulse dot */}
          <circle cx="12" cy="12" r="1.5" fill="#34D399" />
          <circle cx="12" cy="4" r="1" fill="#F59E0B" />
        </svg>
      );

    case "Teamwork":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connected team cluster */}
          <circle cx="12" cy="6.5" r="2.5" fill="#06B6D4" />
          <path
            d="M7.5 14C7.5 11.5 9.5 11 12 11C14.5 11 16.5 11.5 16.5 14V15H7.5V14Z"
            fill="#06B6D4"
          />
          <circle cx="5" cy="9.5" r="2" fill="#3B82F6" />
          <path
            d="M2 16C2 14 3.5 13.5 5.5 13.5C6.3 13.5 7 13.7 7.7 14"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="19" cy="9.5" r="2" fill="#3B82F6" />
          <path
            d="M22 16C22 14 20.5 13.5 18.5 13.5C17.7 13.5 17 13.7 16.3 14"
            stroke="#3B82F6"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "Problem Solving":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Neural brain circuit / lightbulb */}
          <path
            d="M12 3C8.1 3 5 6.1 5 10C5 12.4 6.2 14.5 8 15.7V18C8 18.6 8.4 19 9 19H15C15.6 19 16 18.6 16 18V15.7C17.8 14.5 19 12.4 19 10C19 6.1 15.9 3 12 3Z"
            fill="#8B5CF6"
            fillOpacity="0.15"
            stroke="#8B5CF6"
            strokeWidth="1.8"
          />
          {/* Brain circuit lines */}
          <path
            d="M9 10C9 8.5 10.5 7.5 12 7.5C13.5 7.5 15 8.5 15 10"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="12"
            y1="7.5"
            x2="12"
            y2="13"
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="13" r="1.5" fill="#F59E0B" />
          <line
            x1="9"
            y1="21"
            x2="15"
            y2="21"
            stroke="#8B5CF6"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );

    case "Accountability":
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield */}
          <path
            d="M12 2L19.5 5.5V11.5C19.5 16.5 16.3 20.8 12 22C7.7 20.8 4.5 16.5 4.5 11.5V5.5L12 2Z"
            fill="#C3E41D"
            fillOpacity="0.2"
            stroke="#5c7003"
            strokeWidth="1.8"
          />
          {/* Verified Checkmark */}
          <path
            d="M8.5 12L11 14.5L15.5 9.5"
            stroke="#C3E41D"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return (
        <svg
          viewBox="0 0 24 24"
          className={className}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="4"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
  }
};
