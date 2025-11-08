import React from 'react';
import { 
    TwoWheelerIcon, ThreeWheelerIcon, FourWheelerIcon, FarmEquipmentIcon, CommercialVehicleIcon, ConstructionEquipmentIcon, 
    MapPinIcon, PhoneIcon, EnvelopeIcon, 
    ExperiencedIcon, KnowledgeIcon, TechnologyIcon, ServiceIcon,
    ExpertiseIcon, PrecisionIcon, TrustedIcon, CoverageIcon, RequestIcon, SearchIcon,
    FinancingValuationIcon, InsuranceValuationIcon, AssetDisposalIcon,
    MissionIcon, VisionIcon
} from './components/icons/FeatureIcons';
import { FacebookIcon, TwitterIcon, LinkedInIcon, InstagramIcon } from './components/icons/SocialIcons';

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
];

export const CAROUSEL_SLIDES = [
    {
      src: 'https://res.cloudinary.com/drezjoynu/image/upload/v1762514677/depositphotos_594996562-stock-photo-text-caption-presenting-price-value_uuoayz.webp',
      alt: 'A signpost with arrows pointing to Price and Value',
    },
    {
      src: 'https://www.shutterstock.com/image-photo/finger-pressing-keyless-ingnition-button-260nw-1501314401.jpg',
      alt: 'Finger pressing a keyless ignition button',
    },
    {
      src: 'https://res.cloudinary.com/drezjoynu/image/upload/v1762514676/depositphotos_126871470-stock-photo-business-hand-clicking-valuation-button_tpg7ha.webp',
      alt: 'Hand clicking a valuation button on a virtual screen',
    },
      {
      src: 'https://res.cloudinary.com/drezjoynu/image/upload/v1762507776/depositphotos_108369034-stock-photo-looking-for-car-services-concept_jmcvv9.webp',
      alt: 'Magnifying glass over a car with text "Looking for car services"',
    },
  ];

export const KEY_PILLARS = [
    { icon: <ExperiencedIcon />, title: 'EXPERIENCED', description: 'Over 60 years of combined industry experience.' },
    { icon: <KnowledgeIcon />, title: 'KNOWLEDGE DRIVEN', description: 'Deep expertise in vehicle valuation and compliance.' },
    { icon: <TechnologyIcon />, title: 'TECHNOLOGICAL TOOLS & APPS', description: 'Leveraging modern tech for precise evaluations.' },
    { icon: <ServiceIcon />, title: 'SERVICE ORIENTED', description: 'Committed to timely, accurate, and client-focused reporting.' },
];

export const WHY_CHOOSE_US_POINTS = [
    {
      icon: <ExpertiseIcon />,
      title: 'Unmatched Expertise',
      description: 'Benefit from our 60+ years of combined experience and IRDAI-licensed professionals who ensure every valuation is precise and compliant.'
    },
    {
      icon: <PrecisionIcon />,
      title: 'Tech-Driven Precision',
      description: 'We utilize cutting-edge, app-based valuation tools to deliver fast, accurate, and transparent reports, minimizing risk for our clients.'
    },
    {
      icon: <TrustedIcon />,
      title: 'Trusted by Industry Leaders',
      description: 'Our reputation for integrity and reliability has made us the trusted partner for major banks, NBFCs, and insurance providers.'
    },
    {
      icon: <CoverageIcon />,
      title: 'Comprehensive Coverage',
      description: 'From two-wheelers to heavy construction equipment, our expertise spans a vast range of vehicle categories, offering a one-stop valuation solution.'
    }
];

export const CORE_SERVICES = [
  {
    icon: <FinancingValuationIcon />,
    title: 'Financing Valuations',
    description: 'We assist lenders in accurately determining the market value of vehicles for secured loans and purchase agreements, minimizing risk and ensuring informed lending decisions.',
  },
  {
    icon: <InsuranceValuationIcon />,
    title: 'Insurance Inspection & Valuations',
    description: 'We help insurance companies assess the true value of insured vehicles for accurate premium calculations and claims settlements, promoting fairness and transparency in the insurance market.',
  },
  {
    icon: <AssetDisposalIcon />,
    title: 'Asset Disposal Valuations',
    description: 'We provide reliable valuations for businesses and individuals looking to sell vehicles efficiently and at fair market prices, maximizing returns and streamlining the disposal process.',
  },
];

export const VEHICLE_CATEGORIES = [
  { id: 'two-wheeler', name: 'Two Wheeler', icon: <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1762508879/PHOTO_2W_e0ujra.png" alt="Two Wheeler" className="w-full h-full object-contain" />, description: 'Accurate valuations for motorcycles and scooters of all makes and models.' },
  { id: 'three-wheeler', name: 'Three Wheeler', icon: <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1762508880/PHOTO_AUTO_kbutwz.png" alt="Three Wheeler" className="w-full h-full object-contain" />, description: 'Specialized inspections for auto-rickshaws and other three-wheeled commercial vehicles.' },
  { id: 'four-wheeler', name: 'Four Wheeler', icon: <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1762508880/PHOTO_CAR_a86woh.png" alt="Four Wheeler" className="w-full h-full object-contain" />, description: 'Comprehensive analysis for cars, SUVs, and all personal four-wheeled vehicles.' },
  { id: 'farm-equipment', name: 'Farm Equipment', icon: <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1762508881/PHOTO_TRACTOR_yoyhr6.png" alt="Farm Equipment" className="w-full h-full object-contain" />, description: 'Expert assessments for tractors, harvesters, and other agricultural machinery.' },
  { id: 'commercial-vehicles', name: 'Commercial Vehicles', icon: <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1762513902/PHOTO_CV1-removebg-preview_mg7uw0.png" alt="Commercial Vehicles" className="w-full h-full object-contain" />, description: 'Detailed evaluations for trucks, buses, and light commercial vehicle fleets.' },
  { id: 'construction-equipment', name: 'Construction Equipment', icon: <img src="https://res.cloudinary.com/drezjoynu/image/upload/v1762508880/PHOTO_CE_jvpvet.png" alt="Construction Equipment" className="w-full h-full object-contain" />, description: 'Reliable valuations for heavy machinery, including excavators, loaders, and cranes.' },
];

// Fix: Add missing VEHICLE_AGE_OPTIONS export for the valuation estimator.
export const VEHICLE_AGE_OPTIONS = [
    { value: '1-3', label: '1-3 Years' },
    { value: '4-6', label: '4-6 Years' },
    { value: '7-10', label: '7-10 Years' },
    { value: '10+', label: '10+ Years' },
];

export const HOW_IT_WORKS_STEPS = [
  {
    icon: <RequestIcon />,
    title: 'Submit a Request',
    description: 'Contact us via phone, email, or our online form to initiate a valuation request for any vehicle type.'
  },
  {
    icon: <SearchIcon />,
    title: 'On-Site Inspection',
    description: 'Our trained technical experts conduct a thorough physical inspection of the vehicle at a location convenient for you.'
  },
  {
    icon: <TrustedIcon />,
    title: 'Receive Detailed Report',
    description: 'You get a comprehensive, tech-driven valuation report, compliant with all industry standards, delivered promptly.'
  }
];

export const CLIENTS: { name: string, logoUrl: string }[] = [
    { name: 'ICICI Bank', logoUrl: 'https://logoeps.com/wp-content/uploads/2012/10/icici-bank-logo-vector.png' },
    { name: 'Union Bank of India', logoUrl: 'https://res.cloudinary.com/drezjoynu/image/upload/v1762506985/UBI_ra2igc.jpg' },
    { name: 'Bijay Finance', logoUrl: 'https://bijayfinance.com/images/templatemo_logo.png' },
    { name: 'Muthoot Money', logoUrl: 'https://i.pinimg.com/736x/33/14/78/3314787c6bb9e2d11e9471c3d5b7fb2c.jpg' },
    { name: 'Sakthi Finance', logoUrl: 'https://www.sakthifinance.com/sakthi-finance-ncd-2024-apply/wp-content/uploads/2024/01/logo.png' },
    { name: 'IndusInd Bank', logoUrl: 'https://images.moneycontrol.com/static-mcnews/2019/10/IndusInd.jpg?impolicy=website&width=1600&height=900' },
    { name: 'Equitas Bank', logoUrl: 'https://wp-asset.groww.in/wp-content/uploads/2020/10/17121301/Equitas-Small-Finance-Bank-1.jpg' },
    { name: 'Sundaram Finance', logoUrl: 'https://images.seeklogo.com/logo-png/38/1/sundaram-finance-sfl-logo-png_seeklogo-387043.png' },
    { name: 'TVS Credit', logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSGRJK3WRM5ybLT4DDxQmR_ZU8E2OEfgbjug&s' },
    { name: 'Veritas', logoUrl: 'https://cdn.prod.website-files.com/65b65b84c3edfa5897cdfb0b/6699fd9a4f4dcb77f6e113af_Veritas%20logo.png' },
    { name: 'The Oriental Insurance Company', logoUrl: 'https://res.cloudinary.com/drezjoynu/image/upload/v1762507556/ORIENTAL_vsofji.png' },
];

export const TESTIMONIALS = [
  {
    quote: "Pronto Moto's app-based valuation system has revolutionized our workflow. The speed and accuracy of their reports are unmatched, significantly reducing our turnaround time for vehicle loans.",
    author: "K. Srinivas Rao",
    title: "Regional Credit Manager, ICICI Bank",
    avatarUrl: "https://static.vecteezy.com/system/resources/thumbnails/049/174/246/small/a-smiling-young-indian-man-with-formal-shirts-outdoors-photo.jpg"
  },
  {
    quote: "The team's expertise is evident in every interaction. Their detailed inspection reports give us the confidence to make sound financial decisions. A truly reliable partner.",
    author: "Lakshmi Reddy",
    title: "Valuation Head, Sundaram Finance",
    avatarUrl: "https://media.istockphoto.com/id/1169695702/photo/young-south-indian-girl-stock-photos.jpg?s=170667a&w=0&k=20&c=2NtcaPWMjbtsLFQONQ00jrlquiuu6VW-bbeHiuySf78="
  },
  {
    quote: "Their comprehensive coverage, from two-wheelers to commercial vehicles, makes them our one-stop solution for all valuation needs. Professional, prompt, and precise every time.",
    author: "Arjun Naidu",
    title: "Operations Chief, TVS Credit",
    avatarUrl: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "The digital-first approach from Pronto Moto has been a game-changer for our asset disposal valuations. Their platform is intuitive, and the reports are consistently delivered ahead of schedule.",
    author: "Murali Krishna",
    title: "Asset Liquidation Officer, Equitas Bank",
    avatarUrl: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    quote: "We handle a high volume of farm equipment financing, and Pronto Moto's specialized expertise in this area is invaluable. They understand the nuances of the machinery, which reflects in their accurate valuations.",
    author: "Geetha Madhuri",
    title: "Head of Agri-Loans, IndusInd Bank",
    avatarUrl: "https://www.shutterstock.com/image-photo/gorgeous-indian-woman-vertical-home-600nw-2592061359.jpg"
  },
  {
    quote: "For insurance claims, we need fast and trustworthy inspections. Pronto Moto Services delivers on both fronts. Their professionalism and detailed reports simplify our claims process significantly.",
    author: "Prakasham G.",
    title: "Claims Department Head, Bijay Finance",
    avatarUrl: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

export const CONTACT_DETAILS = [
    {
        icon: <MapPinIcon />,
        title: "Address",
        lines: [
            { text: "Srimati Vasamsetti Parvatidevi Govinda Rajan," },
            { text: "D.No: 16-23-3/8, Pallamraju Nagar," },
            { text: "Kakinada, A.P - 533005" }
        ]
    },
    {
        icon: <PhoneIcon />,
        title: "Phone",
        lines: [
            { text: "+91 98852 55567", href: "tel:+919885255567" },
            { text: "+91 0884 - 3596574", href: "tel:+9108843596574" }
        ]
    },
    {
        icon: <EnvelopeIcon />,
        title: "Email",
        lines: [
            { text: "connect@prontomoto.in", href: "mailto:connect@prontomoto.in" }
        ]
    }
];

export const ESCALATION_MATRIX = [
    { level: 'First Escalation', name: 'Mr Jagadish', phone: '9885755567' },
    { level: '2nd Escalation', name: 'Mr Mahesh Garikina', phone: '9553755567' },
    { level: 'Nodal Officer', name: 'Mr N V Pradeep Kishore Vemula', phone: '9885255567' },
];

export const COMPANY_STATS = [
    { value: 60, suffix: '+', label: 'Years Combined Experience' },
    { value: 20, suffix: '+', label: 'Partner Institutions' },
    { value: 5000, suffix: '+', label: 'Valuations Monthly' },
    { value: 99, suffix: '%', label: 'Report Accuracy' },
];

export const FOOTER_CONTACT_INFO = {
  address: "D.No: 16-23-3/8, Pallamraju Nagar, Kakinada, A.P - 533005",
  phone1: "+91 98852 55567",
  phone2: "+91 0884 - 3596574",
  email: "connect@prontomoto.in",
};

export const FOOTER_QUICK_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact Us' },
];

export const FOOTER_SERVICES_LINKS = [
    { to: '/services', label: 'Financing Valuations' },
    { to: '/services', label: 'Insurance Inspection & Valuations' },
    { to: '/services', label: 'Asset Disposal Valuations' },
];

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61583402152210', icon: <FacebookIcon /> },
  { name: 'Twitter', href: '#', icon: <TwitterIcon /> },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/pronto-moto-89a17b35a/', icon: <LinkedInIcon /> },
  { name: 'Instagram', href: '#', icon: <InstagramIcon /> },
];