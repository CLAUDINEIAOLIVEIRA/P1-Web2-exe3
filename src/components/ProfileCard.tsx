interface ProfileCardProps {
    nome: string;
    cargo: string;
    imagemUrl: string;
    ativo: boolean;
}

function ProfileCard({
    nome,
    cargo,
    imagemUrl,
    ativo
}: ProfileCardProps) {
    return (
        <div className="profile-card">
            <img src={imagemUrl} alt={nome} />

            <h2>{nome}</h2>

            <p>{cargo}</p>

            {ativo ? (
                <span className="status online">
                    Status: Online
                </span>
            ) : (
                <span className="status offline">
                    Status: Offline
                </span>
            )}
        </div>
    );
}

export default ProfileCard;