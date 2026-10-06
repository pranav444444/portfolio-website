import {
  siDocker,
  siFastapi,
  siGit,
  siGithub,
  siGithubactions,
  siMongodb,
  siMysql,
  siNumpy,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siScikitlearn,
  siSqlite,
  siSwagger,
  siTensorflow,
  type SimpleIcon,
} from "simple-icons";

type TechnologyIconProps = {
  name: string;
};

const icons: Record<string, SimpleIcon> = {
  Python: siPython,
  PostgreSQL: siPostgresql,
  SQLite: siSqlite,
  MySQL: siMysql,
  MongoDB: siMongodb,
  Pandas: siPandas,
  NumPy: siNumpy,
  "Scikit-learn": siScikitlearn,
  PyTorch: siPytorch,
  TensorFlow: siTensorflow,
  Docker: siDocker,
  FastAPI: siFastapi,
  Git: siGit,
  GitHub: siGithub,
  "GitHub Actions": siGithubactions,
  Swagger: siSwagger,
};

const conceptGlyphs: Record<string, string> = {
  SQL: "⌘",
  "Power BI": "◒",
  "MS Excel": "▦",
  "Power Query": "↗",
  DAX: "ƒ",
  EDA: "⌕",
  ETL: "⇄",
  XGBoost: "✦",
  "K-Means": "◎",
  "Deep Learning": "⌁",
  CNNs: "▧",
  NLP: "Aa",
  "Computer Vision": "◉",
  "Predictive Modeling": "↗",
  "Feature Engineering": "⌘",
  BentoML: "◆",
  "AWS ECR/ECS": "△",
  Render: "▱",
  "Git/GitHub": "⌘",
  Pytest: "✓",
};

export function TechnologyIcon({ name }: TechnologyIconProps) {
  const icon = icons[name];

  if (icon) {
    return (
      <svg className="technology-icon technology-brand-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={icon.path} />
      </svg>
    );
  }

  return <span className="technology-icon technology-concept-icon" aria-hidden="true">{conceptGlyphs[name] ?? "·"}</span>;
}
