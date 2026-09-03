import spoonLogo from "../../assets/spoon-logo.png";

type SpoonLogoProps = {
  className?: string;
};

function SpoonLogo({ className }: SpoonLogoProps) {
  return <img src={spoonLogo} alt="" className={className} />;
}

export default SpoonLogo;
