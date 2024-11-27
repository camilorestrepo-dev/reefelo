import "./Loading.scss";

type LoadingProps = {
  isOpen: boolean;
};

const Loading: React.FC<LoadingProps> = ({ isOpen }: LoadingProps) => {
  if (!isOpen) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content"></div>
    </div>
  );
};

export default Loading;
