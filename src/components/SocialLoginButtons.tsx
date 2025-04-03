interface SocialLoginButtonProps {
    text: string; // Texte affiché sur le bouton
    iconSrc: string; // URL de l'icône
    onClick: () => void; // Fonction appelée lors du clic
    className?: string; // Classe CSS personnalisée pour le bouton
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