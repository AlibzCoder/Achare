const Loader = ({ className, ...otherProps }: any) => (
  <div className={`lds-ellipsis ${className}`} {...otherProps}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
export default Loader;
