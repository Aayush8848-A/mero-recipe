const Loader = ({ fullScreen = false, text = "Loading..." }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-brand-green/10"></div>

        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-green border-r-brand-green animate-spin"></div>

        <div className="absolute inset-3 rounded-full bg-brand-leaf/30 animate-pulse"></div>
      </div>

      {text && (
        <p className="text-brand-green font-medium text-sm animate-pulse">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="py-12 flex justify-center">{content}</div>;
};

export default Loader;
