export type SkillGroup = {
  label: string;
  description: string;
  icon: "data" | "analytics" | "modeling" | "patterns" | "deployment" | "workflow";
  skills: string[];
};

export type Project = {
  title: string;
  summary: string;
  category: string;
  metric: string;
  stack: string[];
  github: string;
  demo: string;
  externalDemo?: boolean;
  image?: string;
  images?: { src: string; label: string }[];
  context?: string;
  highlights?: string[];
  disclaimer?: string;
  featured?: boolean;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  logoKey: "technohacks" | "electrosoft" | "varid";
  collaboration?: string;
  responsibilities: string;
  technologies: string[];
  metric: string;
  selectedWork: { title: string; context: string }[];
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  url: string;
  logo: string;
};

export const portfolio = {
  name: "Pranav Patel",
  monogram: "PP",
  role: "Data Analytics · Data Science · Machine Learning · AI/ML",
  eyebrow: "Computer Science & Engineering · Class of 2026",
  intro: "Recent B.Tech graduate building end-to-end data, analytics, and machine learning solutions for real-world decisions and production-minded systems.",
  location: "Open to entry-level data & AI opportunities",
  email: "",
  github: "https://github.com/pranav444444",
  linkedin: "https://www.linkedin.com/in/pranav-patel-www22447630a",
  resumeHref: "https://drive.google.com/file/d/1p-iT5BTyG8ZeHK--C6wb9SV1SfDcKyfm/view?usp=drive_link",
  about: [
    "I am a Computer Science graduate with hands-on experience across Data Analytics, Business Intelligence, Machine Learning, and Deep Learning. I work across the data lifecycle: cleaning and exploration, SQL preparation, dashboarding, experimentation, evaluation, API development, containerization, and cloud deployment.",
    "My internship and project work spans pharmacy logistics, retail, banking, telecom, healthcare, and customer segmentation. I am strengthening my expertise in Computer Vision, NLP, and production-ready ML systems while pursuing entry-level opportunities across Data Analytics, Data Science, Machine Learning, and AI/ML.",
  ],
  skills: [
    { label: "Languages & Databases", description: "The foundations for querying, shaping, and understanding data.", icon: "data", skills: ["Python", "SQL", "PostgreSQL", "SQLite", "MySQL", "MongoDB"] },
    { label: "Data Analytics & BI", description: "Turning raw records into useful reporting and decisions.", icon: "analytics", skills: ["Power BI", "Pandas", "NumPy", "MS Excel", "Power Query", "DAX", "EDA", "ETL"] },
    { label: "Machine Learning & AI", description: "Experimenting with models that find patterns and predict outcomes.", icon: "modeling", skills: ["Scikit-learn", "PyTorch", "TensorFlow", "XGBoost", "K-Means", "Deep Learning", "CNNs", "NLP"] },
    { label: "Modeling Practice", description: "From feature design to applied computer vision and prediction.", icon: "patterns", skills: ["Computer Vision", "Predictive Modeling", "Feature Engineering"] },
    { label: "Deployment & APIs", description: "Packaging analytical thinking into usable services and systems.", icon: "deployment", skills: ["Docker", "FastAPI", "BentoML", "AWS ECR/ECS", "Render"] },
    { label: "Engineering Workflow", description: "Reliable collaboration, testing, documentation, and delivery.", icon: "workflow", skills: ["Git/GitHub", "GitHub Actions", "Pytest", "Swagger"] },
  ] satisfies SkillGroup[],
  experience: [
    {
      id: "varid",
      company: "Varid Computing Services (India) Private Limited",
      role: "Data Analytics & QA Intern",
      duration: "Dec 2025 – Jul 2026 · 8 months",
      location: "Gurugram, India · Remote",
      logoKey: "varid",
      collaboration: "VaridX / Sam IT Solutions · Durham, North Carolina, USA",
      responsibilities: "Worked with real pharmacy logistics data across an analytics pipeline, backend validation, REST APIs, and software quality assurance. This internship also served as my final-semester major project.",
      technologies: ["Django REST / Swagger", "Python", "PostgreSQL", "Power BI", "pytest", "Jira / Agile Scrum"],
      metric: "10K+ package records",
      selectedWork: [
        { title: "eBoxChain — Orders & Delivery Dashboard", context: "Analytics pipeline" },
        { title: "eBoxChain — Package Lifecycle Dashboard", context: "Operational efficiency" },
      ],
    },
    {
      id: "electrosoft",
      company: "Electrosoft",
      role: "Data Analytics & Business Intelligence Intern",
      duration: "Jul 2025 – Oct 2025 · Curriculum internship",
      location: "Remote",
      logoKey: "electrosoft",
      responsibilities: "Built self-driven analytics workflows across retail, banking, and customer transaction data, moving from Python and SQL preparation to dimensional modeling, DAX, and interactive Power BI reporting.",
      technologies: ["Python", "SQLite", "MySQL", "Power BI", "Power Query", "DAX"],
      metric: "292,439 cleaned retail records",
      selectedWork: [
        { title: "Customer Preference & Trend Analytics", context: "Semester 7 Minor Project" },
        { title: "Bank Loan Performance & Risk Assessment", context: "Financial analytics" },
        { title: "Data-Driven Credit Card Analytics", context: "Customer & transaction analysis" },
      ],
    },
    {
      id: "technohacks",
      company: "TechnoHacks",
      role: "Data Analytics Intern",
      duration: "May 2025 – Jul 2025 · 3 months",
      location: "Nashik, Maharashtra, India · Remote",
      logoKey: "technohacks",
      responsibilities: "Completed a curriculum summer internship and applied Excel, Power BI, Power Query, data modeling, and DAX through independently developed analytics projects and dashboards.",
      technologies: ["Power BI", "MS Excel", "Power Query", "DAX", "Data Modeling"],
      metric: "3 portfolio / academic dashboards",
      selectedWork: [
        { title: "HR Analytics Dashboard", context: "Attrition & retention insights" },
        { title: "Vrinda Store Sales Performance", context: "Excel sales analysis" },
        { title: "SK Mobile Sales Dashboard", context: "Time intelligence & KPIs" },
      ],
    },
  ] satisfies Experience[],
  projects: [
    { title: "PneumoVision — Chest X-Ray Pneumonia Detection", summary: "An end-to-end deep learning and computer vision project for chest X-ray classification, evolved from CNN experimentation into a production-oriented ML application with model serving, containerization, CI validation, and cloud deployment.", category: "Deep Learning / Computer Vision / ML Engineering", metric: "95.82% accuracy · 97.14% F1-score", stack: ["PyTorch", "Custom CNN", "Computer Vision", "FastAPI", "BentoML", "Docker", "GitHub Actions", "Render"], github: "https://github.com/pranav444444/Pneumovision-public-", demo: "https://pneumovision-yvhn.onrender.com/", externalDemo: true, image: "/pneumovision-preview.png", context: "Production-oriented ML engineering project", highlights: ["Improved final accuracy from 79.27% to 95.82% through 13 documented experiments.", "Achieved 97.14% F1-score and 97.31% recall on the final custom CNN.", "Migrated Colab experimentation into a modular pipeline with BentoML and FastAPI serving.", "Containerized the application with Docker, added GitHub Actions smoke validation, and deployed it on Render."], disclaimer: "Educational AI/ML research and decision-support prototype — not a medical diagnostic system." },
    { title: "SegmentIQ — Customer Segmentation & Predictive Analytics System", summary: "An end-to-end machine learning system that segments customers using unsupervised learning and predicts the segment of new customers using a tuned XGBoost classifier, exposed through a containerized web application.", category: "Machine Learning / Predictive Analytics / ML Engineering", metric: "96.28% tuned accuracy · 0.5105 silhouette", stack: ["Python", "Pandas", "Scikit-learn", "K-Means", "XGBoost", "FastAPI", "Docker", "GitHub Actions", "AWS ECR", "AWS ECS Fargate"], github: "https://github.com/pranav444444/Customer-Segmentation-and-Predictive-Analytics-System-ML-FastAPI-", demo: "https://segmentiq-qyte.onrender.com", externalDemo: true, image: "/segmentiq-preview.png", context: "Production-oriented ML application with Render and AWS deployment workflows", highlights: ["Built a two-stage system combining 3-cluster K-Means segmentation with XGBoost-based segment prediction.", "Evaluated clustering and classification alternatives, reaching a 0.5105 K-Means silhouette score and 96.28% final tuned accuracy.", "Used 5-fold GridSearchCV to tune XGBoost after a 96.43% pre-tuning comparison result.", "Converted notebook experimentation into a modular FastAPI + Docker application with GitHub Actions, Render, and AWS ECR/ECS Fargate workflows." ] },
    { title: "SuperStore Sales Dashboard", summary: "An interactive Power BI sales dashboard built with the SuperStore dataset to analyze e-commerce performance, profitability, regional patterns, shipping modes, and sales trends, with a separate 30-day sales forecast view.", category: "Data Analytics / Business Intelligence", metric: "Power BI dashboard · 30-day forecast", stack: ["Power BI", "DAX", "Excel", "Data Analysis", "Data Visualization"], github: "https://github.com/pranav444444/FUTURE_DS_01", demo: "", images: [{ src: "/superstore-sales-dashboard.png", label: "Main Sales Dashboard" }, { src: "/superstore-forecast-dashboard.png", label: "Sales Forecast Dashboard" }], context: "Built as Task 1 during the Future Interns Data Science & Analytics Internship", highlights: ["Analyzed sales across regions, segments, categories, sub-categories, states, and shipping modes.", "Created KPI tracking for Sales, Quantity, Profit, and Average Delivery Days with DAX calculations.", "Built Year-over-Year sales and profit trends plus a separate 30-day forecast with confidence intervals.", "Identified regional performance, Q4 seasonality, state-level revenue, shipping, and profitability patterns." ] },
    { title: "Social Media Campaign Analytics Dashboard", summary: "An interactive Power BI dashboard analyzing digital marketing campaign performance across channels, customer segments, devices, campaigns, and countries, with a focus on conversions, spend efficiency, and ROI.", category: "Data Analytics / Business Intelligence", metric: "2,280.10% ROI · 10.16% conversion rate", stack: ["Power BI", "DAX", "Python", "Pandas", "NumPy", "Excel", "Data Cleaning", "Marketing Analytics"], github: "https://github.com/pranav444444/FUTURE_DS_02", demo: "", image: "/social-media-campaign-analytics-dashboard.png", context: "Built as Task 2 during the Future Interns Data Science & Analytics Internship", highlights: ["Analyzed revenue by channel, conversions by customer segment, ROI, CPC, device conversion rates, and country-level revenue.", "Created KPI monitoring for impressions, clicks, spend, revenue, profit, conversions, CTR, CPM, and revenue per impression.", "Social and Search contributed the highest revenue, while Tablet users showed the highest conversion rate.", "Examined marketing spend versus revenue and identified optimization opportunities in high-impression, lower-CTR channels." ] },
    { title: "HR Analytics Dashboard", summary: "An analytical Human Resources dashboard built to identify key drivers of employee attrition and support data-driven decision making.", category: "Data Analytics / Business Intelligence", metric: "Power BI dashboard", stack: ["Power BI", "Power Query", "DAX", "Microsoft Excel"], github: "https://github.com/pranav444444/TASK-6A-DATA-ANALYTICS-TECHNOHACKS-INTERNSHIP", demo: "", image: "/hr-analytics-dashboard.png", context: "Built during Data Analytics Internship @ TechnoHacks", highlights: ["Analyzed attrition across demographics, roles, salary bands, tenure, and departments.", "Prepared and validated data with Power Query, Excel, and consistent analytical fields.", "Built KPI cards, slicers, drilldowns, and multiple interactive Power BI visuals.", "Recommendations focused on compensation, onboarding, engagement, and career growth." ] },
    { title: "Vrinda Store Sales Performance Analysis", summary: "An Excel-based annual sales report built to understand customer purchasing behavior and identify opportunities to improve sales in 2023.", category: "Data Analytics / Business Intelligence", metric: "Annual report · 2022", stack: ["Microsoft Excel", "PivotTables", "Charts", "Slicers"], github: "https://github.com/pranav444444/technohacks-internship-task-4", demo: "", image: "/vrinda-store-sales-dashboard.png", context: "Built during Data Analytics Internship @ TechnoHacks", highlights: ["Compared monthly sales with order volume across the 2022 annual report.", "Women customers represented approximately 65% of purchases in the analysis.", "Maharashtra, Karnataka, and Uttar Pradesh contributed approximately 35% of sales.", "Amazon, Flipkart, and Myntra contributed approximately 80% of sales channels." ] },
    { title: "SK Mobile Sales Dashboard", summary: "An interactive mobile sales dashboard for tracking performance, time-based comparisons, customer ratings, and actionable business signals.", category: "Data Analytics / Business Intelligence", metric: "769M sales · 19K quantity · 4K transactions", stack: ["Microsoft Excel", "Power BI", "DAX", "Power Query"], github: "https://github.com/pranav444444/TASK-6B-DATA-ANALYTICS-TECHNOHACKS-INTERNSHIP", demo: "", images: [{ src: "/sk-mobile-sales-dashboard.png", label: "SK Mobile Sales Dashboard" }, { src: "/sk-mobile-sales-dashboard-mtd.png", label: "SK Mobile Sales Dashboard — MTD" }, { src: "/sk-mobile-sales-dashboard-ytd.png", label: "SK Mobile Sales Dashboard — YTD" }], context: "Built during Data Analytics Internship @ TechnoHacks", highlights: ["Delhi and Mumbai together contributed approximately 43% of sales.", "July was the strongest month for quantity and sales activity.", "Approximately 22% of customer ratings were classified as Poor.", "UPI was the most-used payment method at approximately 26.4%." ] },
    { title: "Prime Video Dashboard", summary: "A beginner-level Power BI practice dashboard exploring Prime Video content data through visualizations and report design, rather than advanced transformation or modeling.", category: "Data Analytics / Business Intelligence", metric: "Practice dashboard · 9,651 titles", stack: ["Power BI", "Data Visualization", "Dashboard Design"], github: "https://github.com/pranav444444/TASK-5-DATA-ANALYTICS-TECHNOHACKS-INTERNSHIP", demo: "", image: "/prime-video-dashboard.png", context: "Beginner Power BI learning project associated with the TechnoHacks internship", highlights: ["Practiced KPI cards, rating and genre bar charts, a country map, a Movies vs TV Shows donut chart, and release-year trends, with attention to layout, formatting, and visual consistency."] },
    { title: "Customer Preference and Trend Analytics for Retail Sector", summary: "An end-to-end retail analytics project connecting Python data preparation, SQLite modeling, and Power BI dashboards to understand customer behavior, product preferences, and operational performance.", category: "Data Analytics / Business Intelligence", metric: "₹400.22M revenue · 292.439K orders", stack: ["Python", "Pandas", "NumPy", "Jupyter Notebook", "SQLite3", "SQL", "Power Query", "Power BI", "DAX", "Excel"], github: "https://github.com/pranav444444/MinorProject_Sem7_Customer-Preference-and-Trend-Analytics-for-the-Retail-Sector", demo: "", images: [{ src: "/customer-preference-retail-dashboard.png", label: "Global Sales Overview" }, { src: "/customer-preference-insights-dashboard.png", label: "Customer Insights" }, { src: "/customer-preference-product-dashboard.png", label: "Product Performance & Preferences" }, { src: "/customer-preference-operational-dashboard.png", label: "Operational & Feedback Insights" }], context: "Built during Data Analytics & Business Intelligence Internship @ Electrosoft", highlights: ["Recovered 115,104 valid records after resolving mixed international date formats, restoring the final dataset to 292,439 records.", "Repeat customers represented approximately 86.79% of the customer base.", "USA and UK were among the strongest revenue-contributing markets, with Electronics leading by category.", "Built four interactive Power BI dashboards covering sales, customers, products, and operational feedback." ] },
    { title: "Bank Loan Performance Analysis & Risk Assessment", summary: "An interactive loan portfolio analysis transforming validated financial records into a SQL and Power BI report for understanding loan performance, risk, and portfolio quality.", category: "Data Analytics / Business Intelligence", metric: "38.6K applications · $435.8M funded", stack: ["MySQL", "SQL", "Power BI", "DAX", "Power Query"], github: "https://github.com/pranav444444/Bank_Loan_Performance_Analysis-Risk_Assessment", demo: "", images: [{ src: "/bank-loan-performance-dashboard.png", label: "Bank Loan Dashboard" }, { src: "/bank-loan-performance-dashboard-overview.png", label: "Bank Loan Dashboard — Overview" }, { src: "/bank-loan-performance-dashboard-details.png", label: "Bank Loan Dashboard — Details" }], context: "Built during Data Analytics & Business Intelligence Internship @ Electrosoft", highlights: ["The Good Loan segment generated more than $65.5M in profit, while the Bad Loan segment generated a net loss of more than $28.2M.", "5,333 loans were charged off in the analyzed portfolio.", "Debt consolidation was the largest loan purpose, with more than 18K applications.", "Built a three-page Power BI report with SQL validation, a star-schema model, and 30+ DAX measures." ] },
    { title: "Data-Driven Credit Card Analytics", summary: "Built a Power BI and SQL-based business intelligence project analyzing 10,000+ credit card transaction records and 10,000+ customer demographic records to understand transaction performance, customer spending behavior, revenue trends, and financial KPIs.", category: "Data Analytics / Business Intelligence", metric: "$12M revenue · $8M interest · 656K transactions · $45M transaction amount", stack: ["MySQL", "SQL", "Power BI", "DAX", "Excel", "Data Analysis", "Business Intelligence", "Data Visualization"], github: "https://github.com/pranav444444/Data-Driven-Credit-Card-Analytics", demo: "", images: [{ src: "/credit-card-transaction-report.png", label: "Credit Card Transaction Report" }, { src: "/credit-card-customer-report.png", label: "Credit Card Customer Report" }], context: "Data Analytics & Business Intelligence Intern at Electrosoft · Jul 2025 – Oct 2025", highlights: ["Analyzed 20K+ combined transaction and customer records, using MySQL for data storage and SQL-based data handling, then connecting MySQL with Power BI for dashboard development.", "Created DAX-based KPIs and interactive visualizations across card category, transaction method, expense type, quarter, occupation, income, gender, marital status, and state.", "Built separate transaction-performance and customer-demographic dashboards, then used root-cause analysis to develop business recommendations.", "Transaction report: $12M revenue, $8M interest, 656K transactions, and $45M transaction amount. Blue Card led revenue at $9.9M; Swipe transactions generated $7.6M; Bills and Entertainment were major spending categories, and Q3 recorded the highest performance.", "Customer report: $576M total income and 3.19 customer satisfaction score. Businessmen ($3.3M) and White-collar employees ($2.1M) led revenue; high-income customers generated $4.2M; married customers spent $3.0M versus $2.5M for singles; California ($1.5M), Texas ($1.4M), and New York ($1.3M) were top states.", "Recommended reward and cashback programs for online and chip payments, targeted Gold and Platinum card offers, festive Q4 campaigns, personalized offers for high-income and graduate customers, and improved digital outreach for senior customers."] },
    { title: "Telecom Customer Churn Analytics & Prediction System", summary: "An end-to-end telecom churn analytics and prediction system combining MySQL, Python, machine learning, and Power BI to analyze historical churn patterns and identify newly joined customers at higher risk of churn.", category: "Data Analytics / Machine Learning / Business Intelligence", metric: "6,007 customers · 84.03% accuracy · 89.55% ROC-AUC", stack: ["Python", "SQL / MySQL", "Scikit-learn", "Power BI", "DAX", "Machine Learning"], github: "https://github.com/pranav444444/Telecom-Customer-Churn-Analytics-Prediction-System", demo: "", images: [{ src: "/telecom-churn-overview-dashboard.png", label: "Churn Overview & Analytics Dashboard" }, { src: "/telecom-churn-customers-at-risk-dashboard.png", label: "Churn Prediction — Customers at Risk" }], context: "End-to-end Data Analytics, Machine Learning & BI project", highlights: ["Compared Gradient Boosting, Random Forest, and Logistic Regression, then tuned a final Gradient Boosting model.", "Optimized the churn threshold from 0.50 to 0.36, improving churn recall from 65.00% to 72.33%.", "Applied the final model to 411 new customers, predicting churn risk for a specific new-joiner population.", "Observed higher historical churn among Month-to-Month and Fiber Optic customer groups; these are dataset associations, not causal claims." ] },
  ] satisfies Project[],
  education: { degree: "B.Tech in Computer Science & Engineering", university: "Charotar University of Science and Technology (CHARUSAT)", location: "", dates: "2022 – 2026", details: "Graduation: April 2026 · Relevant coursework: Data Structures & Algorithms, Database Management Systems, Machine Learning, Probability & Statistics, Linear Algebra, Calculus, Operating Systems, Cloud Computing.", cgpa: "9.01" },
  certifications: [
    { title: "Databases and SQL for Data Science with Python", issuer: "IBM", date: "Link to be added", url: "https://coursera.org/account/accomplishments/verify/3DE94UGX1JM7", logo: "/ibm_logo.png" },
    { title: "Python for Data Science, AI & Development", issuer: "IBM", date: "Link to be added", url: "https://coursera.org/account/accomplishments/verify/FZ2KOFNRO51", logo: "/ibm_logo.png" },
    { title: "Excel Basics for Data Analysis", issuer: "IBM", date: "Link to be added", url: "https://coursera.org/account/accomplishments/verify/1WGL2YZT4VLG", logo: "/ibm_logo.png" },
    { title: "SQL (Basic) Certificate", issuer: "HackerRank", date: "Link to be added", url: "https://www.hackerrank.com/certificates/647e03a773ce", logo: "/hackerank_logo.png" },
  ] satisfies Certification[],
};
