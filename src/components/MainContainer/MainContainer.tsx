import "./MainContainer.scss";

const MainContainer: React.FunctionComponent<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <div className="page-container">
      <main className="main-continer">{children}</main>
    </div>
  );
};

export default MainContainer;
