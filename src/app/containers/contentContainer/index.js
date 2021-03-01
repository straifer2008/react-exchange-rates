import './styles.scss';

const ContentContainer = ({className, children}) => {
  return (
    <div className={`ContentContainer ${className} ${className}`}>
      {children}
    </div>
  );
};

export default ContentContainer;
