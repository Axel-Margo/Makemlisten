interface SocialLoginButtonProps {
    text: string; 
    iconSrc: string; 
    onClick: () => void; 
    className?: string; 
  }
  
  export const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ text, iconSrc, onClick, className }) => {
    return (
      <div
        className={`flex items-center rounded-sm p-1 mt-2 cursor-pointer hover:opacity-90 ${className}`}
        onClick={onClick}
      >
        <img src={iconSrc} className="w-8 h-8" alt={`${text} icon`} />
        <p className="text-center flex-1">{text}</p>
      </div>
    );
  };